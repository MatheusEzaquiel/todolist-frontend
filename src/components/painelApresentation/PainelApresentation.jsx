export const PainelApresentation = ({title, text}) => {

    return(
        <div className="lg:w-1/2 bg-gradient-to-r from-orange to-orange-200 lg:flex lg:items-center hidden lg:block">

          <div className="w-full h-[80vh] p-4 m-0 flex flex-col items-center justify-center xl:w-4/5 mx-auto">
            <h1 className="text-center text-4xl text-white mb-2 font-bold lg:text-6xl">{title}</h1>
            <p className="text-center text-white text-md font-medium lg:text-2xl">{text}</p>
          </div>
        </div>
    )

}