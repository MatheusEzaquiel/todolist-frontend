import { useState } from "react"

const useToken = () => {
    
   const getToken = () => {
      
      const tokenString = localStorage.getItem('userToken')
      const userToken = JSON.parse(tokenString)
      return userToken?.token;

    }

    const [token, setToken] = useState(getToken())

    const saveToken = (userToken) => {

      localStorage.setItem("userToken", JSON.stringify(userToken));
      setToken(userToken)

    }

    return {
        setToken: saveToken,
        token
    }

}

export default useToken;