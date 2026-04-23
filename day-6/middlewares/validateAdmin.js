const validateAdmin = (req, res, next) => {
    const { role } = req.user;

    console.log("Role -->", role);

    if (role === "admin") {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "You are not an admin!",
        });
    }
};

module.exports = { validateAdmin };
