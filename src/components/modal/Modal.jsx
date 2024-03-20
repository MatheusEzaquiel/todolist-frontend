import { IoArchive } from "react-icons/io5";

export const Modal = ({openModal, closeModal, confirmDelete, children}) => {

    if(!openModal) {
        return null
    }

    return (

        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-lg">
                <div className="py-2">
                    <h4 className="text-center text-2xl font-bold">Archive</h4>
                </div>
                <div className="flex flex-col items-center justify-center py-4 border-t border-b border-gray-300">
                    <p className="text-center text-lg">{children}</p>
                    <i><IoArchive className="text-yellow text-9xl mt-10 animate-moveUpDown" /></i>
                </div>
                <div className="flex justify-center py-2 mt-6">
                    <button onClick={closeModal} className="w-[40%] bg-orange hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">Cancel</button>
                    <button onClick={confirmDelete} className="w-[40%] bg-yellow hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">Archive</button>
                </div>
            </div>
        </div>

    )

}