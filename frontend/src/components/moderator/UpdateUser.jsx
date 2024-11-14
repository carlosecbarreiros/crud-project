import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UpdateUser({ onCancel, user}) {
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const [errors, setErrors] = useState({})
    const [cpfError, setCpfError] = useState("")
    const [emailError, setEmailError] = useState("")


    useEffect(() => {
        if (user) {
            setName(user.name)
            setCpf(user.cpf)
            setEmail(user.email)
            setSenha(user.senha)
        }
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = {}
        if (!name) newErrors.name = "*Este campo não pode ficar vazio*"
        if (!cpf) {
            newErrors.cpf = "*Este campo não pode ficar vazio*"
            setCpfError("")
        }   
        if (!email) {
            newErrors.email = "*Este campo não pode ficar vazio*"
            setEmailError("")
        }
        if (!senha) newErrors.senha = "*Este campo não pode ficar vazio*"

        setErrors(newErrors)

        if(Object.keys(newErrors).length > 0) return

        if (
            name === user.name &&
            cpf === user.cpf &&
            email === user.email &&
            senha === user.senha
        ) {
            toast.info("Nenhuma alteração foi feita.")
            return
        }

        const updateUser = {
            id: user.id,
            name,
            cpf,
            email,
            senha
        }

        axios.put(`http://localhost:8800/users/${user.id}`, updateUser)
            .then(({data}) => {
                toast.success(data) 
                onCancel()
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
    }


    return (
        <div className="flex flex-col">
            <h1 className="text-center mt-5 text-xl"> <i className="fa fa-pencil"></i> Atualizar Usuário</h1>
            <hr className="w-full m-5" />
            <div className="self-center shadow rounded shadow-gray-400 w-3/5 p-5 mt-5 mb-10">
                <form className="flex flex-col m-5 items-left">
                    <div className="flex flex-row ">
                        <label className="font-bold w-20 my-2 text-sm mr-5"> ID:</label>
                        <label className="font-bold my-2 text-sm mr-5"> {user.id}</label>
                    </div>
                    <div className="flex flex-row mt-5">
                        <label className="w-16 my-2 text-sm mr-5"><i class="fa fa-user text-gray-300"></i> Nome:</label>
                        <input className="border border-gray-400 rounded p-1 w-11/12 bg-gray-50" type="text" 
                        value={name} onChange={(e) => setName(e.target.value)} />
                    </div>  
                    {errors.name && <p className="text-red-500 text-sm mt-1 text-right">{errors.name}</p>}
                    <div className="flex flex-row mt-5">
                        <label className="w-16 my-2 text-sm mr-5"><i class="fa fa-address-card text-gray-300"></i> CPF:</label>
                        <input className="border border-gray-400 rounded p-1 w-11/12  bg-gray-50" type="text" 
                        value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                    </div>
                    {errors.cpf && <p className="text-red-500 text-sm mt-1 text-right">{errors.cpf}</p>}
                    {cpfError && <p className="text-red-500 text-sm mt-1 text-right">{cpfError}</p>}
                    <div className="flex flex-row mt-5">
                        <label className="w-16 my-2 text-sm mr-5"><i className="fa fa-envelope text-gray-300"></i> E-mail:</label>
                        <input className="border border-gray-400 rounded p-1 w-11/12  bg-gray-50" type="text" 
                        value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1 text-right">{errors.email}</p>}
                    {emailError && <p className="text-red-500 text-sm mt-1 text-right">{emailError}</p>}
                    <div className="flex flex-row mt-5">
                        <label className="w-16 my-2 text-sm mr-5"><i className="fa fa-key text-gray-300"></i> Senha:</label>
                        <input className="border border-gray-400 rounded p-1 w-11/12 bg-gray-50" type="text" 
                        value={senha} onChange={(e) => setSenha(e.target.value)}/>
                    </div>
                    {errors.senha && <p className="text-red-500 text-sm mt-1 mb-1 text-right">{errors.senha}</p>}
                </form>
                <div className="flex justify-end mx-4 mb-2">
                    <button className="bg-green-600 text-white rounded p-2" onClick={handleSubmit}>Confirmar</button>
                    <button className="bg-gray-500 text-white rounded p-2 ml-2"
                    onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser