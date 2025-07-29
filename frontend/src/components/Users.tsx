import { Button } from "./Button"

interface username {
    name:string,
    setModalopen:any
}

export const Users = ({name , setModalopen}:username) => {

    const firstname = name[0].toUpperCase();   
    return <div>
        <div id="Navbar" className="flex justify-between p-4 m-4 rounded-md bg-gray-100 ">
            <div className="flex justify-between items-center gap-2 ">
                <div>
                    <div className="rounded-full bg-[#752cdd] text-white w-12 h-12 p-2 flex items-center justify-center"><span className="text-xl font-bold">{firstname}</span></div>
                </div>
                <span className="text-xl">{name}</span>
            </div>
            <div>
                <Button onclick={()=>setModalopen(true)} text="Send Money" />
            </div>
        </div>
    </div>
}