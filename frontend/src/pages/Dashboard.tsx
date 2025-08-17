// import { User } from "../components/Users"

import axios from "axios"
import { BACKEND_URL } from "../config"
import { useEffect, useState } from "react"
import { Users } from "../components/Users"
import { useContent } from "../hooks/useContent";
import { SendMoney } from "../components/SendMoney";
import { CiSearch } from "react-icons/ci";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";

export const Dashboard = () => {

    const [name, setname] = useState<string>("")
    const [balance, setBalance] = useState()

    const content = useContent()
    const [modalopen, setModalopen] = useState(false)


    useEffect(() => {
        axios.get(`${BACKEND_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        }).then((res) => {
            setname(res.data.username)
        }).then(() => {
            refreshBalance();
        })


    }, [])

    const refreshBalance = () => {
        axios.get(`${BACKEND_URL}/account/balance`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        }).then((res) => {
            setBalance(res.data.balance);
        });
    };

    return <div>
        <div className="w-full h-screen grid grid-cols-[20%_80%] gap-0 " >
            <div className="border-b-2 bg-gray-200 border-black">
                <div id="Navbar" className=" p-4 ">
                    <div className="flex justify-center items-center mx-4 gap-2">
                        <RiSecurePaymentLine size={40} />
                        <h1 className="text-2xl">Payment </h1>
                    </div>

                    <div className="flex gap-1 items-center p-2 mt-8  rounded-lg bg-white">
                        <div className="rounded-full bg-[#752cde] w-12 h-12 p-2 mx-4 flex items-center justify-center"><span className="text-xl font-bold text-white">{name?.[0] ?? "U"}</span></div>
                        <span>{name}</span>
                    </div>
                    <div className="flex gap-1 items-center p-2 mt-8  rounded-lg bg-white">
                        <div className=" w-12 h-12 p-2 mx-4 flex items-center justify-center"><MdAccountBalance size={40} /></div>
                        <div>
                            <span>Balance:</span>
                            <span className="flex items-center "><MdOutlineCurrencyRupee />{balance}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div id="Hero" className="h-auto bg-white">

                <div className="bg-[#752cde] relative">
                    <div className="flex absolute top-16 items-center mx-4 gap-2 text-white w-62">
                        <RiSecurePaymentLine size={40} />
                        <h1 className="text-2xl">Payment </h1>
                    </div>
                    <div className=" p-8 font-semibold text-3xl flex  justify-end">
                        <div className="p-4 rounded-lg text-white bg-white m-2">
                            <h1 className="text-[#5f56ff]">Balance:</h1>
                            <h1 className="flex items-center text-[#5f56ff]"><MdOutlineCurrencyRupee size={30} />{balance}</h1>
                        </div>
                        <div className="rounded-full bg-white w-12 h-12 p-2 ml-4 flex items-center justify-center"><span className="text-xl font-bold text-[#752cde]">{name?.[0] ?? "U"}</span></div>
                    </div>



                </div>

                <div>
                    <h1 className=" p-8 font-semibold text-3xl">
                        Users
                    </h1>
                    <div className="ml-4">
                        {content.map((users) => {
                            const name = users.username
                            return <Users setModalopen={setModalopen} key={users._id} name={name} />
                        })}
                    </div>
                </div>
                <div>
                    {<SendMoney open={modalopen} onclose={() => {
                        setModalopen(false)
                    }} onSuccess={refreshBalance} />}
                </div>
            </div>
        </div>
    </div>
}
