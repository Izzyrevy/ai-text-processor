import { toast } from 'sonner'; 

export const translateText = async (text, targetLanguage) => {
    try {
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            toast.error('Input text cannot be empty.'); 
            throw new Error('Input text cannot be empty.');
        }

        if ('ai' in window && 'translator' in window.ai) {
            const translator = await window.ai.translator.create({
                sourceLanguage: 'en', 
                targetLanguage: targetLanguage, 
            });

            const translatedText = await translator.translate(text);
            toast.success('Text translated successfully!'); 
            return translatedText;
        } else {
            toast.warn('Translator API is not supported in this browser.');
            throw new Error('Translator API is not supported in this browser.');
        }
    } catch (error) {
        console.error('Error translating text:', error);
        toast.error('Translation failed. Please try again later.');
    }
};