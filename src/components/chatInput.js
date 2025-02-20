// src/components/ChatInput.js
import React, { useState } from 'react';
import './ChatInput.css'; // Import the CSS file for styling

const ChatInput = ({ onSend }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSend(text);
            setText('');
        }
    };

    return (
        <div className="chat-input-container">
            <textarea
                className="chat-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message..."
                aria-label="Input text area"
            />
            <button className="send-button" onClick={handleSend} aria-label="Send message">
                <span role="img" aria-label="send">📤</span>
            </button>
        </div>
    );
};

export default ChatInput;