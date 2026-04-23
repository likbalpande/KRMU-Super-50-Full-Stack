const jwt = require("jsonwebtoken");

const validateUser = (req, res, next) => {
    const { authorization } = req.cookies || {}; // "Bearer ey.xa.asd"
    if (!authorization) {
        res.status(401).json({
            success: false,
            message: "Invalid token - 1!",
        });
        return;
    }
    const [_, token] = authorization.includes("Bearer%20") ? authorization.split("%20") : authorization.split(" ");
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Invalid token - 2!",
        });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            console.log("Auth error -->", err);
            res.status(401).json({
                success: false,
                message: "Invalid Token - 3",
            });
        } else {
            console.log("Auth success -->", data);
            req.user = data;
            next();
        }
    });
};

module.exports = { validateUser };
