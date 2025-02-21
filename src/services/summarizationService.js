
export const summarizeText = async (text, context = 'This text is a lengthy article or document that needs summarization.') => {
    try {
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            throw new Error('Input text cannot be empty.');
        }

        if ('ai' in window && 'summarizer' in window.ai) {
            const capabilities = await window.ai.summarizer.capabilities();
            console.log('Summarizer capabilities:', capabilities);
                
            const available = capabilities.available;

            if (available === 'no') {
                throw new Error('Summarizer API is not usable at the moment.'); //It doesn't cross this code mark
            }

            const options = {
                sharedContext: context,
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
                await summarizer.ready; 
            }

    
            const summary = await summarizer.summarize(text, { context });
            return summary; 
        } else {
            throw new Error('Summarizer API is not supported in this browser.');
        }
    } catch (error) {
        console.error('Error summarizing text:', error);
        throw new Error('Summarization failed. Please try again later.');
    }
};