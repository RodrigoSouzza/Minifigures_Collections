function renderMinifigures() {
    fetch('http://localhost:3000/minifigures')
    .then(response => response.json())
    .then(data => {
        const minifigureList = document.getElementById('minifigures_list');
        minifigureList.innerHTML = ""; // Limpa a lista de minifiguras antes de adicionar novas
        if (data.length === 0) {
            minifigureList.innerHTML = "<p>Nenhuma minifigure encontrada</p>";
        } else {
            data.forEach(minifigure => {
                const card = criarMinifigureElelemt(minifigure);
                minifigureList.appendChild(card);
            });
        }
    })
    .catch(error => {
        console.error('Erro ao buscar minifiguras:', error);
    });
} 

function criarMinifigureElelemt(minifigure, index) {
    const newMinifigure = document.createElement("div")
    newMinifigure.className = "minifigure"

    const imageMinifigure = document.createElement("img")
    imageMinifigure.setAttribute("src", minifigure.url)

    const nomeMinifigure = document.createElement("h2")
    nomeMinifigure.innerText = minifigure.nome

    const colecaoMinifigure = document.createElement("p")
    colecaoMinifigure.innerText = minifigure.colecao

    const statusMinifigure = document.createElement("span")
    statusMinifigure.className = minifigure.status === "ja-tenho" ? "situacao-comprado" : "situacao"
    statusMinifigure.innerText = minifigure.status === "ja-tenho" ? "já tenho" : "não tenho"

    const excluir = document.createElement("button")
    excluir.setAttribute("id", "excluir")
    excluir.innerText = "excluir"
    excluir.addEventListener("click", () => excluirMinifigure(minifigure.id))

    newMinifigure.append(imageMinifigure, nomeMinifigure, colecaoMinifigure, statusMinifigure, excluir)
    
    return newMinifigure
}

function excluirMinifigure(index) {
    if (confirm("Você tem certeza que deseja excluir essa minifigura?")) {
        fetch('http://localhost:3000/minifigure', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:index}),
        })
        .then(response => renderMinifigures())    
        .catch(error => {
        console.error('Erro ao apagar minifigure: ', error)
        })
    }
}

// Chamar a função ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderMinifigures();
});