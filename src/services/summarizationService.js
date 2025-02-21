import { toast } from 'sonner'; 

export const summarizeText = async (text, context = 'This text is a lengthy article or document that needs summarization.') => {
    try {
        if (!text || typeof text !== 'string' || text.trim().length === 0) {
            toast.error('Input text cannot be empty.'); 
            throw new Error('Input text cannot be empty.');
        }

        if ('ai' in window && 'summarizer' in window.ai) {
            const capabilities = await window.ai.summarizer.capabilities();
            console.log('Summarizer capabilities:', capabilities);
                
            const available = capabilities.available;

            if (available === 'no') {
                toast.warn('Summarizer API is not usable at the moment.'); // Warning toast
                throw new Error('Summarizer API is not usable at the moment.');
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
            toast.success('Text summarized successfully!'); 
            return summary; 
        } else {
            toast.warn('Summarizer API is not supported in this browser.'); 
            throw new Error('Summarizer API is not supported in this browser.');
        }
    } catch (error) {
        console.error('Error summarizing text:', error);
        toast.error('Summarization failed. Please try again later.');
    }
};