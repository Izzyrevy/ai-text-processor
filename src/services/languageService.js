// src/services/languageService.js

export const detectLanguage = async (text) => {
    try {
        console.log('Detecting language for:', text);
        
        if ('ai' in window && 'translator' in window.ai) {
            const translator = await window.ai.translator.create({
                sourceLanguage: 'en', 
                targetLanguage: 'fr', 
            });

            const detectedLanguage = await translator.detect(text);
            console.log('Detected Language:', detectedLanguage);
            return detectedLanguage.language; 
        } else {
            throw new Error('Translator API is not supported in this browser.');
        }
    } catch (error) {
        console.error('Error detecting language:', error.message || error);
        throw new Error('Language detection failed. Please try again later.');
    }
};