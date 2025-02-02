import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([
        { role: "assistant", content: "Hi! I'm your Python tutor. Ask me anything!" }
    ]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = { role: "user", content: message };
        setChat([...chat, userMessage]);

        try {
            const response = await axios.post("http://localhost:5000/chat", { message });
            const aiMessage = { role: "assistant", content: response.data.reply };
            setChat([...chat, userMessage, aiMessage]);
        } catch (error) {
            setChat([...chat, { role: "assistant", content: "Oops! Something went wrong." }]);
        }

        setMessage("");
    };

    return (
        <div className="app">
            <h1>AI Python Tutor 🐍</h1>
            <div className="chat-box">
                {chat.map((msg, index) => (
                    <p key={index} className={msg.role === "user" ? "user" : "ai"}>
                        {msg.content}
                    </p>
                ))}
            </div>
            <input 
                type="text" 
                placeholder="Ask me about Python..." 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;
