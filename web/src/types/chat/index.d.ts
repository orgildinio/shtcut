/** @format */

interface SupportEmailViewProps {
    form: any;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

interface ChatState {
    inputValue: string;
    showEmoji: boolean;
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
    emojiPickerRef: LegacyRef<HTMLButtonElement> | undefined;
    emojiIconRef?: LegacyRef<HTMLButtonElement> | undefined;
}

interface ChatActions {
    handleTextareaKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    handleEmojiSelect: (emoji: { native: string }) => void;
    handleClickOutside: (event: MouseEvent) => void;
    scrollChatToBottom: () => void;
    setShowEmoji: (val: boolean) => void;
}

interface UseChatReturn {
    chatState: ChatState;
    actions: ChatActions;
}

interface Message {
    id: number;
    type: 'text' | 'image';
    content: string;
    sender: 'user' | 'agent';
    time: string;
}
