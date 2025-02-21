/** @format */

import React, { useEffect, useRef, useState } from 'react';

const useChat = (): UseChatReturn => {
    const [inputValue, setInputValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const emojiPickerRef = useRef<HTMLButtonElement | null>(null);
    const emojiIconRef = useRef<HTMLButtonElement | null>(null);
    const [showEmoji, setShowEmoji] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
        }
    };
    const handleEmojiSelect = (emoji: any) => {
        setInputValue(inputValue + emoji.native);
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (
            emojiPickerRef.current &&
            !emojiPickerRef.current.contains(event.target as Node) &&
            !emojiIconRef.current?.contains(event.target as Node)
        ) {
            setShowEmoji(false);
        }
    };

    const scrollChatToBottom = () => {
        if (chatContainerRef.current) {
            const chatContainer = chatContainerRef.current;
            const paddingBottom = 100;

            chatContainer.style.display = 'none';
            (() => chatContainer.offsetHeight)();
            chatContainer.style.display = 'block';

            const lastMessage = chatContainer.lastElementChild as HTMLElement;
            if (lastMessage) {
                chatContainer.scrollTop =
                    lastMessage.offsetTop + lastMessage.offsetHeight - chatContainer.clientHeight + paddingBottom;
            }
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [inputValue]);

    useEffect(() => {
        if (showEmoji) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEmoji]);

    return {
        chatState: {
            inputValue,
            showEmoji,
            textareaRef,
            emojiPickerRef,
            emojiIconRef
        },

        actions: {
            handleTextareaKeyDown,
            setInputValue,
            handleEmojiSelect,
            handleClickOutside,
            scrollChatToBottom,
            setShowEmoji
        }
    };
};

export default useChat;
