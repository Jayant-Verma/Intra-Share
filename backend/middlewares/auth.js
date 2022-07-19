const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
    try {
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        if (ip !== process.env.IP) {
            return res.status(401).json({
                message: "You are not connected to organisation network",
            });
        }

        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                message: "Please login to continue",
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded._id);

        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message,
        });
    }
};
