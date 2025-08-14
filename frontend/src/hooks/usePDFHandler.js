import { useState } from 'react';
import axios from 'axios';
import { showNotification } from '../utils/notifications';

export const usePDFHandler = () => {
    const [pdfUploaded, setPdfUploaded] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = async (file) => {
        if (!file || file.type !== 'application/pdf') {
            showNotification('Please upload a PDF file', 'error');
            return;
        }

        setFileName(file.name);
        setUploading(true);

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setPdfUploaded(true);
            setMessages([{
                sender: 'bot',
                text: `PDF "${file.name}" uploaded successfully! You can now ask questions about it.`,
                type: 'success',
                timestamp: new Date()
            }]);
            showNotification('PDF uploaded successfully!', 'success');
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessages([{
                sender: 'bot',
                text: 'Error uploading file. Please try again.',
                type: 'error',
                timestamp: new Date()
            }]);
            showNotification('Error uploading file', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleSendMessage = async (input) => {
        if (!input.trim() || isLoading) return;

        const userMessage = { sender: 'user', text: input, timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/chat', { question: input });
            const botMessage = {
                sender: 'bot',
                text: response.data.answer,
                timestamp: new Date(),
                type: 'success'
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                sender: 'bot',
                text: 'Sorry, I encountered an error while processing your request. Please try again.',
                timestamp: new Date(),
                type: 'error'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setPdfUploaded(false);
        setMessages([]);
        setFileName('');
    };

    return {
        pdfUploaded,
        uploading,
        fileName,
        messages,
        isLoading,
        handleFileUpload,
        handleSendMessage,
        clearChat
    };
}; 