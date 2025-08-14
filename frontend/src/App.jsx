
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
 import PDFUpload from './components/PDFUpload';
import ChatSection from './components/ChatSection';
import { usePDFHandler } from './hooks/usePDFHandler';
import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [showWelcome, setShowWelcome] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

    const {
        pdfUploaded,
        uploading,
        fileName,
        messages,
        isLoading,
        handleFileUpload,
        handleSendMessage,
        clearChat
    } = usePDFHandler();

    // Add 'loaded' class after initial render to prevent CSS conflicts
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
            // Add loaded class to main elements
            document.querySelector('.app')?.classList.add('loaded');
            document.querySelector('.app-container')?.classList.add('loaded');
            document.querySelector('.header')?.classList.add('loaded');
            document.querySelector('.main-content')?.classList.add('loaded');
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleSendMessageWrapper = (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const messageText = input;
        setInput('');
        handleSendMessage(messageText);
    };

    const handleNewChat = () => {
        clearChat();
        setShowWelcome(true);
    };

    // Main container variants for smooth orchestration without layout shifts
    const containerVariants = {
        hidden: {
            opacity: 0,
            y: 0  // No initial Y offset to prevent shift
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    // Main content variants
    const mainContentVariants = {
        hidden: {
            opacity: 0,
            y: 0  // No initial Y offset to prevent shift
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 0.2
            }
        }
    };

    // Upload section variants
    const uploadVariants = {
        hidden: {
            opacity: 0,
            y: 0,  // No initial Y offset to prevent shift
            scale: 1  // No initial scale to prevent shift
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: 0,  // No exit Y offset to prevent shift
            scale: 1,  // No exit scale to prevent shift
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    // Chat section variants
    const chatVariants = {
        hidden: {
            opacity: 0,
            y: 0,  // No initial Y offset to prevent shift
            scale: 1  // No initial scale to prevent shift
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: 0,  // No exit Y offset to prevent shift
            scale: 1,  // No exit scale to prevent shift
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    return (
        <motion.div
            className="app"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="app-container">
                <Header />

                <motion.main
                    className="main-content"
                    variants={mainContentVariants}
                >
                    <AnimatePresence mode="wait">
                        {!pdfUploaded ? (
                            <motion.div
                                key="upload"
                                variants={uploadVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <PDFUpload
                                    onFileUpload={handleFileUpload}
                                    uploading={uploading}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="chat"
                                variants={chatVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <ChatSection
                                    fileName={fileName}
                                    messages={messages}
                                    input={input}
                                    setInput={setInput}
                                    isLoading={isLoading}
                                    showWelcome={showWelcome}
                                    setShowWelcome={setShowWelcome}
                                    onNewChat={handleNewChat}
                                    onSendMessage={handleSendMessageWrapper}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.main>
            </div>
        </motion.div>
    );
}

export default App;