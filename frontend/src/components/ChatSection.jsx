import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatHeader from './ChatHeader';
import WelcomeMessage from './WelcomeMessage';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import MessageForm from './MessageForm';

const ChatSection = ({
    fileName,
    messages,
    input,
    setInput,
    isLoading,
    showWelcome,
    setShowWelcome,
    onNewChat,
    onSendMessage
}) => {
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <motion.div
            className="chat-section"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }}
        >
            <ChatHeader
                fileName={fileName}
                onNewChat={onNewChat}
                onRefresh={handleRefresh}
            />

            <div className="chat-window">
                <AnimatePresence mode="popLayout">
                    {showWelcome && (
                        <WelcomeMessage
                            key="welcome"
                            show={showWelcome}
                            onHide={() => setShowWelcome(false)}
                        />
                    )}

                    {messages.map((msg, index) => (
                        <Message
                            key={`msg-${index}`}
                            message={msg}
                            index={index}
                        />
                    ))}
                </AnimatePresence>

                {isLoading && <TypingIndicator />}
                <div ref={chatEndRef} />
            </div>

            <MessageForm
                input={input}
                setInput={setInput}
                onSubmit={onSendMessage}
                isLoading={isLoading}
            />
        </motion.div>
    );
};

export default ChatSection; 