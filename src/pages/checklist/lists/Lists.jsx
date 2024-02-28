import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


import { FaCirclePlus } from "react-icons/fa6";

import "./Lists.css"

import { List } from '../../../components/List/List';
import { ChecklistService } from "../../../services/api/checklists/ChecklistService";
import { ApiException } from "../../../services/api/ApiException";

import { Notification } from "../../../components/notification/Notification";
import useToken from "../../../app/useToken";




export const Lists = () => {

  const [userToken, setUserToken] = useState(JSON.parse(localStorage.getItem("userToken")));
  
  const [isOpenNotification, setIsOpenNotification] = useState(false)

  const [ checklists, setChecklists ] = useState(null)

  const [quantityAchivedLists, setQuantityArchivedLists] = useState(0);


    const getChecklists = async() => {

        try {
          const res = await ChecklistService.list(userToken.id);
          setChecklists(res)
        } catch (ex) {
          console.log(ex.message)
        } 

    }

    const handleNotification = () => {

      setIsOpenNotification(true)

      setTimeout(() => {
        setIsOpenNotification(false)
      }, 5000);

    };


    useEffect(() => {
        getChecklists()
    },[quantityAchivedLists])

  return (

   

    <section className="section">

      <div className="headerMenu">
          <h1 className="title">Lists</h1>
      </div>
        
      <div className="containerDefault">

          <div className="containerList">

            {
                checklists ? 
                  
                (
                  checklists?.map((checklist, index) => {

                    return(

                        <List key={index}
                          checklistData= { checklist }
                          taskData = { checklist.tasks }
                          archived={false}
                          handleNotification={handleNotification}
                          archivingList={() => {setQuantityArchivedLists()}}
                        />

                    )

                  })
                )

                : null
              }

              <div className="addListBtn">
                <Link to={`/create-checklist`}>
                  <button>
                    <FaCirclePlus/>
                  </button>
                </Link> 
              </div>

            </div>
              
            <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}>
              <p>The List was archived!</p>
            </Notification>
        </div>
    </section>
  )
}
