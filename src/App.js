// src/App.js
import React, { useState } from 'react';
import ChatInput from './components/chatInput';
import ChatOutput from './components/chatOutput';
import LanguageSelector from './components/languageSelector';
import ActionButtons from './components/actionButtons';
import { detectLanguage } from './services/languageService'; 
import { summarizeText } from './services/summarizationService'; 
import { translateText } from './services/translateService'; 

const App = () => {
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState('');
    const [summary, setSummary] = useState('');
    const [translation, setTranslation] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('fr'); // Default target language
    const [error, setError] = useState('');

    const handleSend = async (text) => {
        setOutput(text);
        try {
            const detectedLanguage = await detectLanguage(text);
            setLanguage(detectedLanguage);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSummarize = async () => {
        if (output.length > 150 && language === 'en') {
            try {
                const summarizedText = await summarizeText(output);
                setSummary(summarizedText);
            } catch (err) {
                setError(err.message);
            }
        } else {
            setError('Text must be longer than 150 characters and in English for summarization.');
        }
    };

    const handleTranslate = async () => {
        try {
            const translatedText = await translateText(output, selectedLanguage);
            setTranslation(translatedText);
        } catch (error) {
            console.error('Translation error:', error);
            setError('Translation failed. Please try again later.');
        }
    };

    return (
        <div className="app">
            <h1>AI-Powered Text Processing Interface</h1>
            <ChatInput onSend={handleSend} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ChatOutput output={output} language={language} summary={summary} translation={translation} />
            <LanguageSelector selectedLanguage={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} />
            <ActionButtons onSummarize={handleSummarize} onTranslate={handleTranslate} />
        </div>
    );
};

export default App;