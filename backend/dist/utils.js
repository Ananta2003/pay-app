"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinZod = exports.signupZod = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupZod = zod_1.default.object({
    username: zod_1.default.string().min(4).max(12),
    password: zod_1.default.string().min(4),
    firstname: zod_1.default.string(),
    lastname: zod_1.default.string(),
    email: zod_1.default.email()
});
exports.signinZod = zod_1.default.object({
    username: zod_1.default.string().min(4).max(12),
    password: zod_1.default.string().min(4),
});
