import { openDb } from "../configDB.js"

export async function createTableMinifigure() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Minifigure (id INTEGER PRIMARY KEY, nome TEXT, url TEXT, colecao TEXT, status TEXT)')
    })
}

export async function buscarMinifigures() {
    return openDb().then(db => {
        return db.all('SELECT * FROM Minifigure')
        .then(res => res)
    })
}

export async function buscarMinifigure(id) {
    return openDb().then(db => {
        return db.all('SELECT * FROM Minifigure WHERE id=?', [id])
        .then(res => res)
    })
}

export async function inserirMinifigure(minifigure) {
    openDb().then(db => {
        db.run('INSERT INTO Minifigure (nome, url, colecao, status) VALUES (?, ?, ?, ?)', [minifigure.nome, minifigure.url, minifigure.colecao, minifigure.status])
    })
}

export async function apagarMinifigure(id) {
    return openDb().then(db => {
        return db.all('DELETE FROM Minifigure WHERE id=?', [id])
        .then(res => res)
    })
}