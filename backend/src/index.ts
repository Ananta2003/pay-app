import express from "express";
import userRouter from "./routes/user";
import accountRouter from "./routes/account";
import cors from "cors";

const app = express()
const port=process.env.PORT 

app.use(express.json());
app.use(cors())


app.use("/api/v1/users",userRouter)
app.use("/api/v1/account",accountRouter)

app.listen(port,()=>{
    console.log("Server Running on Port ")
})