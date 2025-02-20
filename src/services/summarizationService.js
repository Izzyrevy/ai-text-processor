// src/services/summarizationService.js

export const summarizeText = async (text) => {
    try {
        // Check if the Summarizer API is supported
        if ('ai' in window && 'summarizer' in window.ai) {
            const capabilities = await window.ai.summarizer.capabilities();
            const available = capabilities.available;

            if (available === 'no') {
                throw new Error('Summarizer API is not usable at the moment.');
            }

            // Create the summarizer
            const options = {
                sharedContext: 'This text is intended for summarization.',
                type: 'key-points', 
                format: 'markdown', 
                length: 'medium', 
            };

            let summarizer;
            if (available === 'readily') {
                summarizer = await window.ai.summarizer.create(options);
            } else {
                summarizer = await window.ai.summarizer.create(options);
                summarizer.addEventListener('downloadprogress', (e) => {
                    console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
                });
                await summarizer.ready; // Wait for the model to be ready
            }

            // Summarize the text
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