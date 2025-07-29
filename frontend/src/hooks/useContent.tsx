import axios from "axios"
import { useState } from "react"
import { BACKEND_URL } from "../config"

interface ContentItem {
    id: string;
    title: string;
    _id: string,
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    email: string,
}
export function useContent (){

    const [content, setData] = useState<ContentItem[]>([])

    axios.get(`${BACKEND_URL}/users/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            setData(res.data.users)
        })
        return content
}