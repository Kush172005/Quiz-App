const express = require("express");
const dotenv = require("dotenv");

const { connectDB, prismaClient } = require("./config/database");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3010;
const prisma = new PrismaClient();

dotenv.config();

app.use(express.json());

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const userExists = await prismaClient.users.findUnique({
        where: {
            email: email,
        },
    });
    if (userExists) {
        const isPasswordCorrect = password == userExists.password;
        if (isPasswordCorrect) {
            const payload = {
                name: userExists.name,
                email: userExists.email,
            };

            const secretKey = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });
            console.log(token);
            res.status(200).send({
                message: `Sign in Successfull token -> ${token}`,
            });
        } else {
            res.status(400).send({
                message: "Incorrect Password",
            });
        }
    } else {
        res.status(400).send({ message: "User does not exists" });
    }
});

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
