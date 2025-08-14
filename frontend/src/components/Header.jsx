import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Header = () => {
    // Motion values for enhanced interactions
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
    const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);
    const springConfig = { damping: 20, stiffness: 300 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(event.clientX - centerX);
        mouseY.set(event.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Container variants for smooth orchestration
    const containerVariants = {
        hidden: {
            opacity: 0,
            y: -30,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    // Logo variants
    const logoVariants = {
        hidden: {
            scale: 0,
            rotate: -180,
            opacity: 0,
            y: 20
        },
        visible: {
            scale: 1,
            rotate: 0,
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.8
            }
        }
    };

    // Text variants
    const textVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    // Icon animation variants
    const iconVariants = {
        animate: {
            y: [0, -8, 0],
            rotate: [0, 3, -3, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // Glow animation variants
    const glowVariants = {
        animate: {
            filter: [
                "drop-shadow(0 0 20px rgba(255, 215, 0, 0.6)) brightness(1)",
                "drop-shadow(0 0 40px rgba(255, 215, 0, 1)) brightness(1.2)",
                "drop-shadow(0 0 20px rgba(255, 215, 0, 0.6)) brightness(1)"
            ],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.header
            className="header"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                rotateX: springRotateX,
                rotateY: springRotateY,
            }}
            whileHover={{
                scale: 1.01,
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            transition={{ duration: 0.3 }}
        >
            <div className="header-content">
                <motion.div
                    className="logo"
                    variants={logoVariants}
                    whileHover={{
                        scale: 1.05,
                        rotate: 5,
                        transition: { duration: 0.2, ease: "easeOut" }
                    }}
                >
                    <motion.div
                        variants={iconVariants}
                        animate="animate"
                    >
                        <motion.div
                            variants={glowVariants}
                            animate="animate"
                        >
                            <Sparkles className="logo-icon" />
                        </motion.div>
                    </motion.div>
                    <motion.h1 variants={textVariants}>
                        PDF Chat AI
                    </motion.h1>
                </motion.div>
                <motion.p
                    className="subtitle"
                    variants={textVariants}
                >
                    Upload your PDF and chat with it using AI
                </motion.p>
            </div>
        </motion.header>
    );
};

export default Header; 