import { Sidebar } from './components/basis';
import ProtectedUserRoute from './components/protect/ProtectedUserRoute';
import { ROUTES } from './constants/routes';
import { Configuration, Home, Login, Patient, Patients, Profesional, Profesionals } from './pages'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
  
const router = createBrowserRouter([
    {
        path: ROUTES.Root,
        element: <ProtectedUserRoute/>,
        children: [
            {
                path: ROUTES.Home,
                element: (
                    <div className='d-flex'>
                        <Sidebar/>
                        <Home/>
                    </div>
                ),
            },
            {
                path: ROUTES.Patients,
                element: (
                    <div className='d-flex'>
                        <Sidebar/>
                        <div className='flex-grow-1'>
                            <Patients/>
                        </div>
                    </div>
                ),
            },
            {
                path: `${ROUTES.Patients}/:id`,
                element: (
                    <div className='d-flex'>
                        <Sidebar/>
                        <div className='flex-grow-1'>
                            <Patient/>
                        </div>
                    </div>
                ),
            },
            {
                path: ROUTES.Profesionals,
                element: (
                    <div className='d-flex'>
                        <Sidebar/>
                        <Profesionals/>
                    </div>
                ),
            },
            {
                path: `${ROUTES.Profesionals}/:id`,
                element: (
                    <div className='d-flex'>
                        <Sidebar/>
                        <div className='flex-grow-1 bg-body-tertiary'>
                            <Profesional/>
                        </div>
                    </div>
                ),
            },
            {
                path: ROUTES.Configuration,
                element: (
                    <div className='d-flex'>
                        <Sidebar/>
                        <div className='flex-grow-1'>
                            <Configuration/>
                        </div>
                    </div>
                ),
            },
        ]
    },
    {
        path: ROUTES.Login,
        element: (
            <>
                <Login/>
            </>
        ),
    }
])

const App = () => {
    return <RouterProvider router={router}/>
}

export default App