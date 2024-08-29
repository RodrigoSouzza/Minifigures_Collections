window.addEventListener("load", () => {
    minifigureData = JSON.parse(localStorage.getItem("minifiguresList")) || []
    renderMinifigure()
})

function excluirMinifigure(index) {
    minifigureData.splice(index, 1)

    localStorage.setItem("minifiguresList", JSON.stringify(minifigureData))

    renderMinifigure()
}

function renderMinifigure() {    
    const minifigureList = document.querySelector("#minifigures_list")
    minifigureList.innerHTML = "" 
    
    const fragment = document.createDocumentFragment()

    minifigureData.forEach((minifigure, index) =>{       

        const newMinifigure = criarMinifigureElelemt(minifigure, index)
        fragment.appendChild(newMinifigure)        
    })
    minifigureList.appendChild(fragment)
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
    excluir.addEventListener("click", () => excluirMinifigure(index))

    newMinifigure.append(imageMinifigure, nomeMinifigure, colecaoMinifigure, statusMinifigure, excluir)
    
    return newMinifigure
}

function excluirMinifigure(index) {
    if (confirm("Você tem certeza que deseja excluir essa minifigura?")) {
        minifigureData.splice(index, 1);
        localStorage.setItem("minifiguresList", JSON.stringify(minifigureData));
        renderMinifigure();
    }
}





