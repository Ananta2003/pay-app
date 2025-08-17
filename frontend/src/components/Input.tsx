
interface Inputprops {
    placeholder: string,
    /* eslint-disable @typescript-eslint/no-explicit-any */
    reference?: any,
    label?: string,
    err?: string,}
export const Input = (props: Inputprops) => {



    return <div>
        <label className="block px-2 text-gray-600">{props.label}</label>
        {
            props.err ? (<input required className="px-4 py-2 m-1 border rounded w-full  invalid:border-red-500 border-1 " ref={props.reference} type="text" placeholder={props.placeholder} />)
                :
                (<input required className=" bg-gray-100 px-4 py-2 m-1 border rounded w-full" ref={props.reference} type="text" placeholder={props.placeholder} />)
        }

    </div>
}
