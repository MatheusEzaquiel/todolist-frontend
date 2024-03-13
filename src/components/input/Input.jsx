import { GoKey, GoPerson } from "react-icons/go"

export const Input = ({title, type, value, onChange, inputName, placeholder, isRequired}) => {

    const dynamicAttributes = {}

    if (isRequired) dynamicAttributes.required = 'required'

    
    return(
        <div className="w-[100%] flex flex-col mb-6">
            <label htmlFor={title} className="flex gap-2 items-center mb-1"><span><GoPerson className="ml-3"/></span>{title}</label>
            <input
                type={type}
                onChange={onChange}
                value={value}
                className="p-3 rounded bg-gray"
                name={title}
                id={inputName}
                placeholder={placeholder}
                {...dynamicAttributes}
            />
            
        </div>
    )

}