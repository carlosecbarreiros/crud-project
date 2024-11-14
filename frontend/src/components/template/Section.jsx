import React from "react";

function Section(props) {
    return(
        <a href={props.href} className="block text-white font-light p-4 hover:bg-gradient-to-r from-blue-500 to-cyan-500">
            <i className={`fa fa-${props.icon}`}>{props.sectionName}</i>
        </a>
    )
}

export default Section