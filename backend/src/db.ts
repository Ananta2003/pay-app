import mongoose, { Mongoose } from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const url:any = process.env.MONGO_URL;
if(!url){
    console.log("Cannot find .env Url")
}

mongoose.connect(url)
    .then(() => console.log("MongoDB connected successfully"))


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    balance:{
        type:Number
    }
})

export const Account = mongoose.model("Account",accountSchema);
export const User = mongoose.model("User", userSchema)
