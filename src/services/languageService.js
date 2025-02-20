
export const detectLanguage = async (text) => {
    try {
        console.log('Detecting language for:', text);
        
        if ('ai' in window && 'languageDetector' in window.ai) {
            const capabilities = await window.ai.languageDetector.capabilities();
            const canDetect = capabilities.available;

            let detector;
            if (canDetect === 'no') {
                console.warn('Language detector is not usable at the moment.');
                return 'en'; 
            }
            if (canDetect === 'readily') {
                detector = await window.ai.languageDetector.create();
            } else {
                detector = await window.ai.languageDetector.create({
                    monitor(m) {
                        m.addEventListener('downloadprogress', (e) => {
                            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
                        });
                    },
                });
                await detector.ready; 
            }

            const results = await detector.detect(text);
            console.log('Detection results:', results);
 
            return results[0].detectedLanguage; 
        } else {
            console.warn('Language detection API is not supported in this browser. Falling back to a different method.');
            return 'en'; 
        }
    } catch (error) {
        console.error('Error detecting language:', error.message || error);
        throw new Error('Language detection failed. Please try again later.');
    }
};