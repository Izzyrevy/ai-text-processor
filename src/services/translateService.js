// src/services/translateService.js

export const translateText = async (text, targetLanguage) => {
    try {
        // Use window instead of self
        if ('ai' in window && 'translator' in window.ai) {
            const token = process.env.REACT_APP_TRANSLATION_API_TOKEN; // Access the token from environment variables

            const translator = await window.ai.translator.create({
                sourceLanguage: 'en', // Set the source language
                targetLanguage: targetLanguage, // Use the target language passed as a parameter
                token: token, // Include the token in the options
            });

            const translatedText = await translator.translate(text);
            return translatedText;
        } else {
            throw new Error('Translator API is not supported in this browser.');
        }
    } catch (error) {
        console.error('Error translating text:', error);
        throw new Error('Translation failed. Please try again later.');
    }
};