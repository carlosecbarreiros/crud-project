import React from "react";

function Header(props) {
    return(
        <header className="header
         bg-white px-3.5 overflow-hidden shadow flex flex-col">
            <h1 className="text-3xl mt-4">
                <i className={`fa fa-${props.icon}`}></i> {props.title}
            </h1>
            <p className="text-gray-400 mt-1 text-lg">{props.subtitle}</p>
        </header>
    )
}

export default Header