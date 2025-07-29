import { useRef, useState } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const Signup = () => {

    const usernameRef = useRef<HTMLInputElement>()
    const firstnameRef = useRef<HTMLInputElement>()
    const lastnameRef = useRef<HTMLInputElement>()
    const passwordRef = useRef<HTMLInputElement>()
    const emailRef = useRef<HTMLInputElement>()
    const navigate = useNavigate()

    const [err, setErr] = useState("")

    async function signup() {

        const username = usernameRef.current?.value
        const firstname = firstnameRef.current?.value;
        const lastname = lastnameRef.current?.value;
        const password = passwordRef.current?.value;
        const email = emailRef.current?.value;

        try {
            const data = await axios.post(`${BACKEND_URL}/users/signup`, {
                username, firstname, lastname, password, email
            })
            if (data === null) {
                alert("User Already Exists")
            }
            navigate('/signin')
        } catch (err: any) {
            const status = err.response?.status;
            if (status === 404) {
                alert("User Already Exists")
            } if (status === 411) {
                setErr(err);
                alert("Username must be between 3 and 12 characters.Password must be at least 4 characters")
            } else {
                alert(err)
            }
        }
    }

    return <div>
        <div className="bg-gradient-to-r from-red-400 to-orange-300 h-screen w-full flex items-center justify-center ">
            <div className="bg-white px-12 rounded-lg ">
                <div>
                    <div className="flex justify-center items-center ">
                        <h1 className="text-5xl p-8 font-normal text-gray-800">Sign Up</h1>
                    </div>
                    <Input err={err} label="Username:" reference={usernameRef} placeholder="Username" />
                    <div className="flex gap-4">
                        <Input err={err} label="Firstname:" reference={firstnameRef} placeholder="Firstname" />
                        <Input err={err} label="Lastname:" reference={lastnameRef} placeholder="Lastname" />
                    </div>

                    <Input err={err} label="Password:" reference={passwordRef} placeholder="Password" />
                    <Input err={err} label="Email:" reference={emailRef} placeholder="Email" />
                    <div className="flex justify-center m-2 mt-4 w-full">
                        <Button onclick={signup} text={"Sign Up"} />
                    </div>
                    <div className="flex justify-center my-4">
                        <span>Already have Account <a href="/signin" className="underline hover:font-bold">Sign In</a></span>
                    </div>
                </div>

            </div>
        </div>
    </div>
}