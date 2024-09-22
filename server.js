// import { openDb } from "./configDB.js"
import { createTableMinifigure,inserirMinifigure, buscarMinifigures, buscarMinifigure, apagarMinifigure } from "./Controller/Minifigure.js"
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

app.get('/minifigure', async (req, res) => {
    let minifigure = await buscarMinifigure(req.body.id)
    res.json(minifigure)
})

app.post('/minifigure', (req, res) => {
    inserirMinifigure(req.body)
    res.json({
        "statusCode": 200
    })    
})

app.delete('/minifigure', async (req, res) => {
    let minifigure = await apagarMinifigure(req.body.id)
    res.json(minifigure)
})

// Rotas para colecao
app.post('/colecao', (req, res) => {
    inserirColecao(req.body)
    res.json({
        "statusCode": 200
    })    
})

app.get('/colecoes', async (req, res) => {
    let colecoes = await buscarColecoes()
    res.json(colecoes)
})

app.delete('/colecao', async (req, res) => {
    let colecao = await apagarColecao(req.body.id)
    res.json(colecao)
})

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})