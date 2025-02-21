
import React, { useState } from 'react';
import ChatInput from './components/chatInput';
import ChatOutput from './components/chatOutput';
import LanguageSelector from './components/languageSelector';
import ActionButtons from './components/actionButtons';
import { detectLanguage } from './services/languageService'; 
import { summarizeText } from './services/summarizationService'; 
import { translateText } from './services/translateService'; 
import './App.css';

const App = () => {
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState('');
    const [summary, setSummary] = useState('');
    const [translation, setTranslation] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('fr'); 
    const [error, setError] = useState('');
    const [outputVisible, setOutputVisible] = useState(false); 

    const handleSend = async (text) => {
        setOutput(text);
        setOutputVisible(true); 
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

    const isSummarizeEnabled = output.length > 150 && language === 'en';

    return (
        <div className="app">
            <h1>AI Text Processing Suite</h1>
            <div className="chat-container"> 
                {outputVisible && (
                    <ChatOutput output={output} language={language} summary={summary} translation={translation} />
                )}
                <ChatInput onSend={handleSend} />
                <div className="controls">
                    <LanguageSelector selectedLanguage={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} />
                    <ActionButtons 
                        onSummarize={handleSummarize} 
                        onTranslate={handleTranslate} 
                        isSummarizeEnabled={isSummarizeEnabled} 
                    />
                </div>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default App;