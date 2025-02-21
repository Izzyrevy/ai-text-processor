export const translateText = async (text, targetLanguage) => {
    try {
        if ('ai' in window && 'translator' in window.ai) {
            const translator = await window.ai.translator.create({
                sourceLanguage: 'en', 
                targetLanguage: targetLanguage, 
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