// test-pinecone.js
require('dotenv').config();
const { Pinecone } = require('@pinecone-database/pinecone');

async function runTest() {
    console.log("Initializing Pinecone client...");
    const pinecone = new Pinecone();

    const indexName = process.env.PINECONE_INDEX;
    if (!indexName) {
        console.error("🔴 Error: PINECONE_INDEX is not set in your .env file.");
        return;
    }
    console.log(`Targeting index: "${indexName}"`);

    try {
        const index = pinecone.index(indexName);

        console.log("\nStep 1: Describing index stats (the 'warm-up')...");
        const stats = await index.describeIndexStats();
        console.log("✅ Success! Index stats:", stats);

        console.log("\nStep 2: Attempting data operation (upserting a dummy vector)...");
        await index.upsert([
            {
                id: 'test-vector',
                values: Array(768).fill(0.1), // A 768-dim vector
            },
        ]);
        console.log("✅✅ Success! Dummy vector upserted.");

        console.log("\nStep 3: Cleaning up dummy vector...");
        await index.deleteOne('test-vector');
        console.log("✅ Success! Dummy vector deleted.");

        console.log("\n🎉🎉🎉 CONNECTION TEST PASSED! Your credentials are correct. 🎉🎉🎉");

    } catch (error) {
        console.error("\n❌❌❌ CONNECTION TEST FAILED ❌❌❌");
        console.error("The error occurred during the test:");
        console.error(error);
        console.error("\nThis confirms the issue is with your Pinecone credentials or index setup.");
    }
}

runTest();