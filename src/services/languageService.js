// src/services/languageService.js

export const detectLanguage = async (text) => {
    try {
        console.log('Detecting language for:', text);
        
        
        if ('translation' in window && 'createDetector' in window.translation) {
            const detector = await window.translation.createDetector(); // Create a language detector

            // Use the detector to detect the language
            const [{ detectedLanguage }] = await detector.detect(text);
            console.log('Detected Language:', detectedLanguage);
            return detectedLanguage; 
        } else {
            console.warn('Language detection API is not supported in this browser. Falling back to a different method.');
            return 'en'; // Default to English or implement a different detection method
        }
    } catch (error) {
        console.error('Error detecting language:', error.message || error);
        throw new Error('Language detection failed. Please try again later.');
    }
};