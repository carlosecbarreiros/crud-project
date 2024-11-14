import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function User({ onBack }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const handleDeleteAccount = () => {
        if (user) {
            MySwal.fire({
                title: 'Tem certeza?',
                text: 'Você realmente deseja excluir sua conta?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, excluir',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`http://localhost:8800/${user.id}`)
                        .then((response) => {
                            if (response.status === 200) {
                                localStorage.removeItem("user")
                                toast.success("Sua conta foi excluída com sucesso!")
                                onBack()
                            } else {
                                MySwal.fire({
                                    icon: 'error',
                                    title: 'Erro',
                                    text: 'Erro ao excluir conta. Tente novamente.'
                                })
                            }
                        })
                        .catch((error) => {
                            console.error("Erro ao excluir conta: ", error)
                        })
                }
            })

        }
    }

    if (!user) {
        return <p>Carregando informações do usuário...</p>
    }

    return (
        <div className="flex items-center justify-center mt-4">
            <div className="shadow rounded shadow-gray-400 w-2/5 p-5 mt-5 mb-10">
                <form className="flex flex-col m-5 items-left">
                    <div className="flex flex-row mb-5">
                        <label className="font-bold w-16 my-2 text-sm mr-5"> ID:</label>
                        <label className="font-bold my-2 text-sm mr-5">{user.id}</label>
                    </div>
                    <div className="flex flex-row mb-5">
                        <label className="w-16 my-2 text-sm mr-5"><i class="fa fa-user text-gray-300"></i> Nome:</label>
                        <label className="my-2 text-sm mr-5">{user.name}</label>
                    </div>
                    <div className="flex flex-row mb-5">
                        <label className="w-16 my-2 text-sm mr-5"><i class="fa fa-address-card text-gray-300"></i> CPF:</label>
                        <label className="my-2 text-sm mr-5">{user.cpf}</label>
                    </div>
                    <div className="flex flex-row mb-5">
                        <label className="w-16 my-2 text-sm mr-5"><i className="fa fa-envelope text-gray-300"></i> E-mail:</label>
                        <label className="my-2 text-sm mr-5">{user.email}</label>
                    </div>
                    <div className="flex flex-row">
                        <label className="w-16 my-2 text-sm mr-5"><i className="fa fa-key text-gray-300"></i> Senha:</label>
                        <label className="my-2 text-sm mr-5">{user.senha}</label>
                    </div>
                </form>
                <div className="flex justify-end mx-4 mb-2 mt-3">
                    <button className="bg-red-500 text-white rounded p-2 ml-2"
                        onClick={handleDeleteAccount}>Excluir conta</button>
                    <button className="bg-gray-500 text-white rounded p-2 ml-2"
                        onClick={onBack}>Voltar</button>
                </div>
            </div>
        </div>
    )
}

export default User