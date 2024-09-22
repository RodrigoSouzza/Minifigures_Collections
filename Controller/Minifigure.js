import { openDb } from "../configDB.js"

export async function createTableMinifigure() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Minifigure (id INTEGER PRIMARY KEY, nome TEXT, url TEXT, colecao INTEGER, status TEXT)')
    })
}

export async function buscarMinifigures() {
    return openDb().then(db => {
        return db.all('SELECT M.id, M.nome, M.url, M.colecao, M.status, C.nome as colecao_nome FROM Minifigure M INNER JOIN Colecao C ON M.colecao = C.id')
        .then(res => res)
    })
}

export async function buscarMinifiguresColecao(id_colecao) {
    return openDb().then(db => {
        return db.all('SELECT M.nome, M.url, M.colecao, M.status, C.nome as colecao_nome FROM Minifigure M INNER JOIN Colecao C ON M.colecao = C.id WHERE M.colecao = ?', [id_colecao])
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

// SELECT C.nome FROM minifigures inner join Colecao on M.colecao_id = C.id;
 
export async function apagarMinifigure(id) {
    return openDb().then(db => {
        return db.all('DELETE FROM Minifigure WHERE id=?', [id])
        .then(res => res)
    })
}