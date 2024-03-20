import { GoPerson } from "react-icons/go"

export const InputArea = ({title, value, rows, onChange, inputName, placeholder, isRequired}) => {

    const dynamicAttributes = {}

    if (isRequired) dynamicAttributes.required = 'required'

    
    return(
        <div className="w-[100%] flex flex-col mb-6">
            <label htmlFor={title} className="flex gap-2 items-center mb-1 font-semibold text-xl">
                <span>
                    <GoPerson className="ml-3"/>
                </span>{title}
            </label>
            <textarea
                onChange={onChange}
                value={value}
                className="p-3 rounded bg-gray focus:outline-none focus:bg-gray-200"
                name={title}
                id={inputName}
                placeholder={placeholder}
                rows={rows}
                {...dynamicAttributes}
            >
            </textarea>
            
        </div>
    )

}