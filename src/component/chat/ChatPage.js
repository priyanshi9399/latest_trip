
import {useState, useEffect,useRef} from "react";
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';


import './style.css'
import { useSocket } from '../../SocketContext';


const ChatPage = () => {
 
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null);
  const socket = useSocket();

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  return (

    <div class="content-wrapper">
            <main role="main" class="col-md-12 pt-3 px-4">

            
    <div className="chat">
      <ChatBar socket={socket}  />
      <div className="chat__main">
        <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
        <ChatFooter socket={socket} />
      </div>
    </div>
    </main>
    </div>
  );
};

export default ChatPage;