import { useEffect, useState } from "react"

import { ChecklistService } from "../../services/api/checklists/ChecklistService"
import { ArchivedList } from "../../components/archivedList/ArchivedList"
import { Notification } from "../../components/notification/Notification"
import { HeaderPage } from "../../components/header-page/HeaderPage"

import emptyImg from "./../../assets/img/empty-figure.svg"


export const ArchivedListsPage = () => {

  const [userLoggedData] = useState(JSON.parse(localStorage.getItem("userLoggedData")));

  const [refreshUnarchiveds, setRefreshUnarchiveds] = useState(0);

  const [isOpenNotification, setIsOpenNotification] = useState(false);

  
  const [ checklists, setChecklists ] = useState(null)

    const getChecklists = async() => {

      try {
        const res = await ChecklistService.listArchiveds(userLoggedData.id);
        setChecklists(res);
      } catch (ex) {
        console.log(ex.message)
      } 
    }

    
    useEffect(() => {
        getChecklists();
    },[refreshUnarchiveds])

  return (

    <section className="section w-[100vw]">

      <HeaderPage title="Archiveds">
          <span className="text-black flex items-center justify-center gap-2 text-md">
            <i>unarchive a list</i>
          </span>
      </HeaderPage>
        
      <div className="w-full">

        <div className="w-full p-4 lg:w-[90%] lg:flex lg:gap-6 lg:flex-wrap lg:mx-auto">

          { checklists?.length > 0 ? 
              
              (
                checklists?.map((checklist, index) => {

                  return(

                      <ArchivedList key={index}
                        checklistData= { checklist }
                        taskData = { checklist.tasks }
                        refreshUnarchivedLists = {() => { setRefreshUnarchiveds(refreshUnarchiveds + 1); setIsOpenNotification(true) }}
                      />

                  )

                })
              )

            : (
              <div className="w-full mt-32 lg:mt-16 lg:flex lg:flex-col-reverse lg:gap-12">
                <img src={emptyImg} alt="no-lists" className="w-72 mx-auto lg:w-96"/>
                <h2 className="text-gray-300 text-center text-2xl mt-4 lg:text-4xl">AnyList was founded...</h2>
              </div>
            )
          }

        </div>

        <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}  element={{type: "ok", message: "The list was unarchived"}}>
        </Notification>
      </div>
    </section>
  )
}
