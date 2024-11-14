import { db } from "../db.js";

export const getUsers = (req, res) => {
    const order = req.query.order || "id"

    const q = "SELECT * FROM usuarios ORDER BY ?? ASC"
    db.query(q, [order],(err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.status(200).json(data)
        }
    })
}

export const deleteUser = (req, res) => {
    const userId = req.params.id
    const q = "DELETE FROM usuarios WHERE id = ?"

    db.query(q, [userId], (err) => {
        if (err) {
            return res.json(err)
        } else {
            return res.status(200).json("Usuário deletado com sucesso!")
        }
    })
}

function getNextAvailableId(callback) {
    db.query("SELECT id FROM usuarios ORDER BY id ASC", (error, results) => {
        if (error) return callback(error, null)
        
        const ids = results.map((row) => row.id)
        let missingId = null

        for (let i = 1; i <= ids.length; i++) {
            if (ids[i - 1] !== i) {
                missingId = i
                break
            }
        }

        callback(null, missingId || ids.length + 1)
    })
}

export const addUser = (req, res) => {
    const { name, cpf, email, senha } = req.body

    const cpfQuery = "SELECT * FROM usuarios WHERE cpf = ?"
    const emailQuery = "SELECT * FROM usuarios WHERE email = ?"

    db.query(cpfQuery, [cpf], (err, cpfResults) => {
        if (err) return res.status(500).json({ message: "Erro no servidor" })

        const cpfInUse = cpfResults.length > 0

        db.query(emailQuery, [email], (err, emailResults) => {
            if (err) return res.status(500).json({ message: "Erro no servidor" })

            const emailInUse = emailResults.length > 0

            const errors = {}
            if (cpfInUse) errors.cpf = "Este CPF já está em uso."
            if (emailInUse) errors.email = "Este Email já está em uso."

            if (cpfInUse || emailInUse) {
                return res.status(409).json(errors)
            }

            getNextAvailableId((error, missingId) => {
                if (error) {
                    return res.status(500).json({ error: "Erro ao buscar ID" })
                }

                let q
                let values

                if (missingId) {
                    q = "INSERT INTO usuarios (id, name, cpf, email, senha) VALUES (?, ?, ?, ?, ?)"
                    values = [missingId, name, cpf, email, senha]
                } else {
                    q = "INSERT INTO usuarios (name, cpf, email, senha) VALUES (?, ?, ?, ?)"
                    values = [name, cpf, email, senha]
                }

                db.query(q, values, (err) => {
                    if (err) {
                        return res.status(500).json(err)
                    } else {
                        return res.status(201).json("Usuário cadastrado com sucesso!")
                    }
                })
            })
        })
    })
}

export const updateUser = (req, res) => {
    const { id } = req.params
    const { name, cpf, email, senha } = req.body

    const cpfQuery = "SELECT * FROM usuarios WHERE cpf = ? AND id != ?"
    const emailQuery = "SELECT * FROM usuarios WHERE email = ? AND id != ?"

    db.query(cpfQuery, [cpf, id], (err, cpfResults) => {
        if (err) return res.status(500).json({ message: "Erro no servidor" })

        const cpfInUse = cpfResults.length > 0

        db.query(emailQuery, [email, id], (err, emailResults) => {
            if (err) return res.status(500).json({ message: "Erro no servidor" })

            const emailInUse = emailResults.length > 0

            const errors = {}
            if (cpfInUse) errors.cpf = "Este CPF já está em uso."
            if (emailInUse) errors.email = "Este Email já está em uso."

            if (cpfInUse || emailInUse) {
                return res.status(409).json(errors)
            }


            const q = "UPDATE usuarios SET name = ?, cpf = ?, email = ?, senha = ? WHERE id = ?"
            db.query(q, [name, cpf, email, senha, id], (err, data) => {
                if (err) {
                    return res.json(err)
                } else {
                    return res.status(200).json("Usuário atualizado com sucesso!")
                }
            })
        })
    })
}

export const getUserByEmailAndPassword = (email, senha) => {
    const q = "SELECT * FROM usuarios WHERE email = ? AND senha = ?"

    return new Promise((resolve, reject) => {
        db.query(q, [email, senha], (err, results) => {
            if (err) {
                return reject(err)
            }
            if (results.length > 0) {
                resolve(results[0])
            } else {
                resolve(null)
            }
        })
    })
}