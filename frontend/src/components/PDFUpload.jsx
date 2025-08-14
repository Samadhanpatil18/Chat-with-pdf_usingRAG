import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './PDFUpload.css';

const PDFUpload = ({ onFileUpload, uploading }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            onFileUpload(files[0]);
        }
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onFileUpload(files[0]);
        }
    };

    // This SVG replaces the FiUploadCloud icon
    const UploadIcon = () => (
        <svg
            className="upload-icon"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
    );

    return (
        <motion.div
            className={`pdf-upload-container ${isDragging ? 'dragging' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {uploading ? (
                <div className="upload-status">
                    <motion.div
                        className="loader"
                        animate={{ rotate: 360 }}
                        transition={{ loop: Infinity, ease: "linear", duration: 1 }}
                    />
                    <p>Uploading...</p>
                </div>
            ) : (
                <>
                    <UploadIcon />
                    <h2>Drag & Drop your PDF here</h2>
                    <p>or</p>
                    <label htmlFor="file-upload" className="upload-button">
                        Browse Files
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <p className="upload-hint">
                        Please upload a single PDF file to start chatting.
                    </p>
                </>
            )}
        </motion.div>
    );
};

export default PDFUpload;