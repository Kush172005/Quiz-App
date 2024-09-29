const express = require("express");
const cors = require("cors");
const { prismaClient, connectDB } = require("./config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prismaClient.users.create({
            data: {
                email,
                password: hashedPassword,
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

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ error: "Email and password are required" });
    }

    try {
        const user = await prismaClient.users.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Failed to login" });
    }
});

app.post("/createQuiz", async (req, res) => {
    const { title, questions, userId } = req.body;

    if (!title || !questions || !userId) {
        return res
            .status(400)
            .json({ error: "Quiz title, questions, and userId are required" });
    }

    try {
        const newQuiz = await prismaClient.quiz.create({
            data: {
                title,
                userId,
                questions: {
                    create: questions.map((question) => ({
                        question: question.question,
                        options: question.options,
                        correctAnswers: question.ans,
                        explanation: question.explanation,
                    })),
                },
            },
        });

        res.status(201).json({
            message: "Quiz created successfully",
            quiz: newQuiz,
        });
    } catch (error) {
        console.error("Error during quiz creation:", error);
        res.status(500).json({ error: "Failed to create quiz" });
    }
});

app.delete("/deleteQuiz/:id", async (req, res) => {
    const quizId = req.params.id;

    try {
        await prismaClient.quiz.delete({
            where: { id: parseInt(quizId) },
        });

        res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (error) {
        console.error("Error during quiz deletion:", error);
        res.status(500).json({ error: "Failed to delete quiz" });
    }
});

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
