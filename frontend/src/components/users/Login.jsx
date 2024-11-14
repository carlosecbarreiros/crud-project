import React, { useState } from "react";
import Main from "../template/Main";
import User from "./User";
import axios from "axios";

function Login() {
    const [currentView, setCurrentView] = useState("login")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const handleUserView = () => {
        setCurrentView("user")
    }

    const handleBack = () => {
        setCurrentView("login")
        localStorage.removeItem('loggedUser')
        setErrorMessage("")
        setEmail("")
        setSenha("")
    }

    const handleLogin = (e) => {
        e.preventDefault()

        const userCredentials = { email, senha }

        axios.post("http://localhost:8800/login", userCredentials)
            .then((response) => {
                const { data } = response
                if (data.success) {
                    localStorage.setItem("user", JSON.stringify(data.user))
                    handleUserView()
                } else {
                    setErrorMessage("Usuário ou senha inválidos")
                }
            })
            .catch((error) => {
                console.error("Erro no login: ", error)
                setErrorMessage("Erro ao fazer login. Tente novamente.")
            })
    }

    const handleClear = () => {
        setEmail("")
        setSenha("")
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    function loginForm() {
        return (
            <div>
                <form className="flex flex-col">
                    <label className="my-2 text-sm"><i className="fa fa-envelope text-gray-300"></i> E-mail</label>
                    <input className="border border-gray-300 rounded mb-3 p-1 w-80" type="text"
                        value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label className="my-2 text-sm"><i className="fa fa-key text-gray-300"></i> Senha</label>
                    <div className="relative">
                        <input
                            className="border border-gray-300 rounded mb-3 p-1 w-80"
                            type={showPassword ? 'text' : 'password'}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute top-1 left-72 text-gray-500 hover:bg-gray-300 rounded-lg px-1"
                        >
                            {showPassword ? (
                                <i className="fa fa-eye-slash"></i>
                            ) : (
                                <i className="fa fa-eye"></i>
                            )}
                        </button>
                    </div>

                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                </form>
                <hr className="my-4" />
                <div className="flex justify-end mx-4 mb-2">
                    <button className="bg-blue-500 text-white rounded p-2 "
                        onClick={handleLogin}>Entrar</button>
                    <button className="bg-gray-500 text-white rounded p-2 ml-2" onClick={handleClear}>Limpar</button>
                </div>
            </div>
        )

    }

    const renderView = () => {
        if (currentView === "login") {
            return loginForm()
        } else if (currentView === "user") {
            return <User onBack={handleBack} />
        }
    }

    return (
        <Main icon="users" title="Entrar" subtitle="Acesse sua conta aqui ↓">
            {renderView()}
        </Main>
    )
}

export default Login