import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from './routes/root.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx'

import { CreateTask } from './pages/Task/create-task/CreateTask.jsx'
import { EditTask } from './pages/Task/edit-page/EditTask.jsx'

import { CreateList} from './pages/checklist/create-page/CreateList.jsx'
import { EditList } from './pages/checklist/edit-page/EditList.jsx'


import { Register } from './pages/register/Register.jsx'
import { Login } from './pages/login/Login.jsx'
import { Profile } from "./pages/profile/Profile.jsx"

import { Lists } from './pages/checklist/lists/Lists.jsx'
import { ArchivedListsPage } from './pages/archiveds/ArchivedListsPage.jsx'
  


const router = createBrowserRouter([
  {
    
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [

      { path: "/", element: <Login/> },
      { path: "/login", element: <Login/> },
      { path: "/register", element: <Register/> },

      { path: "/my", element: <PrivateRoute> <Profile/> </PrivateRoute> },

      { path: "/lists", element: <PrivateRoute> <Lists/> </PrivateRoute> },
      { path: "/archiveds", element: <PrivateRoute> <ArchivedListsPage/> </PrivateRoute>},

      { path: "/create-task/:checklistId", element: <PrivateRoute> <CreateTask/> </PrivateRoute> },
      { path: "/edit/:checklistId/:taskId", element: <PrivateRoute> <EditTask/> </PrivateRoute> },
      { path: "/create-checklist", element: <PrivateRoute> <CreateList/> </PrivateRoute>},
      { path: "/edit-checklist/:checklistId", element: <PrivateRoute> <EditList/> </PrivateRoute> },

    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
