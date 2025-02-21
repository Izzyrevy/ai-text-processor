import React, { useState } from 'react';
import ChatInput from './components/chatInput';
import ChatOutput from './components/chatOutput';
import LanguageSelector from './components/languageSelector';
import ActionButtons from './components/actionButtons';
import { detectLanguage } from './services/languageService'; 
import { summarizeText } from './services/summarizationService'; 
import { translateText } from './services/translateService'; 
import { Toaster } from "sonner";
import './App.css';

const App = () => {
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState('');
    const [summary, setSummary] = useState('');
    const [translation, setTranslation] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('fr'); 
    const [error, setError] = useState('');
    const [outputVisible, setOutputVisible] = useState(false); 
    const [loading, setLoading] = useState(false);

    const handleSend = async (text) => {
        setOutput(text);
        setOutputVisible(true); 
        setTranslation(''); 
        try {
            const detectedLanguage = await detectLanguage(text);
            setLanguage(detectedLanguage);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSummarize = async () => {
        if (output.length > 150 && language === 'en') {
            setLoading(true); 
            try {
                const summarizedText = await summarizeText(output);
                setSummary(summarizedText);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        } else {
            setError('Text must be longer than 150 characters and in English for summarization.');
        }
    };

    const handleTranslate = async () => {
        setLoading(true); 
        try {
            const translatedText = await translateText(output, selectedLanguage);
            setTranslation(translatedText);
        } catch (error) {
            console.error('Translation error:', error);
            setError('Translation failed. Please try again later.');
        } finally {
            setLoading(false); 
        }
    };

    const isSummarizeEnabled = output.length > 150 && language === 'en';

    return (
        <div className="app">
            <h1>AI Text Processing Suite</h1>
            <div className="chat-container"> 
                <Toaster position="top-right" 
                ToastOptions={{
                    className: 'toast-class',
                    success: {
                        className: 'success-text',
                    },
                    error: {
                        className: 'error-text',
                    }
                }}
                />
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
                {loading && <p>Loading...</p>} 
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default App;