// src/components/LanguageSelector.js
import React from 'react';

const LanguageSelector = ({ selectedLanguage, onChange }) => {
    return (
        <div className="language-selector">
            <label>
                Select Language:
                <select value={selectedLanguage} onChange={onChange}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                </select>
            </label>
        </div>
    );
};

export default LanguageSelector;