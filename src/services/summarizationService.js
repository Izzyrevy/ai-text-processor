// src/services/summarizationService.js

export const summarizeText = async (text) => {
    try {
        if ('ai' in window && 'summarizer' in window.ai) {
            const capabilities = await window.ai.summarizer.capabilities();
            if (capabilities.available === 'no') {
                throw new Error('Summarizer API is not usable at the moment.');
            }

            const summarizer = await window.ai.summarizer.create({
                sharedContext: 'This text is intended for summarization.',
                type: 'key-points', 
                format: 'markdown', 
                length: 'medium', 
                token: process.env.REACT_APP_SUMMARIZER_API_TOKEN, 
            });

            const summary = await summarizer.summarize(text, {
                context: 'This text is a lengthy article or document that needs summarization.',
            });

            return summary; 
        } else {
            throw new Error('Summarizer API is not supported in this browser.');
        }
    } catch (error) {
        console.error('Error summarizing text:', error);
        throw new Error('Summarization failed. Please try again later.');
    }
};