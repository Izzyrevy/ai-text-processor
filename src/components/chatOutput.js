
import React from 'react';
import './ChatOutput.css';

const ChatOutput = ({ output, language, summary, translation }) => {
    return (
        <div className="chat-output-container">
            <div className="chat-output">
                <p className="output-text">{output}</p>
                <p className="language-info"><strong>Detected Language:</strong> {language}</p>
                {summary && <p className="summary-info"><strong>Summary:</strong> {summary}</p>}
                {translation && <p className="translation-info"><strong>Translation:</strong> {translation}</p>}
            </div>
        </div>
    );
};

export default ChatOutput;