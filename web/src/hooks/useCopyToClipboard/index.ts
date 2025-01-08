import { toast } from '@shtcut-ui/react';

const useCopyToClipboard = () => {
    const handleCopy = (text: string) => {
        if (text) {
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    toast({
                        title: 'Copied',
                        description: 'Link copied to clipboard!'
                    });
                })
                .catch((err) => {
                    toast({
                        title: 'Copied',
                        description: `Failed to copy text: ${err}`
                    });
                });
        }
    };

    return { handleCopy };
};

export default useCopyToClipboard;
