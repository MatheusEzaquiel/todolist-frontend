import { useEffect, useState } from "react";
import styles from "./ArchivedListsPage.module.css"

import { ChecklistService } from "../../services/api/checklists/ChecklistService";
import { ArchivedList } from "../../components/archivedList/ArchivedList";
import { Notification } from "../../components/notification/Notification";


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

    <section className={styles.section}>

      <div className={styles.headerMenu}>
          <h1 className={styles.title}>Archiveds</h1>
      </div>
        
      <div className={styles.containerDefault}>

        <div className={styles.containerList}>

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

            : <h2 className="nothingFounded">AnyList was founded...</h2>
          }

        </div>

        <Notification enabled={isOpenNotification} close={() => setIsOpenNotification(false)}  element={{type: "ok", message: "The list was unarchived"}}>
        </Notification>
      </div>
    </section>
  )
}
