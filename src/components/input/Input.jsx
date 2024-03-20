

export const Input = ({title, type, value, onChange, inputName, placeholder, isRequired, icon}) => {

    const dynamicAttributes = {}

    if (isRequired) dynamicAttributes.required = 'required'

    
    return(
        <div className="w-[100%] flex flex-col mb-6">
            <label htmlFor={title} className="flex gap-2 items-center mb-4 font-semibold text-xl lg:text-2xl ">
                <span>
                    {icon}
                </span>
                {title}
            </label>
            
            <input
                type={type}
                onChange={onChange}
                value={value}
                className="p-3 rounded bg-gray focus:outline-none focus:bg-gray-200 lg:p-4 lg:text-2xl"
                name={title}
                id={inputName}
                placeholder={placeholder}
                {...dynamicAttributes}
                icon={icon}
            />
            
        </div>
    )

}