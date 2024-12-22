import React, { useState, useEffect } from "react";
import { PostAPI } from "../../../../services/Service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestedUser = () => {
  const [requestedUsers, setRequestedUsers] = useState([]);
  const [acceptRequest, setAcceptRequest] = useState([]);
  const [condition, setCondition] = useState(false);
  const FetchChatData = async () => {
    const response = await PostAPI("chating/get_requests");

    if (response.response_code == "200") {
      setRequestedUsers(response.data);
      // toast.success(response.message);
    }
    else if (response.response_code == "500") {
      //toast.error(response.message);
      setRequestedUsers([]);

    }
    setCondition(false);
  };
  useEffect(() => {
    FetchChatData();
  }, []);

  // Handle accept request
  const handleAccept = async (userId, e) => {
    e.preventDefault();
    console.log("user Id", userId);
    const requestPayload = { id: userId };
    const response = await PostAPI("chating/accept_request", requestPayload);

    if (response.response_code == "200") {
      // toast.success(response.message);
    } else if (response.response_code == "500") {
      // toast.error(response.message);
    }
    setCondition(true);
  };

  useEffect(() => {
    FetchChatData();
  }, [condition]);

  return (
    <div className="content-wrapper">
      <div className="row">
        <div class="page-header">
          <h3 class="page-title"> Add Activity</h3>
        </div>

        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <main role="main" className="col-md-11 pt-3 px-4">
                <div className="chat">
                  {requestedUsers == 0 ? <p>No request found!</p> : ""}
                  {requestedUsers.map((user) => (
                    <div className="chat-header clearfix">
                      <img
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
                        alt="avatar"
                      />
                      <div className="chat-about">
                        <div className="chat-with">
                          {user.first_name} {user.last_name}
                        </div>
                        <div className="chat-num-messages">start chat</div>
                      </div>
                      <button
                        className="float-right btn btn-gradient-primary me-2 mt-2"
                        onClick={(e) => handleAccept(user.id, e)}
                      >
                        Accept
                      </button>
                    </div>
                  ))}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RequestedUser;
