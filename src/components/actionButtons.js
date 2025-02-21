// src/components/ActionButtons.js
import React from 'react';

const ActionButtons = ({ onSummarize, onTranslate, isSummarizeEnabled }) => {
    return (
        <div className="action-buttons">
            {isSummarizeEnabled && 
            <button onClick={onSummarize} className="btn summarize-btn">Summarize</button>}
            <button onClick={onTranslate} className="btn translate-btn">Translate</button>
        </div>
    );
};

export default ActionButtons;