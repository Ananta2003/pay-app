import { Router } from "express";
import { Account, User } from "../db";
import jwt from "jsonwebtoken"
import { userMiddleware } from "../middleware/userMiddleware";
import bcryptjs from "bcryptjs"
import { AuthenticatedRequest } from "../types/express";
import { signinZod, signupZod } from "../utils";

const JWT_USER_PASSWORD: any = process.env.JWT_USER_PASSWORD
const userRouter = Router()

userRouter.post("/signup", async (req, res) => {
    const {success} = signupZod.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Incorrect Credits"
        })
    }

    const username = req.body.username

    const existingUser = await User.findOne({
        username: username
    })

    if(existingUser){
        return res.status(404).json({
            message:" Username Found"
        })
    }

    const pass = req.body.password
    const password = await bcryptjs.hash(pass, 8)

    const user = await User.create({
        username: req.body.username,
        password: password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    })

    const userId = user._id;

    /// ----- Create new account ------

    await Account.create({
        userId,
        balance:parseFloat((1 + Math.random() * 10000).toFixed(2))
    })


    res.json({
        message: "Signup Successful"
    })

})


userRouter.post('/signin', async (req, res) => {

    const {success} = signinZod.safeParse(req.body)

    if(!success){
        return res.status(411).json({
            message:"Incorrect Credentials"
        })
    }
    try {
        const username = req.body.username
        const user = await User.findOne({ username })
        if (!user || !user.password) {
            return res.status(404).send('User not found');
        }

        const passwordhash = await bcryptjs.compare(req.body.password, user.password)

        if (passwordhash) {
            const token = jwt.sign({
                userId: user._id
            }, JWT_USER_PASSWORD)
            res.json({
                token: token
            })
        }

    } catch (err) {
        console.log(err)
    }
})

userRouter.get("/me", userMiddleware, async (req:AuthenticatedRequest, res) => {
    const userId = req.userId

    try {
        const user = await User.findById(userId).select("-password");;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({user, username: user.username});
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json(err);
    }
});




userRouter.get("/bulk",userMiddleware, async (req, res) => {

    const _id = req.userId

    const users = await User.find({_id:{$ne:_id}})

    res.json({
        users,
        
        
    })
})

userRouter.delete("/delete", async (req, res) => {

    const { username, password, firstname, lastname, email } = req.body
    await User.deleteOne({
        username,
        password,
        firstname,
        lastname,
        email
    })
    res.status(200).json({
        message: "user has been Removed"
    })
})

userRouter.put("/update", async (req, res) => {
    const { username, password, firstname, lastname, email } = req.body
    const data = await User.updateOne({
        username,
        password,
        firstname,
        lastname,
        email
    })
    res.status(200).json({
        message: "user has been Updated",
        data
    })
})

export default userRouter;