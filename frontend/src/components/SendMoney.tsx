import {  useRef } from "react";
import { Button } from "./Button"
import { Input } from "./Input"
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const SendMoney = ({ open, onclose, onSuccess, }: any) => {

    const amountRef = useRef<HTMLInputElement>()
    const recieverRef = useRef<HTMLInputElement>()

    const moneyTransfer = async () => {
        const amount = amountRef.current?.value;
        const reciever = recieverRef.current?.value
        
        try{
            await axios.post(`${BACKEND_URL}/account/transfer`,{
                amount,
                to:reciever

            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            alert("Success")
            onSuccess();
            onclose();
        }catch(err){
            alert(err)
        }
    }

    return <div>
        {open && <div >
            <div className="w-screen h-screen bg-gray-500 fixed top-0 left-0 right-0 opacity-60 flex justify-center" ></div>
            <div className="w-screen h-screen fixed top-0 left-0 right-0 opacity-100 h-screen w-full flex items-center justify-center">
                <div className="bg-white p-10 rounded-lg  border-1 border-black">
                    <div className="flex justify-end " onClick={onclose}>
                        <IoMdClose size={25} />
                    </div>
                    <div className="flex justify-center ">
                        <h1 className="text-4xl font-normal font-sans py-8 " >Transfer Money</h1>
                    </div>
                    <h1>Enter Amount:</h1>
                    <Input reference={amountRef} placeholder="Amount" />
                    <h1>Enter Account:</h1>
                    <Input reference={recieverRef} placeholder="To" />
                    <div className="flex justify-center m-2 mt-4">
                        <Button onclick={moneyTransfer}  text={"Pay"} />
                    </div>
                </div>
            </div>
        </div>}
    </div>
}