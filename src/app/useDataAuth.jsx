import { useState } from "react"

const useDataAuth = () => {

  const getDataAuth = () => {
      
    const dataAuthJSON = localStorage.getItem('dataAuth');
    const dataAuthObj = JSON.parse(dataAuthJSON);
    
    return dataAuthObj;

  }

  const saveDataAuth = (dataAuth) => {

    localStorage.setItem("dataAuth", JSON.stringify(dataAuth));
    setDataAuth(dataAuth)

  }

  const [dataAuth, setDataAuth] = useState(getDataAuth());

    return {
        setDataAuth: saveDataAuth,
        dataAuth,
    }

}

export default useDataAuth;