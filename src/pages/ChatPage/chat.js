import React, { useState, useEffect, useRef } from 'react';
import ChatInput from './chatInput';
import io from 'socket.io-client';
import './chat.css'; // 导入样式文件
const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io('http://localhost:3300');
        if (!socketRef.current) return;

        socketRef.current.on('chat message', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (socketRef.current && inputValue.trim()) {
            socketRef.current.emit('chat message', inputValue);
            setInputValue('');
        }
    };

    useEffect(() => {
        if (inputValue !== '') {
            sendMessage();
        }
        //使用eslint-disable-next-line注释来忽略这条特定的警告:
        //React Hook useEffect has a missing dependency: 'sendMessage'. 
        //Either include it or remove the dependency array
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue]);

    return (
        <div className="chat-container d-flex flex-column">
            <div className="chat-header">
                <h1>Real-time Chat</h1>
            </div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <span className="username">{msg.username}:</span>
                        <span className="message-content">{msg.message}</span>
                    </div>
                ))}
            </div>
            <ChatInput setInputValue={setInputValue} />
        </div>
    );
};

export default Chat;
