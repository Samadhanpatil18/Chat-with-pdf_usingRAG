import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, RefreshCw } from 'lucide-react';

const ChatHeader = ({ fileName, onNewChat, onRefresh }) => {
    return (
        <div className="chat-header">
            <div className="file-info">
                <FileText size={20} />
                <span>{fileName}</span>
                <CheckCircle size={16} className="success-icon" />
            </div>
            <div className="header-actions">
                <motion.button
                    className="refresh-btn"
                    onClick={onRefresh}
                    whileHover={{ scale: 1.05, rotate: 180 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    title="Refresh page"
                >
                    <RefreshCw size={16} />
                </motion.button>
                <motion.button
                    className="new-chat-btn"
                    onClick={onNewChat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    New Chat
                </motion.button>
            </div>
        </div>
    );
};

export default ChatHeader; 