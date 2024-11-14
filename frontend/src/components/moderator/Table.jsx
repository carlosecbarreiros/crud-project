import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function Table({ order, onEditUser }) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8800/", { params: { order }})
            .then(reponse => {
                setUsers(reponse.data)
            })
            .catch(error => {
                console.error("Houve um erro ao buscar usuário!", error)
            })
    }, [order])

    const onDeleteUser = (user) => {
        MySwal.fire({
            title: 'Tem certeza?',
            text: `Deseja realmente excluir o usuário ${user.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8800/${user.id}`)
                    .then(({data}) => {
                        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
                        toast.success(data);
                    })
                    .catch((error) => {
                        console.error("Erro ao deletar usuário:", error);
                        MySwal.fire({
                            icon: 'error',
                            title: 'Erro',
                            text: 'Erro ao excluir usuário. Tente novamente.'
                        })
                    });
            }
        });
    };

    function renderHead() {
        return (
            <tr>
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Nome</th>
                <th className="text-left p-3">CPF</th>
                <th className="text-left p-3">E-mail</th>
                <th className="text-left p-3">Senha</th>
                <th className="p-3">Ações</th>
            </tr>
        )
    }

    function renderData() {
        return users.map((user) => (
            <tr key={user.id} className="even:bg-gray-100">
                <td className="text-left p-4">{user.id}</td>
                <td className="text-left p-4">{user.name}</td>
                <td className="text-left p-4">{user.cpf}</td>
                <td className="text-left p-4">{user.email}</td>
                <td className="text-left p-4">{user.senha}</td>
                {renderButtons(user)}
            </tr>
        ))
    }

    function renderButtons(user) {
        return (
            <td className="ações text-base p-4 text-center">
                <button className="bg-yellow-400 px-2 py-1 rounded"
                    onClick={() => onEditUser(user)}>
                    <i className="fa fa-pencil"></i>
                </button>
                <button className="bg-red-600 px-2.5 py-1 rounded ml-2"
                    onClick={() => onDeleteUser(user)}>
                    <i className="fa fa-trash"></i>
                </button>
            </td>
        )
    }

    return (
        <div className="flex justify-center">
            <table className="w-11/12 mt-3 mb-6">
                <thead className="shadow rounded shadow-gray-400">
                    {renderHead()}
                </thead>
                <tbody className="text-xs">
                    {users.length > 0 ? renderData() : <tr><td colSpan="6" className="text-center p-4">Nenhum usuário cadastrado!</td></tr>}
                </tbody>
            </table>
        </div>
    )
}

export default Table