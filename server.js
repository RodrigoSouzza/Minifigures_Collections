import sqlite3 from "sqlite3"
import express from "express"
const port = 3000

const app = express()

app.use(express.json())
app.use(express.static("public"))

//Conectar o banco de dados SQlite
const db = new sqlite3.Database("./minifigures.db", (err) => {
    if(err) {
        console.error("Erro ao abrir o banco de dados", err.message)
    }
    console.log("Conectado ao banco de dados sqlite.")
})

// Criando tabelas se não existirem
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS colecoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        url TEXT NOT NULL)
    `)

    db.run(`
        CREATE TABLE IF NOT EXISTS minifigures (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        url TEXT NOT NULL,
        colecao TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (colecao) REFERENCES colecoes(nome))
    `)
})

//Rotas API
//Rota para buscar todas as colecoes
app.get('/colecoes', (req, res) => {
    db.all('SELECT * FROM colecoes', [], (err, rows) => {
        if(err) {
            res.status(400).json({ error: err.message })
            return
        }
        res.json({ data: rows })
    })
})

//Rota para adicionar uma nova colecao 
app.post('/colecoes', (req, res) => {
    const {nome, url} = req.body
    db.run('INSERT INTO colecoes (nome, url) VALUES (?, ?)', [nome, url], function (err){
        if(err){
            res.status(400).json({ error: err.message})
            return
        }
        res.json({ message: "Colecao adicionada com sucesso!", id: this.lastID })
    })
})

app.get("/minifigures", (req, res) => {
    db.all('SELECT * FROM minifigures', [], (err, rows) => {
        if(err) {
            res.status(400).json({ error: err.message })
            return
        }
        res.json({ data: rows })
    })
})
// Rota para adicionar uma nova minifigure
app.post('/minifigures', (req, res) => {
    const {nome, url, colecao, status} = req.body
    db.run('INSERT INTO minifigures (nome, url, colecao, status) VALUES (?, ?, ?, ?)', [nome, url, colecao, status], function (err){
        if(err){
            res.status(400).json({ error: err.message })
            return
        }
        res.json({ message: 'Minifigure adicionada com sucesso!', id: this.lastID})
    })
})

app.delete('/minifigure', (req, res) => {
    const {nome, url, colecao, status} = req.body
    db.run('DELETE FROM minifigures  (nome, url, colecao, status) VALUES (?, ?, ?, ?)', [nome, url, colecao, status], function (err){
        if(err){
            res.status(400).json({ error: err.message })
            return
        }
        res.json({ message: 'Minifigure adicionada com sucesso!', id: this.lastID})
    })
})

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})