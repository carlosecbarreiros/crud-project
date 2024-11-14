import React, { useState } from "react";
import Main from "../template/Main";
import Table from "./Table"
import UpdateUser from "./UpdateUser";
import AddUser from "./AddUser";

function Moderator() {
    const [currentView, setCurrentView] = useState("table")
    const [userSelected, setUserSelected] = useState(null)
    const [order, setOrder] = useState("id")

    const handleAddUser = () => {
        setCurrentView("add")
    }

    const handleEditUser = (user) => {
        setUserSelected(user)
        setCurrentView("edit")
    }

    const handleCancel = () => {
        setCurrentView("table")
    }

    const handleOrderChange = (e) => {
        const selectedOrder = e.target.value
        if (selectedOrder === "alphabetical") {
            setOrder("name")
        } else {
            setOrder("id")
        }
    }

    const renderView = () => {
        if (currentView === "table") {
            return <Table order={order} onEditUser={handleEditUser} />
        } else if (currentView === "add") {
            return <AddUser onCancel={handleCancel} />
        } else if (currentView === "edit") {
            return <UpdateUser user={userSelected} onCancel={handleCancel} />
        }
    }

    return (
        <Main icon="gears" title="Moderador" subtitle="Controle de usuários: Incluir, Listar, Alterar e Excluir">
            <div className="flex items-center flex-col">
                {currentView === "table" && (
                    <React.Fragment>
                        <div className="flex flex-row mt-3 mb-1 mr-16 self-end items-end">
                            <select className="border border-black rounded p-1" onChange={handleOrderChange}>
                                <option value="dafault" >Ordem crescente (id)</option>
                                <option value="alphabetical" >Ordem alfabética</option>
                            </select>
                            <button className="bg-blue-500 text-white rounded p-2 ml-3"
                                onClick={handleAddUser}>Cadastrar Usuário</button>
                        </div>
                        <hr className="m-4 w-full" />
                    </React.Fragment>
                )}
                <div className="w-full">
                    {renderView()}
                </div>
            </div>
        </Main>
    )
}

export default Moderator