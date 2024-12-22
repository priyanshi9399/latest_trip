//import avtar from ;
import React from "react";
import avtar from "./avtar.jpeg"; 
import { useParams } from "react-router-dom";
import Chat from "./Chat";
import { PostAPI } from "../../../../services/Service";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function Network() {
  const [receiverList, setReceiverList] = useState([]);
  const [requestedUsers, setRequestedUsers] = useState([]);
  const [condition, setCondition] = useState(false);
  let navigate = useNavigate();
  const { userid } = useParams();

  //Reciver List
  const getRecieverUserList = async () => {
    const useListData = await PostAPI("myuser_activity/suggested_users", {
      category_id: userid,
    });

    if (useListData.response_code == "200") {
      setReceiverList(useListData.data);
    } else {
      //error(useListData.message);
    }
  };

  useEffect(() => {
    getRecieverUserList();
  }, []);

 useEffect(() => {
    getRecieverUserList();
    setCondition(false);
  }, [condition]);

  const handleRequest = async (receiverId) => {
    const requestPayload = { receiver_id: receiverId };
    const response = await PostAPI("chating/chat_request", requestPayload);

    // if (response.response_code == "200") {
    //   toast.success("Request sent successfully!");
    // } else {
    //    toast.error(response.message);
    // }
    setCondition(true);

    const notification = await PostAPI("notification/get_notification",requestPayload);
    // if (notification.response_code == "200") {
    //   toast.success("notification sent successfully!");
    // }
  };

  return (
    <div class="content-wrapper">
      <div className="row">
      <div class="page-header">
              <h3 class="page-title">Network</h3>
            </div> 
        {/* <main role="main" class="col-md-11 pt-3 px-4"> */}
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
          <div class="chat">
            {receiverList.map((value) => {
              if(value.requestedUser != null){
                if(value.requested == '1'){
                return(
                  <div class="chat-header clearfix">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
                    alt="avatar"
                  />

                  <div class="chat-about">
                    <div class="chat-with">
                      {value.first_name} {value.last_name}
                    </div>
                    <div class="chat-num-messages">Hello Everyone</div>
                  </div>
                  <button
                    className="float-right btn btn-gradient-primary me-2"
                    disabled
                  >
                    Requested
                  </button>
              
                  {/* <i class="fa fa-star"></i> */}
                </div>
              );
              }
              else if(value.requested=='0'){
                return(
                  <div class="chat-header clearfix">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
                    alt="avatar"
                  />

                  <div class="chat-about">
                    <div class="chat-with">
                      {value.first_name} {value.last_name}
                    </div>
                    <div class="chat-num-messages">Hello Everyone</div>
                  </div>
                  <button
                    className="float-right btn btn-gradient-primary me-2"
                    onClick = {()=>{navigate(`/chat/${value.id}/${value.first_name}`);}}
                  >
                    Chat
                  </button>
                  <button
                    className="float-right btn btn-gradient-primary me-2"
                    disabled
                  >
                   Accepted
                  </button>
                  {/* <i class="fa fa-star"></i> */}
                </div>
              );
              }
              }
              return (
                <div class="chat-header clearfix">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
                    alt="avatar"
                  />

                  <div class="chat-about">
                    <div class="chat-with">
                      {value.first_name} {value.last_name}
                    </div>
                    <div class="chat-num-messages">Hello Everyone</div>
                  </div>
                  <button
                    className="float-right btn btn-gradient-primary me-2"
                    onClick={() => handleRequest(value.id)}
                  >
                    Request
                  </button>
              
                  {/* <i class="fa fa-star"></i> */}
                </div>
              );
            })}
          </div>
          </div>
          </div>
          </div>
        {/* </main> */}
      </div>
    </div>
  );
}
export default Network;
