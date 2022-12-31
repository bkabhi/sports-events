import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CreateEvent } from '../pages/CreateEvent'
import EventDetails from '../pages/EventDetails'
import EventsStatus from '../pages/EventsStatus'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={< Home />} />
            <Route path='/event/:id' element={<EventDetails/>} />
            <Route path='/CreateEvent' element={<CreateEvent />} />
            <Route path='/EventsStatus' element={<EventsStatus />} />
        </Routes>
    )
}

export default AllRoutes