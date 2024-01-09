import { Sidebar } from './components/basis';
import ProtectedUserRoute from './components/protect/ProtectedUserRoute';
import { ROUTES } from './constants/routes';
import { Appointments, Configuration, Home, Login, Patient, Patients, Profesional, Profesionals, Schedule } from './pages'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
  
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
                        <Patients/>
                    </div>
                ),
            },
            {
                path: `${ROUTES.Patients}/:id`,
                element: (
                    <div className='d-flex'>
                        <Sidebar/>
                        <Patient/>
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
                        <Profesional/>
                    </div>
                ),
            },
            {
                path: `${ROUTES.Profesionals}/:id/schedule`,
                element: (
                    <div className='d-flex'>
                        <Sidebar/>
                        <Schedule/>
                    </div>
                ),
            },
            {
                path: ROUTES.Appointments,
                element: (
                    <div className='d-flex'>
                        <Sidebar/>
                        <Appointments/>
                    </div>
                ),
            },
            {
                path: ROUTES.Configuration,
                element: (
                    <div className='d-flex'>
                        <Sidebar/>
                        <Configuration/>
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