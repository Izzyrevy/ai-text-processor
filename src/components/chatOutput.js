// src/components/ChatOutput.js
import React from 'react';

const ChatOutput = ({ output, language, summary, translation }) => {
    return (
        <div className="chat-output">
            <p>{output}</p>
            <p><strong>Detected Language:</strong> {language}</p>
            {summary && <p><strong>Summary:</strong> {summary}</p>}
            {translation && <p><strong>Translation:</strong> {translation}</p>}
        </div>
    );
};

export default ChatOutput;