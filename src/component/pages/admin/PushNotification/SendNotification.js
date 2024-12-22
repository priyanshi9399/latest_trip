import React from "react";
import { useState, useContext, createContext, useEffect } from "react";
import { PostAPI, PostAPIWithNode } from "../../../../services/Service";
import Loader from "../../../assest/UI/Loader";
import { toast } from "react-toastify";
import { API_BASE_URL } from "./../../../../utils/config";

const defaultData = {
  title:"",
  message:"",
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUNyGdgMhM33h7lJNu2QOmGFfxcQX9bGLJqKSe2DD8rSdo1aGfyvLJ4OPpuontwVrQcr0&usqp=CAU",
  navigation:"/dashboard"
}

const SendNotification = () => {
    const [sendNotificationData, setSendNotificationData] = useState({});
    const [inputHandle, setInputHandle] = useState(defaultData);

    const requests = async () => {
      // const getTokens = await PostAPI("firebase/get_all_tokens");
      // if(getTokens.response_code == 200){
      //   setAllTokens(getTokens.data);
      //   setInputHandle(prevState => ({
      //     ...prevState, 
      //     tokens: getTokens.data
      //   }));
      // }
      const RequestData = await PostAPI("firebase/send_notification",inputHandle);
      if (RequestData.response_code == "200") {
        setSendNotificationData(RequestData);
        setInputHandle(defaultData);
        toast(RequestData.message);
      }
    };

    const handleInput = async (e) =>{
      e.preventDefault();
        setInputHandle(prevState => ({
          ...prevState, 
          [e.target.name]: e.target.value
        }));
    }

   return (
    <div class="content-wrapper">
      <div class="row">
        <div class="page-header ">
          <h3 class="page-title ">Send Notification</h3>
        </div>
        <div class="col-lg-12 grid-margin stretch-card">
            <div class="card">
              <div class="card-body">
                  <div class="btn-group btn-group-justified mb-3">
                    <div>
                      <label className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        placeholder="Title"
                        onChange={handleInput}
                        value={inputHandle.title}
                        class="form-control"
                        style={{ width: "800px" }}
                        name="title"
                      />
                    </div>
                  </div>

                  <div class="btn-group btn-group-justified mb-3">
                    <div>
                      <label className="form-label">
                        Message
                      </label>
                      <input
                        type="text"
                        placeholder="Message"
                        onChange={handleInput}
                        value={inputHandle.message}
                        class="form-control"
                        style={{ width: "800px" }}
                        name="message"
                      />
                    </div>
                  </div>

                  {/* <div class="btn-group btn-group-justified">
                    <div>
                      <label className="form-label">
                        Navigation
                      </label>
                      <input
                        type="text"
                        placeholder="Title"
                       // onChange={BadgeNameHandler}
                        //value={BadgeName}
                        class="form-control"
                        style={{ width: "800px" }}
                        name="navigation"
                      />
                    </div>
                  </div> */}

                  {/* <div className="mb-3">
                    <label htmlFor="BadgeImage" className="form-label">
                      Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      style={{ width: 800 }}
                      placeholder="Enter image"
                     // onChange={(e) => imageHandler(e)}
                     // value={badgeImage}
                      name="image"
                    />
                  </div> */}
                  <br></br>
                  <button
                    type="submit"
                    className="btn btn-gradient-primary me-2 mt-2"
                    style={{ width: 100}}
                    onClick={requests}
                  >
                    Submit
                  </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default SendNotification;
