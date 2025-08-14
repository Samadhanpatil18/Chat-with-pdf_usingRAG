import React from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

const MessageForm = ({ input, setInput, onSubmit, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSubmit(e);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="message-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="input-wrapper">
        <motion.input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your PDF..."
          disabled={isLoading}
          className="message-input"
          whileFocus={{ scale: 1.02 }}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        />
        <motion.button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="send-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          whileFocus={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="spinner" />
            </motion.div>
          ) : (
            <Send size={18} />
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default MessageForm; 