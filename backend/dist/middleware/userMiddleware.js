"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = userMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
function userMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized: Token missing or malformed"
        });
    }
    const token = auth.split(" ")[1];
    try {
        const decode = jsonwebtoken_1.default.verify(token, JWT_USER_PASSWORD);
        req.userId = decode.userId;
        next();
    }
    catch (err) {
        return res.status(403).json({});
    }
}
