import React from "react"
import { Routes, Route } from "react-router-dom"

import Home from "../components/home/Home"
import Register from "../components/users/Register"
import Login from "../components/users/Login"
import Moderator from "../components/moderator/Moderator"

export default props => (
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/moderator" element={<Moderator />} />
        <Route path="*" element={<Home />} />
    </Routes>
)