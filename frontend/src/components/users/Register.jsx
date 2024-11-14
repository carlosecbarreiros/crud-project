import React, { useState } from "react";
import Main from "../template/Main";
import axios from "axios";
import { toast } from "react-toastify"

function Register() {
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [senhaConfirmada, setSenhaConfirmada] = useState("")

    const [errorMessage, setErrorMessage] = useState("")
    const [errors, setErrors] = useState({})
    const [cpfError, setCpfError] = useState("")
    const [emailError, setEmailError] = useState("")

    const handleSubmit = e => {
        e.preventDefault()

        const newErrors = {}
        if (!name) newErrors.name = "*Nome é obrigatório*"
        if (!cpf) {
            newErrors.cpf = "*CPF é obrigatório*"
            setCpfError("")
        }   
        if (!email) {
            newErrors.email = "*Email é obrigatório*"
            setEmailError("")
        }
        if (!senha) newErrors.senha = "*Senha é obrigatória*"
        if (!senhaConfirmada) newErrors.senhaConfirmada = "*Confirmação de senha é obrigatória*"

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) return

        const newUser = {
            name,
            cpf,
            email,
            senha
        }

        if (senha === senhaConfirmada) {
            axios.post("http://localhost:8800/users", newUser)
                .then(({ data }) => {
                    setName("")
                    setCpf("")
                    setEmail("")
                    setSenha("")
                    setSenhaConfirmada("")
                    setErrorMessage("")
                    setErrors({})
                    setCpfError("")
                    setEmailError("")

                    toast.success(data)
                })
                .catch((error) => {
                    if (error.response && error.response.status === 409) {
                        const errors = error.response.data
                
                        if (errors.cpf) {
                            setCpfError(errors.cpf)
                        }
                        if (errors.email) {
                            setEmailError(errors.email)
                        }
                        if (!errors.cpf) {
                            setCpfError("")
                        }
                        if (!errors.email) {
                            setEmailError("");
                        }
                    }
                    console.log("Erro ao cadastrar usuário: ", error)
                })
        } else {
            setErrorMessage("As senhas não conferem! Tente novamente.")
        }
    }

    const handleClear = () => {
        setName("")
        setCpf("")
        setEmail("")
        setSenha("")
        setSenhaConfirmada("")
    }

    return (
        <Main icon="user-plus" title="Cadastrar" subtitle="Faça o seu cadastro aqui ↓">
            <form className="flex flex-col">
                <label className="my-2 text-sm"><i class="fa fa-user text-gray-300"></i> Nome</label>
                <input className="border border-gray-300 rounded p-1 w-96" type="text"
                    value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

                <label className="my-2 text-sm mt-5"><i class="fa fa-address-card text-gray-300"></i> CPF</label>
                <input className="border border-gray-300 rounded p-1 w-56" type="text"
                    value={cpf} onChange={(e) => setCpf(e.target.value)} />
                {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>}
                {cpfError && <p className="text-red-500 text-sm mt-1">{cpfError}</p>}

                <label className="my-2 text-sm mt-5"><i className="fa fa-envelope text-gray-300"></i> E-mail</label>
                <input className="border border-gray-300 rounded p-1 w-80" type="email"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

                <div className="flex">
                    <div className="flex flex-col mt-3">
                        <label className="my-2 text-sm"><i className="fa fa-key text-gray-300"></i> Senha</label>
                        <input className="border border-gray-300 rounded mb-1 p-1 w-64" type="password"
                            value={senha} onChange={(e) => setSenha(e.target.value)} />
                        {errors.senha && <p className="text-red-500 text-sm mt-1 mb-1">{errors.senha}</p>}
                    </div>
                    <div className="flex flex-col ml-10 mt-3">
                        <label className="my-2 text-sm"><i className="fa fa-key text-gray-300"></i> Confirmar Senha</label>
                        <input className="border border-gray-300 rounded p-1 w-64" type="password"
                            value={senhaConfirmada} onChange={(e) => setSenhaConfirmada(e.target.value)} />
                        {errors.senhaConfirmada && <p className="text-red-500 text-sm mt-1">{errors.senhaConfirmada}</p>}
                    </div>
                </div>
                {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
            </form>
            <div>
                <p className="text-sm ml-1 text-gray-600">
                    • <span className="ml-1">Um caractere maiúsculo</span><br />
                    • <span className="ml-1">Um mínimo de 8 caracteres</span> <br />
                    • <span className="ml-1">Um caractere especial</span> <br />
                    • <span className="ml-1">Um caractere minúsculo</span> <br />
                </p>
            </div>
            <hr className="mb-4 mt-6" />
            <div className="flex justify-end mx-4 mb-2">
                <button className="bg-blue-500 text-white rounded p-2" onClick={handleSubmit}>Cadastrar</button>
                <button className="bg-gray-500 text-white rounded p-2 ml-2" onClick={handleClear}>Limpar</button>
            </div>
        </Main>
    )
}

export default Register