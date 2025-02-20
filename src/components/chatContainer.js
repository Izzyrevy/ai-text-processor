// src/components/ChatContainer.js
import React, { useState } from 'react';
import ChatInput from './chatInput.js';
import ChatOutput from './chatOutput.js';
import './ChatContainer.css'; // Import the CSS file for styling

const ChatContainer = () => {
    const [messages, setMessages] = useState([]);
    const [isInputOnLeft, setIsInputOnLeft] = useState(true);

    const handleSend = (text) => {
        const newMessage = {
            text,
            language: 'en', // Placeholder for detected language
            summary: '', // Placeholder for summary
            translation: '', // Placeholder for translation
        };
        setMessages([...messages, newMessage]);
        setIsInputOnLeft(!isInputOnLeft); };

    return (
        <div className="chat-container">
            {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${isInputOnLeft ? 'left' : 'right'}`}>
                    {isInputOnLeft ? (
                        <ChatOutput {...msg} />
                    ) : (
                        <ChatInput onSend={handleSend} />
                    )}
                </div>
            ))}
            <div className={`chat-message ${isInputOnLeft ? 'left' : 'right'}`}>
                {isInputOnLeft ? (
                    <ChatInput onSend={handleSend} />
                ) : (
                    <ChatOutput {...messages[messages.length - 1]} />
                )}
            </div>
        </div>
    );
};

export default ChatContainer;