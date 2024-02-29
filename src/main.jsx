import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from './routes/root.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'


import { Login } from "./pages/login/Login.jsx"
import { Profile } from "./pages/profile/Profile.jsx"

import { CreateTask } from './pages/Task/create-task/CreateTask.jsx'
import { EditTask } from "./pages/task/edit-task/EditTask.jsx"
import { CreateList} from "./pages/lists/create-list/CreateList.jsx"
import { EditList } from './pages/lists/edit-list/EditList.jsx'
import { Register } from './pages/register/Register.jsx'
import { Lists } from "./pages/home/Lists.jsx"
import { ArchivedListsPage } from "./pages/archiveds/ArchivedListsPage.jsx"

  
const baseURL = "/todolist-frontend"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [

      { path: baseURL + "/", element: <Login/> },
      { path: baseURL + "/login", element: <Login/> },
      { path: baseURL + "/register", element: <Register/> },

      { path: baseURL + "/my", element: <PrivateRoute> <Profile/> </PrivateRoute> },

      { path: baseURL + "/lists", element: <PrivateRoute> <Lists/> </PrivateRoute> },
      { path: baseURL + "/create-task/:checklistId", element: <PrivateRoute> <CreateTask/> </PrivateRoute> },
      { path: baseURL + "/edit/:checklistId/:taskId", element: <PrivateRoute> <EditTask/> </PrivateRoute> },
      { path: baseURL + "/archiveds", element: <PrivateRoute> <ArchivedListsPage/> </PrivateRoute>},

      { path: baseURL + "/create-list", element: <PrivateRoute> <CreateList/> </PrivateRoute>},
      { path: baseURL + "/edit-checklist/:checklistId", element: <PrivateRoute> <EditList/> </PrivateRoute> },

    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
