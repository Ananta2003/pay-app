export interface Buttonprop{
        text:any,
        onclick?:()=> void
    }
export const Button =(props:Buttonprop)=>{

    return <div className="w-full">
        <button onClick={props.onclick} className="rounded-md w-full px-6 py-2 text-white bg-[#752cde] font-md text-lg hover:cursor-pointer hover:border-1 hover:border-black" >{props.text} </button>
    </div>
}