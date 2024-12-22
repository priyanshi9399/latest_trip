
import { useState, useEffect } from "react";
import { useSocket } from "../../../../SocketContext";
import { useNavigate, useParams } from "react-router-dom";
import { PostAPI } from "../../../../services/Service";
import { toast } from "react-toastify";

const defaultData = {
  receiver_id: "",
  message_content: "",
};

const defaultDataSocket = {
  toUserId: "",
  message: "",
  fromUserId: "",
};

function Chat() {
  let Your_id;
  const socket = useSocket();
  let navigate = useNavigate();
  const { userid, name } = useParams();

  const [messages, setMessages] = useState(defaultData);
  const [receiverList, setReceiverList] = useState([]);
  const [previousMessage, setPreviousMessage] = useState([]);
  const [recId, setRecId] = useState(userid);
  const [value, setValue] = useState('');
  const [socketMessage, setSocketMessage] = useState(defaultDataSocket);
  const [chatWith, setChatWith] = useState(name);
  const [condition, setCondition] = useState('');
  const [onlineUsers, setOnlineUsers] = useState({});
  const [userId, setUserId] = useState(Your_id);
  //get your id
  let userData = localStorage.getItem("userDta");
  let newData = JSON.parse(userData);
  Your_id = newData.user.user_id;
  //Online user

  useEffect(() => {
   console.log(receiverList);
    socket.on('onlineUser', (data) =>{
      const receData = receiverList.map((item,key)=> {
        if(data.users[item.id]){
          item.islogin = true;
        }   
        return item;
      })
     setReceiverList(receData);
    })
  },);

  //Send your id to socket 
  socket.emit("setUserId", Your_id);

   //Get message from socket
   socket.on("privateMessage", (data) => {
    console.log(data.message);
    console.log(data.fromUserId);
    const rd = {
      message_content: data.message,
      message_id: "",
      receiver_id: Your_id,
      sender_id: data.fromUserId,
      timestamp: "",
    };
    setPreviousMessage([...previousMessage, rd]);
  });
  //send msg
  const sendMessage = async (e) => {
    e.preventDefault();

    const dd = {
      message_content: value,
      message_id: "",
      receiver_id: recId,
      sender_id: Your_id,
      timestamp: "",
    };
    setPreviousMessage([...previousMessage, dd]);
    //send msg to socket
    socket.emit("privateMessage", socketMessage);
    //send msg to api
    const StartChat = await PostAPI("chating/chatstart", messages);
    if (StartChat.response_code == "200") {
      //toast(StartChat.message);
    }

    if (StartChat.response_code == "500") {
      //toast.error(StartChat.message);
    }
    setValue("");
  };
   
  //Handle input value
  const handleInputValue = (e) => {
    e.preventDefault();
    const data = e.target.value;
    setValue(data);
    //set data for socket
    if (data.trim() !== "") {
      setSocketMessage({
        ...socketMessage,
        toUserId: recId,
        message: data,
        fromUserId: Your_id,
      });
    }
    //set data for api
    setMessages({
      ...messages,
      message_content: data,
      receiver_id: recId,
    });
  };

  //Reciver List
  const getRecieverUserList = async () => {
    const useListData = await PostAPI("chating/chat_users_list");

    if (useListData.response_code == 200) {
      setReceiverList(useListData.data);
    } else {
      //error(useListData.message);
    }
  };

  useEffect(() => {
    getRecieverUserList();
  }, []);



  //Previous chat
  const getPreviousChat = async () => {
    const useListData = await PostAPI("chating/previous_chat_view", {
      receiver_id: recId,
    });
    if (useListData.response_code == 200) {
      setPreviousMessage(useListData.data);
    } else {
      // toast.error(useListData.message);
    }
  };

  //display chat
  const displayPreviousChat = (e, id, name) => {
    e.preventDefault();
    setRecId(id);
    setChatWith(name);
  };

  useEffect(() => {
    getPreviousChat(recId);
  }, []);

  useEffect(() => {
    getPreviousChat(recId);
  }, [recId]);

  const handleKeyPressed = (e) => {
    if(e.key === 'Enter'){
      sendMessage(e);
    }
  }

  return (
    <>
      <div class="content-wrapper">
        <div class="row">
        <div class="page-header">
              <h3 class="page-title">Chat </h3>
            </div>    
            <div class="col-lg-12 grid-margin stretch-card">

                <div class="card">
                  <div class="card-body">
        
          <div class="chat_container clearfix">
            <div class="people-list" id="people-list">
              <div class="search form-group">
                <input type="text" placeholder="search"/>
              </div>
              <ul class="list username_show_chat list-unstyled">
              {receiverList == 0 ?  <p>No users found</p> : ""}
                {receiverList.map((value) => {
                  return (
                    <li
                      class="clearfix text-decoration-none"
                      onClick={(e) =>
                        displayPreviousChat(e, value.id, value.first_name)
                      }
                    >
                      <img
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg"
                        alt="avatar"
                      />
                      <div class="about">
                        <div class="name">{value.first_name}</div>
                        <div class="status">
                          {value.islogin==true ? <i class="fa fa-circle online" style={{fontSize:'17px'}}>online</i>  : "offline"}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div class="chat">
          
              <div class="chat-header clearfix">
                <img
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
                  alt="avatar"
                />

                <div class="chat-about">
                  <div class="chat-with">Chat with {chatWith}</div>
                  <div class="chat-num-messages"></div>
                </div>
                <i class="fa fa-star"></i>
              </div>

              <div class="chat-history">
                <ul class="list-unstyled">
                  {previousMessage.map((value) => {
                    if (recId == value.receiver_id) {
                      return (
                        <li class="clearfix">
                          <div class="message-data align-right">
                            <span class="message-data-time">
                              {value.timestamp}
                            </span>{" "}
                            &nbsp; &nbsp;
                            <span class="message-data-name">You</span>{" "}
                            <i class="fa fa-circle me"></i>
                          </div>
                          <div class="message other-message float-right">
                            {value.message_content}
                          </div>
                        </li>
                      );
                    } else {
                      return (
                        <li>
                          <div class="message-data">
                            <span class="message-data-name">
                              <i class="fa fa-circle online"></i>
                              {chatWith}
                            </span>
                            <span class="message-data-time">
                              {value.timestamp}
                            </span>
                          </div>
                          <div class="message my-message">
                            {value.message_content}
                          </div>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>

              <div class="chat-message clearfix chat_message_send_div">
                <form onSubmit={sendMessage}>
                  <textarea
                    name="message-to-send"
                    id="message-to-send"
                    placeholder="Type your message"
                    rows="2"
                    value={value}
                    onChange={(e) => handleInputValue(e)}
                    onKeyPress={handleKeyPressed}
                  ></textarea>
                  {/* <i class="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                  <i class="fa fa-file-image-o"></i> */}
                  {value ?  
                  <button  className="btn btn-primary"  type="submit" >Send</button>
                  :  <button  className="btn btn-primary" disabled type="submit" >Send</button>
                  }
                </form>
              </div>
            </div>
          </div>
       
      </div>
      </div>
      </div>
       
      </div>
      </div>
    </>
  );
}

export default Chat;
