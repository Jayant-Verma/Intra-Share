const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isConnected = async (req, res, next) => {
    try {
        let ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
        
        if (ip === "::1" || ip === "127.0.0.1") {
            ip = "127.0.0.1";
        }

        if (ip !== process.env.IP) {
            return res.status(401).json({
                message: "You are not connected to organisation network. Your IP is: " + ip + ". Please connect to " + process.env.IP,
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            message: error.message,
        });
    }
};

exports.isAuthenticated = async (req, res, next) => {
    try {
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
