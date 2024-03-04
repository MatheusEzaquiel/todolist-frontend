import { IoArchive } from "react-icons/io5";

import "./Modal.css"

export const Modal = ({openModal, closeModal, confirmDelete, children}) => {

    if(!openModal) {
        return null
    }

    return (

        <div className="modal">
            <div className="modalContent">
                <div className="modalHeader">
                    <h4 className="modalTitle">Archive</h4>
                </div>
                <div className="modalBody">
                   <p className="textModal">{children}</p>
                   <i><IoArchive /></i>
                </div>
                <div className="modalFooter">
                    <button onClick={ closeModal } className="btnModal">Cancel</button>
                    <button onClick={ confirmDelete } className="btnModal btnArchiveModal">Archive</button>
                </div>
            </div>
        </div>

    )

}