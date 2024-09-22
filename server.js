import { createTableMinifigure,inserirMinifigure, buscarMinifigures, buscarMinifigure, apagarMinifigure, buscarMinifiguresColecao } from "./Controller/Minifigure.js"
import { createTableColecao, inserirColecao, buscarColecoes, apagarColecao } from "./Controller/Colecao.js"

import express from "express"
const port = 3000

const app = express()
app.use(express.json())
app.use(express.static("public"))

createTableMinifigure()
createTableColecao()

// Rotas para minifigure
app.get('/minifigures', async (req, res) => {
    let minifigures = await buscarMinifigures()
    res.json(minifigures)
})

// rota pega minifigure pela colecao
app.get('/minifigures-colecao', async (req, res) => {
    const colecao = req.query.colecao
    let minifigures = await buscarMinifiguresColecao(colecao)
    res.json(minifigures)
})

// rota pega minifigure
app.get('/minifigure', async (req, res) => {
    let minifigure = await buscarMinifigure(req.body.id)
    res.json(minifigure)
})

// rota inseri minifigure
app.post('/minifigure', (req, res) => {
    inserirMinifigure(req.body)
    res.json({
        "statusCode": 200
    })    
})

// rota apaga colecao
app.delete('/minifigure', async (req, res) => {
    let minifigure = await apagarMinifigure(req.body.id)
    res.json(minifigure)
})

// ROTAS PARA COLECAO
// rota cria colecao
app.post('/colecao', (req, res) => {
    inserirColecao(req.body)
    res.json({
        "statusCode": 200
    })    
})

// rota pega todas as colecoes
app.get('/colecoes', async (req, res) => {
    let colecoes = await buscarColecoes()
    res.json(colecoes)
})

// rota deleta colecao
app.delete('/colecao', async (req, res) => {
    let colecao = await apagarColecao(req.body.id)
    res.json(colecao)
})

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})