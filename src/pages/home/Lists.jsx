import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { GoPlusCircle } from "react-icons/go"

import "./Lists.css"

import { ChecklistService } from "./../../services/api/checklists/ChecklistService"
import { ApiException } from "../../services/api/ApiException"
import { List } from "./../../components/List/List"
import { Notification } from "./../../components/notification/Notification"
import { ButtonAddCard } from "../../components/button-add-card/ButtonAddCard"
import { HeaderPage } from "../../components/header-page/HeaderPage"

import useDataAuth from '../../app/useDataAuth';



export const Lists = () => {

  const basicUserData = useDataAuth()
  
  const [isOpenNotification, setIsOpenNotification] = useState(false)

  const [ checklists, setChecklists ] = useState(null)

  const [quantityAchivedLists, setQuantityArchivedLists] = useState(0)


    const getChecklists = async() => {

        try {
          const res = await ChecklistService.list(basicUserData.dataAuth.id)
          setChecklists(res)
        } catch (ex) {
          if (ex instanceof ApiException) {
            console.error("ERROR: " + ex.message)
          }
        } 

    }

    const handleNotification = () => {

      setIsOpenNotification(true)

      setTimeout(() => {
        setIsOpenNotification(false)
      }, 5000)

    };


    useEffect(() => {
        getChecklists()
    },[quantityAchivedLists])

  return (

   

    <section className="section w-[100vw]">

      <HeaderPage title="Lists">
        <Link to={`/todolist-frontend/create-list`}>
          <button className="bg-orange p-2 rounded-lg">
            <span className="text-white flex items-center justify-center gap-2 text-md">
              <GoPlusCircle fontSize="2rem"/>
              new List
            </span>
          </button>
        </Link>
      </HeaderPage>
        
      <div className="w-full">

          <div className="w-full p-4 bg-green lg:w-[90%] lg:flex lg:gap-6 lg:flex-wrap lg:mx-auto lg:bg-green">

          {
                checklists ? 
                  
                (
                  checklists?.map((checklist, index) => {

                    return(

                        <List key={index}
                          checklistData = {checklist}
                          taskData = {checklist.tasks}
                          handleNotification={handleNotification}
                          archivingList={() => {setQuantityArchivedLists()}}
                        />

                    )

                  })
                )

                : null
              }

              <ButtonAddCard/>
              
          </div>
              
            <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}>
              <p>The List was archived!</p>
            </Notification>
      </div>
    </section>
  )
}
