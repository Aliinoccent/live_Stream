import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useRef } from "react";
const socket = io('http://localhost:8000/');

const Chatbox = () => {
  const [input, setInput] = useState('');
  const [messege, setMessege] = useState([]);

  useEffect(() => {
    socket.connect();
console.log("use effect")
   
    socket.on("reciver", (message) => {
    console.log(message)
    if(message){
        console.log("received message", message);
        setMessege(message);
        
    }
    console.log("this is call first time") 
    });
    return () => {
      socket.off("reciver");
    };
  }, [messege]);

  
  const handelMes = () => {
    if (input.trim() === '') return;
    socket.emit("sendMsg", input);
    setMessege(prev => [...prev, `You: ${input}`]); // Show your own message
    setInput("");
  };

  return (
    <div className="w-80">
      <div className="flex flex-col justify-between min-h-screen bg-gray-100">
        <div className="p-4">
          <h1 className="text-xl font-semibold">CHATTING NOW</h1>
        </div>

        <ul className="flex-1 overflow-y-auto p-4 space-y-2">
          {messege.map((msg, index) => (
            <li key={index} className="bg-white p-2 rounded shadow list">
              {msg}
            </li>
          ))}
        </ul>

        <div className="w-full bg-white p-4 border-t flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
            onClick={handelMes}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
