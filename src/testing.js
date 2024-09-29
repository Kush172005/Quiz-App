const express = require("express");
const cors = require("cors"); // Import the cors package
const { prismaClient, connectDB } = require("./config/database"); // Ensure prismaClient is imported

const app = express();
const dotenv = require("dotenv");

dotenv.config();

// Middleware to enable CORS
app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON request body
app.use(express.json());

// Connect to the database
connectDB();

app.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;

    // Input validation (optional but recommended)
    if (!email || !password || !name) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Create a new user in the database using Prisma
        const newUser = await prismaClient.users.create({
            data: {
                email,
                password, // Consider hashing the password (e.g., bcrypt) for security
                name,
            },
        });

        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        console.error("Error during user signup:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
});

// Start the server on port 4000 for testing
app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
