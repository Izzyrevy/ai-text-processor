// src/services/summarizationService.js

export const summarizeText = async (text) => {
    try {
        // Check for WebGPU support
        if (!navigator.gpu) {
            throw new Error('WebGPU is not supported in this browser.');
        }

        // Request a GPU adapter
        const adapter = await getGPUAdapter();
        if (!adapter) {
            console.warn('No compatible GPU adapter found. Summarization may be limited.');
        }

        // Check if the Summarizer API is supported
        if ('ai' in window && 'summarizer' in window.ai) {
            const capabilities = await window.ai.summarizer.capabilities();
            console.log('Summarizer capabilities:', capabilities);
                
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

// Function to get a compatible GPU adapter
async function getGPUAdapter() {
    if (!navigator.gpu) {
        console.error("WebGPU is not supported in this browser.");
        return null;
    }

    try {
        // Request a GPU adapter with specific options
        const adapter = await navigator.gpu.requestAdapter({
            powerPreference: 'high-performance', // Try 'low-power' or 'default' if this fails
        });

        if (!adapter) {
            console.warn("No suitable GPU adapter found. Trying with different options...");
            // Try requesting with different options
            const alternativeAdapter = await navigator.gpu.requestAdapter({
                powerPreference: 'low-power' // Try a different power preference
            });

            if (!alternativeAdapter) {
                console.error("No compatible GPU adapter found.");
                return null;
            }

            return alternativeAdapter;
        }

        return adapter;
    } catch (error) {
        console.error("Error requesting GPU adapter:", error);
        return null;
    }
}