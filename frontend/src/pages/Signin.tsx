import axios from "axios";
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export const Signin = () => {

    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>()
    const navigate = useNavigate()

    const[err, setErr] = useState("")

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value

        try {
            const response = await axios.post(`${BACKEND_URL}/users/signin`, {
                username, password
            })
            console.log(username)

            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate('/dashboard')
        }catch(err: any){
            const status = err.response?.status;
            if (status === 404) {
                alert("User Not Found")
            } if (status === 411) {
                setErr(err);
                alert("Username must be between 3 and 12 characters.Password must be at least 4 characters.")
            }
        }

          
    }

    return <div className="bg-gradient-to-r from-red-400 to-orange-300 h-screen w-full flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg  border-1 border-black">
            <div className="flex justify-center ">
                <h1 className="text-4xl font-normal font-sans py-8 ">Sign In</h1>
            </div>
            <Input err={err} label="Username:" reference={usernameRef} placeholder="Username" />
            <Input err={err}  label="Password:" reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center m-2 mt-4">
                <Button onclick={signin} text={"Sign In"} />
            </div>
            <div className="flex justify-center py-10">
                <span>Didn't have Account <a href="/signup" className="underline hover:font-bold">Signup</a></span>
            </div>
        </div>
    </div>
}

