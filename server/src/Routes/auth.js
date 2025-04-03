const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });


        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.cookie("token", token, { httpOnly: true }).json({ message: "Logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})