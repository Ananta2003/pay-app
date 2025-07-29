"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware_1 = require("../middleware/userMiddleware");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../utils");
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const userRouter = (0, express_1.Router)();
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = utils_1.signupZod.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect Credits"
        });
    }
    const username = req.body.username;
    const existingUser = yield db_1.User.findOne({
        username: username
    });
    if (existingUser) {
        return res.status(404).json({
            message: " Username Found"
        });
    }
    const pass = req.body.password;
    const password = yield bcryptjs_1.default.hash(pass, 8);
    const user = yield db_1.User.create({
        username: req.body.username,
        password: password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    });
    const userId = user._id;
    /// ----- Create new account ------
    yield db_1.Account.create({
        userId,
        balance: parseFloat((1 + Math.random() * 10000).toFixed(2))
    });
    res.json({
        message: "Signup Successful"
    });
}));
userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = utils_1.signinZod.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect Credentials"
        });
    }
    try {
        const username = req.body.username;
        const user = yield db_1.User.findOne({ username });
        if (!user || !user.password) {
            return res.status(404).send('User not found');
        }
        const passwordhash = yield bcryptjs_1.default.compare(req.body.password, user.password);
        if (passwordhash) {
            const token = jsonwebtoken_1.default.sign({
                userId: user._id
            }, JWT_USER_PASSWORD);
            res.json({
                token: token
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
userRouter.get("/me", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const user = yield db_1.User.findById(userId).select("-password");
        ;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user, username: user.username });
    }
    catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json(err);
    }
}));
userRouter.get("/bulk", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.userId;
    const users = yield db_1.User.find({ _id: { $ne: _id } });
    res.json({
        users,
    });
}));
userRouter.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstname, lastname, email } = req.body;
    yield db_1.User.deleteOne({
        username,
        password,
        firstname,
        lastname,
        email
    });
    res.status(200).json({
        message: "user has been Removed"
    });
}));
userRouter.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstname, lastname, email } = req.body;
    const data = yield db_1.User.updateOne({
        username,
        password,
        firstname,
        lastname,
        email
    });
    res.status(200).json({
        message: "user has been Updated",
        data
    });
}));
exports.default = userRouter;
