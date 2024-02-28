import "./UserPainel.css";

import { HiOutlineLogout } from "react-icons/hi";

export const UserPainel = ({userData}) => {

    return(

        <aside className="userPainel">

            <div className="col">
                <div className="boxOption">
                    <p>29 checklists was created</p>
                </div>
            </div>

            <div className="col">

                <div className="boxOption">
                    <p>29 checklists was created</p>
                </div>

            </div>

            <div className="col">
                <div className="boxOption">
                    <p>checklists was created</p>
                    <p></p>
                </div>
            </div>

            <div className="col">
                <div className="boxOption" id="boxLogout">
                    <button className="btnForm btnLogout" onClick={() => {handlerRemoveUserToken()}}><HiOutlineLogout/>
                    <p>Logout</p></button>
                    
                </div>
            </div>
            
            
            
        </aside>
    )


}