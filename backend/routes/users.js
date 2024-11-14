import express from "express";
import { deleteUser, getUsers, addUser, updateUser, getUserByEmailAndPassword } from "../controllers/user.js";

const router = express.Router()

router.get("/", getUsers)

router.delete("/:id", deleteUser)

router.post("/users", addUser)

router.put("/users/:id", updateUser)

router.post("/login", async (req, res) => {
    const { email, senha } = req.body

    try {
        const user = await getUserByEmailAndPassword(email, senha)
        if (user) {
            res.json({ success: true, user })
        } else {
            res.json({ success: false, message: "Usuários ou senha inválidos." })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro interno do servidor."})
    }
})

export default router