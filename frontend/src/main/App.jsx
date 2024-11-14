import React from "react";
import "./App.css"
import "font-awesome/css/font-awesome.min.css"

import { BrowserRouter } from "react-router-dom";

import Logo from "../components/template/Logo";
import Nav from "../components/template/Nav";
import Routes from "./Routes"
import Footer from "../components/template/Footer";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Logo></Logo>
                <Nav></Nav>
                <Routes></Routes>
                <Footer></Footer> 
                <ToastContainer autoClose={4000} position="bottom-left" />
            </div>
        </BrowserRouter>
    )
}

export default App