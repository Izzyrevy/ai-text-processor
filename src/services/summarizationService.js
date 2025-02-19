// src/services/summarizationService.js

export const summarizeText = async (text) => {
    try {
        // Check if the AI Summarizer API is supported
        if ('ai' in window && 'summarizer' in window.ai) {
            const summarizer = await window.ai.summarizer.create();

            // Use the summarization feature
            const summary = await summarizer.summarize(text);
            return summary; // Adjust based on the API response structure
        } else {
            throw new Error('Summarizer API is not supported in this browser.');
        }
    } catch (error) {
        console.error('Error summarizing text:', error);
        throw new Error('Summarization failed. Please try again later.');
    }
};