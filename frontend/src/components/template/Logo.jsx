import React from "react";
import logo from '../../assets/imgs/bscutilitieslogo-Photoroom.png'

function Logo() {
    return (
        <aside className="logo 
        bg-sky-950 flex justify-center items-center shadow-md shadow-black z-10">
            <a href="/">
                <img className="h-36" src={logo} alt="bsc_logo" />
            </a>
        </aside>
    )
}

export default Logo