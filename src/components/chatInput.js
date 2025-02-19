// src/components/ChatInput.js
import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSend(text);
            setText('');
        }
    };

    return (
        <div className="chat-input">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message..."
                aria-label="Input text area"
            />
            <button onClick={handleSend} aria-label="Send message">
                <span role="img" aria-label="send">📤</span>
            </button>
        </div>
    );
};

export default ChatInput;