"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Account = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.MONGO_URL;
if (!url) {
    console.log("Cannot find .env Url");
}
mongoose_1.default.connect(url)
    .then(() => console.log("MongoDB connected successfully"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
});
const accountSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number
    }
});
exports.Account = mongoose_1.default.model("Account", accountSchema);
exports.User = mongoose_1.default.model("User", userSchema);
