const Models = require("../models/index");
const secretKey = "secretKey";
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const verifyToken = require("../helpers/verifyHelper");

module.exports = {
    insert: async (req, res) => {
        const { name, email, password } = req.body;
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = {
                name,
                email,
                password: hashedPassword
            };
            let response = await Models.userModel.create(user);
            res.json({ message: 'User registered successfully', response });
        } catch (err) {
            res.status(500).json({ message: 'Error registering user', error: err.message });
        }
    },

    enterData: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Models.userModel.findOne({ where: { email: email } });

            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid password" });
            }

            jwt.sign({ id: user.id, name: user.name, email: user.email }, secretKey, { expiresIn: '1h' }, (err,     token) => {
                if (err) {
                    return res.status(500).json({ message: "Error generating token" });
                }
                res.json({ token });
            });
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    },

    verify: (req, res) => {
        const authData = req.authData;
        res.json({
            message: "Token is valid",
            authData
        });
    }
};
