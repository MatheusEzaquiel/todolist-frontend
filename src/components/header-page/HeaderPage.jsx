export const HeaderPage = ({title, children}) => {

    return(
      <>
        <div className="w-[100%] flex items-center justify-between my-6 p-3 pb-5 border-b-2 border-gray-200">
          <h1 className="text-2xl text-black">{title}</h1>
          {children}
          
        </div>
        </>
    )

}