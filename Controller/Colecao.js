import { openDb } from "../configDB.js"

// cria a tabela colecao no banco de dados
export async function createTableColecao() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Colecao (id INTEGER PRIMARY KEY, nome TEXT, url TEXT)')
    })
}

// funcao que busca as tabelas no banco de dados
export async function buscarColecoes() {
    return openDb().then(db => {
        return db.all('SELECT * FROM Colecao')
        .then(res => res)
    })
}

// funcao que cria novas colecoes 
export async function inserirColecao(colecao) {
    openDb().then(db => {
        db.run('INSERT INTO Colecao (nome, url) VALUES (?, ?)', [colecao.nome, colecao.url])
    })
}

// funcao que apaga a colecao 
export async function apagarColecao(id) {
    return openDb().then(db => {
        return db.all('DELETE FROM Colecao WHERE id=?', [id])
        .then(res => res)
    })
}