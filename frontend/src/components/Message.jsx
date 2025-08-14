import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import clsx from 'clsx';

const Message = ({ message, index }) => {
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      className={clsx('message', message.sender, message.type)}
      initial={{ opacity: 0, y: 30, scale: 0.9, x: message.sender === 'user' ? 20 : -20 }}
      animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.9, x: message.sender === 'user' ? 20 : -20 }}
      transition={{ 
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: index * 0.1
      }}
      layout
      whileHover={{ 
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className="message-avatar"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
      </motion.div>
      <motion.div 
        className="message-content"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className="message-text">{message.text}</div>
        <motion.div 
          className="message-time"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          {formatTime(message.timestamp)}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Message; 