import React from "react";
import Section from "./Section";

function Nav() {
    return (
        <aside className="nav-bar bg-sky-950 shadow shadow-black flex flex-col z-10">
            <nav>
                <Section href="/" sectionName=" Início" icon="home"/>
                <Section href="/register" sectionName=" Cadastrar" icon="user-plus"/>
                <Section href="/login" sectionName=" Entrar" icon="users"/>
                <Section href="/moderator" sectionName=" Moderador" icon="gears"/>
            </nav>
        </aside>
    )
}

export default Nav