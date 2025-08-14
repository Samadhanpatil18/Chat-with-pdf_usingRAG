# PDF Chat App Using RAG (Retrieval-Augmented Generation)

This is a **full-stack PDF Q&A application** built using **React**, **Node.js**, **Express**, and **LangChain**.  
It allows users to upload PDFs, process their content, and then **ask questions in natural language**.  
The backend uses **RAG (Retrieval-Augmented Generation)** to retrieve relevant document chunks and generate AI-based answers.

---

## 🚀 Features

- **PDF Upload & Parsing**
  - Users can upload one or multiple PDF files.
  - Extracts text content from PDF files.
- **Chunking & Vector Embedding**
  - Splits large PDF text into smaller chunks.
  - Generates embeddings using **OpenAI**.
- **Vector Storage**
  - Stores embeddings in a **Pinecone** vector database for fast retrieval.
- **Natural Language Q&A**
  - Users can ask any question related to uploaded PDFs.
  - Uses **LangChain** with OpenAI to retrieve and generate context-based answers.
- **Frontend with React**
  - Simple and intuitive chat-like interface.
  - Handles PDF uploads and displays AI answers.
- **Backend with Node.js + Express**
  - API endpoints for uploading PDFs and asking questions.
  - RAG pipeline implemented using LangChain.


## 📂 Project Structure

pdf-chat-app-UsingRAG/
│
├── backend/ # Node.js + Express backend
│ ├── index.js # Main backend entry point
│ ├── package.json # Backend dependencies & scripts
│ ├── .env.example # Environment variables template
│ ├── uploads/ # Uploaded PDF files
│
├── frontend/ # React frontend
│ ├── src/ # React components & pages
│ ├── package.json # Frontend dependencies
│
└── README.md # This file



## ⚙️ Tech Stack

### Frontend
- React
- Axios
- Bootstrap / CSS

### Backend
- Node.js
- Express
- Multer (for file uploads)
- LangChain
- OpenAI API
- Pinecone Vector Database
- pdf-parse


## 🔑 Environment Variables

Create a `.env` file in the `backend/` folder with:

```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX=your_pinecone_index_name
```

1 Clone the repository
git clone https://github.com/your-username/pdf-chat-app-UsingRAG.git
cd pdf-chat-app-UsingRAG

2️ Install Backend Dependencies
cd backend
npm install

3️ Install Frontend Dependencies
cd ../frontend
npm install

4️ Setup Environment Variables
cd ../backend
cp .env.example .env
# Edit .env with your API keys

5️ Start the Backend
cd backend
node index.js

6️ Start the Frontend
cd ../frontend
npm start



# Backend Workflow
1. PDF Upload (/api/upload)

Receives PDF via Multer (in memory).

Uses LangChain’s PDFLoader to extract text.

Warms up Pinecone index to ensure readiness.

Converts text chunks into Google Generative AI embeddings.

Stores embeddings in Pinecone for semantic search.

# 2. Question Answering (/api/chat)

Accepts user query in JSON body.

Connects to existing Pinecone index and retrieves relevant chunks.

Uses LangChain’s RetrievalQAChain with Gemini AI to generate an answer.

Sends the answer back as JSON.

# Architecture Diagram
          ┌─────────────┐
          │   Frontend  │
          │ (React App) │
          └──────┬──────┘
                 │
         PDF Upload / Ask Question
                 │
          ┌──────▼──────┐
          │   Backend   │
          │ (Express.js)│
          └──────┬──────┘
   ┌──────────────┼─────────────────┐
   │              │                 │
PDF Parsing   Text Embedding   Semantic Search
 (PDFLoader) (Gemini API)     (Pinecone DB)
   │              │                 │
   └──────────────┴─────────────────┘
                 │
         Answer Generation
           (Gemini AI)
                 │
          ┌──────▼──────┐
          │   Frontend  │
          └─────────────┘


# 🏆 Why This Project Is Valuable

Demonstrates modern AI techniques (RAG, vector DBs, embeddings).

Solves a real-world problem: quickly extracting insights from large PDFs.

Integrates multiple APIs (LangChain, Pinecone, Gemini AI).

Scalable and easily extendable to other file formats or multiple PDFs.

# 👨‍💻 Author

Samadhan Pati
📧 Email: samadhanpatil0018@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/samadhan-patil18



# 📜 License
# MIT License © 2025 Samadhan Patil

