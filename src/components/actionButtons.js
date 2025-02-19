// src/components/ActionButtons.js
import React from 'react';

const ActionButtons = ({ onSummarize, onTranslate, isSummarizeEnabled }) => {
    return (
        <div className="action-buttons">
            {isSummarizeEnabled && <button onClick={onSummarize}>Summarize</button>}
            <button onClick={onTranslate}>Translate</button>
        </div>
    );
};

 export default ActionButtons;