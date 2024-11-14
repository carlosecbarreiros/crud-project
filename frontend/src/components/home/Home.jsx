import React from "react";
import Main from "../template/Main";

function Home() {
    return(
        <Main icon="home" title="Início" subtitle="Projeto para práticar conceitos de desenvolvimento web.">
            <div className="text-6xl">Bem Vindo!</div>
            <hr className="my-3"/>
            <p>Sistema para exemplicar a construção de um cadastro/login e controle de usuários, desenvolvido em React com MySQL Server.</p>
            <br /> 
            <p>Principais tecnologias utilizadas: </p>
            <p className="ml-2">- Node <br /> - MySQL <br /> - Express <br /> - React <br /> - CSS Tailwind <br /> - Axios </p>
        </Main>
    )
}

export default Home