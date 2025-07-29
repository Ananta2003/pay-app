import z from "zod";

export const signupZod = z.object({
    username:z.string().min(4).max(12),
    password:z.string().min(4),
    firstname:z.string(),
    lastname:z.string(),
    email:z.email()
})

export const signinZod = z.object({
    username:z.string().min(4).max(12),
    password:z.string().min(4),
})