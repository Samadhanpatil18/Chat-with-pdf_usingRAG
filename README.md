# 📄 PDF Chat App using RAG & Generative AI

A full-stack application that allows users to **upload PDFs** and **ask questions** about the content using **Retrieval-Augmented Generation (RAG)** and **Generative AI**.

---

## 🚀 Features
- **PDF Upload & Parsing** – Extracts text content from uploaded PDFs.
- **AI-Powered Q&A** – Answers questions based on PDF content using RAG.
- **Real-Time Interaction** – Smooth UI updates and instant query responses.
- **Authentication & Authorization** – User login, signup, and secure access.
- **Responsive UI** – Built with Bootstrap for cross-device compatibility.
- **Scalable Architecture** – Modular backend and frontend for easy maintenance.

---

## 🛠 Tech Stack

### **Frontend**
- React.js (Hooks, Context API)
- Bootstrap (Responsive design)
- Axios (API communication)

### **Backend**
- Node.js
- Express.js
- Multer (File upload handling)
- LangChain.js (RAG implementation)
- OpenAI / Gemini API
- PDF-parse (Text extraction)

### **Database**
- MongoDB (User & chat history storage)
- Mongoose (Schema-based modeling)

---

## 📂 Project Structure
```plaintext
pdf-chat-app-UsingRAG/
│
├── backend/
│   ├── config/           # Database & environment setup
│   ├── controllers/      # API route controllers
│   ├── routes/           # Express route definitions
│   ├── utils/            # Helper functions & services
│   ├── .env.example      # Environment variable template
│   └── server.js         # Backend entry point
│
├── frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Main page views
│   │   ├── services/     # API calls
│   │   └── App.js        # Root component
│
├── README.md
└── package.json
⚙️ Installation & Setup

Clone the repository

git clone https://github.com/your-username/pdf-chat-app-UsingRAG.git
cd pdf-chat-app-UsingRAG


Backend Setup

cd backend
npm install


Frontend Setup

cd ../frontend
npm install


Configure Environment Variables

Copy .env.example to .env in the backend folder.

Add your MongoDB URI, OpenAI/Gemini API key, and other required credentials.

Run the Application

Start backend:

cd backend
npm run dev


Start frontend:

cd frontend
npm start

🖥 Backend Workflow
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
       │
Extract Text → Store in Vector DB
       │
Query with LangChain → AI Response
       │
┌──────▼──────┐
│  Response   │
│   to User   │
└─────────────┘

🔑 Environment Variables

Create a .env file in the backend directory with:

MONGO_URI=your_mongodb_connection
OPENAI_API_KEY=your_openai_or_gemini_api_key
PORT=5000

👨‍💻 Author

Samadhan Patil
📧 Email: samadhanpati@example.com
🔗 LinkedIn: samadhan-patil18
💻 GitHub: Samadhanpatil18

📜 License

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
