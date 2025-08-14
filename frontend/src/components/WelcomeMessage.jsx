import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const WelcomeMessage = ({ show, onHide }) => {
  React.useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onHide(), 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  if (!show) return null;

  return (
    <motion.div
      className="welcome-message"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      layout
    >
      <div className="welcome-content">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Sparkles size={24} />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          Welcome to PDF Chat AI!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          Your PDF is ready. Start asking questions to explore its content.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default WelcomeMessage; 