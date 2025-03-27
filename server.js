require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 4001;
let server;

async function setupDatabase() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB!");

    return new Promise((resolve) => {
        server = app.listen(PORT, () => {
            console.log("🚀 Server running on port:", PORT);
            resolve(server);
        }).on('error', (e) => console.error(e));
    });
}
// setupDatabase();

async function teardownDatabase() {
    if (mongoose.connection.readyState !== 1) {
        console.warn("⚠️ Database not connected, skipping teardown.");
        return;
    }

    try {
        await mongoose.connection.dropDatabase(); // Clean up test data
        await mongoose.connection.close(); // Close connection
        console.log('🛑 Disconnected from test database');

        if (server) {
            console.log("🛑 Closing test server...");
            server.close(() => {
                console.log("✅ Test server closed");
            });
        }

        return;
    } catch (err) {
        console.log("❌ Error during teardown:", err);
    }

}


module.exports = { app, setupDatabase, teardownDatabase };
