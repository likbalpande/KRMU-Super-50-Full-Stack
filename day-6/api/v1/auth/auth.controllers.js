const { User } = require("../../../models/usersSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email,
        });

        if (user) {
            res.status(400).json({
                success: false,
                message: "User already exists!",
            });
            return;
        }

        const salt = await bcrypt.genSalt(16);

        const hash = await bcrypt.hash(password, salt);

        const newUser = await User.insertOne({ email, password: hash });

        res.status(201).json({
            success: true,
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            res.status(400);
            res.json({
                success: false,
                message: "Validation Failed! Please check you inputs. " + err.message,
            });
        } else if (err.name === "MongoServerError" && err.code === 11000) {
            res.status(400);
            res.json({
                success: false,
                message: "Some unique condition error. " + err.message,
            });
        } else {
            res.status(500);
            res.json({
                success: false,
                message: err.message,
            });
        }
    }

    // password --> hash (bcrypt)
    // user create in DB
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email,
        });

        if (!user) {
            res.status(400).json({
                success: false,
                message: "Either email or password is invalid!",
            });
            return;
        }

        //
        // const salt = user.password.substring(0, 29);
        // const newHash = await bcrypt.hash(password, salt);
        // if (newHash === user.password) {
        //     console.log("yes");
        // } else {
        //     console.log("no");
        // }

        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) {
            res.status(400).json({
                // 401
                success: false,
                message: "Either email or password is invalid!", // Incorrect password!
            });
            return;
        }

        const token = jwt.sign({ email: user.email, _id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: 24 * 60 * 60,
        });

        res.cookie("authorization", `Bearer ${token}`, {
            maxAge: 24 * 60 * 60,
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        res.status(200).json({
            success: true,
            data: {
                user: user,
            },
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            res.status(400);
            res.json({
                success: false,
                message: "Validation Failed! Please check you inputs. " + err.message,
            });
        } else if (err.name === "MongoServerError" && err.code === 11000) {
            res.status(400);
            res.json({
                success: false,
                message: "Some unique condition error. " + err.message,
            });
        } else {
            res.status(500);
            res.json({
                success: false,
                message: err.message,
            });
        }
    }
};

module.exports = { signupController, loginController };
