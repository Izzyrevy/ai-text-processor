// src/components/LanguageSelector.js
import React from 'react';

const LanguageSelector = ({ selectedLanguage, onChange }) => {
    return (
        <div className="language-selector">
            <label htmlFor='language' className='language-label'>
                Select Language:
                <select className="language-select" value={selectedLanguage} onChange={onChange}>
                    <option value="en">English</option>
                    <option value="pt">Portuguese</option>
                    <option value="es">Spanish</option>
                    <option value="ru">Russian</option>
                    <option value="tr">Turkish</option>
                    <option value="fr">French</option>
                </select>
            </label>
        </div>
    );
};

export default LanguageSelector;