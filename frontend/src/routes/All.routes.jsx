import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CreateEvent } from '../pages/createEvents/CreateEvent'
import EventDetails from '../pages/eventDetails/EventDetails'
import EventsStatus from '../pages/eventStatus/EventsStatus'
import Login from '../pages/auth/Login'
import PrivateRoutes from './Private.Routes'
import Register from '../pages/auth/Register'
import Home from '../pages/eventsList/Home'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<PrivateRoutes>< Home /></PrivateRoutes>} />
            <Route path='/event/:id' element={<PrivateRoutes><EventDetails/></PrivateRoutes>} />
            <Route path='/CreateEvent' element={<PrivateRoutes><CreateEvent /></PrivateRoutes>} />
            <Route path='/EventsStatus' element={<PrivateRoutes><EventsStatus /></PrivateRoutes>} />
        </Routes>
    )
}

export default AllRoutes