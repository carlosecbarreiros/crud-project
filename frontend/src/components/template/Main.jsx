import React from "react";
import Header from "./Header";

function Main(props) {
    return (
        <React.Fragment>
            <Header {...props} />
            <main className="content">
                <div className="p-2 m-3 shadow bg-white">
                    {props.children}
                </div>
            </main>
        </React.Fragment>
    )
}

export default Main