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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const userMiddleware_1 = require("../middleware/userMiddleware");
const accountRouter = (0, express_1.Router)();
accountRouter.get("/balance", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const account = yield db_1.Account.findOne({ userId });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json({ balance: account.balance });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
}));
accountRouter.post("/transfer", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, to } = req.body;
    const userId = req.userId;
    const toaccount = yield db_1.User.findOne({
        username: to
    });
    const account = yield db_1.Account.findOne({
        userId
    });
    // @ts-ignore
    if (!account || (account.balance) < amount) {
        res.status(400).json({
            message: account === null || account === void 0 ? void 0 : account.balance,
        });
        return;
    }
    const toAccount = yield db_1.Account.findOne({
        userId: toaccount === null || toaccount === void 0 ? void 0 : toaccount._id
    });
    if (!toAccount) {
        res.status(400).json({
            message: "Invalid Account"
        });
        return;
    }
    // transfer
    yield db_1.Account.updateOne({
        userId: userId
    }, {
        $inc: {
            balance: -amount
        }
    });
    yield db_1.Account.updateOne({
        userId: toaccount === null || toaccount === void 0 ? void 0 : toaccount._id
    }, {
        $inc: {
            balance: amount
        }
    });
    res.json({
        message: "Transfer Successful"
    });
}));
accountRouter.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const userDoc = yield db_1.User.findOne({ username });
        if (!userDoc)
            return res.status(404).json({ error: "User not found" });
        const account = yield db_1.Account.findOne({ userId: userDoc._id });
        if (!account)
            return res.status(404).json({ error: "Account not found" });
        res.json({ account });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}));
exports.default = accountRouter;
