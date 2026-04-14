const bcrypt = require("bcryptjs");
const { User } = require("../../../models/usersSchema.js");

const signupController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // if (!email || !password) {
        //     return res.status(400).json({ message: "Email and password are required" });
        // }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            runValidators: true,
        });

        res.status(201).json({ message: "User created successfully", userId: newUser._id });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const loginController = async (req, res) => {
    // {email, password}
    // password --> hash (match)
    // token
    //    --> {email, userId} + secret --> token
    // send token in cookie
};

module.exports = { signupController, loginController };
