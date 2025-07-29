import { Router } from "express"
import { Account, User } from "../db"
import { userMiddleware } from "../middleware/userMiddleware"

const accountRouter = Router()


accountRouter.get("/balance", userMiddleware, async (req, res) => {
    const userId = req.userId;

    try {
        const account = await Account.findOne({ userId });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json({ balance: account.balance });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});


accountRouter.post("/transfer", userMiddleware, async (req, res) => {
    const { amount, to } = req.body
    const userId = req.userId;

    const toaccount= await User.findOne({
        username:to
    })


    const account = await Account.findOne({
        userId
    })

    // @ts-ignore
    if (!account || (account.balance) < amount) {
        res.status(400).json({
            message: account?.balance,

        });
        return;
    }

    const toAccount = await Account.findOne({
        userId: toaccount?._id
    })

    if (!toAccount) {
        res.status(400).json({
            message: "Invalid Account"
        });
        return;
    }

    // transfer
    await Account.updateOne({
        userId: userId
    }, {
        $inc: {
            balance: -amount
        }
    })

    await Account.updateOne({
        userId: toaccount?._id
    }, {
        $inc: {
            balance: amount
        }
    })

    res.json({
        message: "Transfer Successful"
    })

})

accountRouter.post("/user", async (req, res) => {
  try {
    const { username } = req.body;

    const userDoc = await User.findOne({ username });
    if (!userDoc) return res.status(404).json({ error: "User not found" });

    const account = await Account.findOne({ userId: userDoc._id });
    if (!account) return res.status(404).json({ error: "Account not found" });

    res.json({ account });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



export default accountRouter