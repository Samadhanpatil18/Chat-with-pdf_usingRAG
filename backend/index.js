// index.js

// 1. Imports - Bringing in all our tools
const express = require("express");
const multer = require("multer");
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
// const { PDFLoader } = require("langchain/document_loaders/fs/pdf");
const { PineconeStore } = require("@langchain/pinecone");
const { Pinecone } = require("@pinecone-database/pinecone");
const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
const cors = require('cors');
require("dotenv").config();

// 2. Initializations - Setting up our tools to work
const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Tells multer to keep the file in memory
const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
const embeddings = new GoogleGenerativeAIEmbeddings({ modelName: "embedding-001" });


app.use(cors({
  // The value for the 'origin' key should be an array `[]`
  origin: [
    'http://localhost:5173',
    'https://chat-with-pdf-usingrag-frontend.onrender.com'
  ]
}));

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}))



// 3. The API Endpoint - The door for our PDF to enter
app.post("/api/upload", upload.single("pdf"), async (req, res) => {
    // What: Check if a file was actually uploaded.
    // Why: To prevent errors.
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    console.log("Starting PDF processing...");

    // What: Use LangChain's PDFLoader to read the PDF from the computer's memory.
    // Why: PDFLoader is a specialized tool that knows how to extract text content from the complex PDF format.
    const loader = new PDFLoader(new Blob([req.file.buffer]));
    const docs = await loader.load();


    // What: "Ping" the index to wake it up if it's asleep.
    // Why: Prevents 404 errors on serverless indexes.
    try {
        console.log("Warming up index...");
        await pineconeIndex.describeIndexStats();
        console.log("Index is ready.");
    } catch (e) {
        console.error("Error during index warm-up:", e.message);
    }


    // What: Clear out any old information from the database for this index.
    // Why: We want to chat with the *new* PDF, not mix it with old ones.
    // await pineconeIndex.deleteAll();
    console.log(" Now embedding new document...");

    // What: Take the loaded document chunks (docs), create embeddings for them, and save them to Pinecone.
    // Why: This is the core indexing step. `fromDocuments` handles the embedding and storing process for us.
    await PineconeStore.fromDocuments(docs, embeddings, {
        pineconeIndex,
        maxConcurrency: 5,
    });
    console.log("PDF successfully processed and stored.");

    res.status(200).send("PDF processed and stored successfully!");
});

// We will add the /chat endpoint here later...

// index.js (continued)
const { RetrievalQAChain } = require("langchain/chains");
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

// Initialize the Gemini Model
const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash"
})
app.use(express.json()); // Allow server to accept JSON data

// API to handle chat queries
app.post("/api/chat", async (req, res) => {
    const { question } = req.body;
    console.log(`Received question: ${question}`);

    // What: Connect to our existing Pinecone index.
    // Why: To prepare our "library" for searching.
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex });

    // What: Use a special LangChain tool called RetrievalQAChain.
    // Why: This chain automates the entire RAG process. It:
    //      1. Takes the 'question'.
    //      2. Uses the 'vectorStore' to find relevant text chunks (retrieval).
    //      3. Sends the chunks and the question to the Gemini 'model' (generation).
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

    const response = await chain.call({
        query: question,
    });

    res.json({ answer: response.text });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




