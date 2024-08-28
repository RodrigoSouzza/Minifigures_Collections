window.addEventListener("load", renderMinifigure)

let minifigureData = JSON.parse(localStorage.getItem("minifiguresList"))

function renderMinifigure() {
    
    const minifigureList = document.querySelector("#minifigures_list")
    minifigureList.innerHTML = "" 
    
    minifigureData.forEach((minifigure, index) =>{       

        const newMinifigure = document.createElement("div")
        newMinifigure.className = "minifigure"

        const imageMinifigure = document.createElement("img")
        imageMinifigure.setAttribute("src", minifigure.url)        
        
        const nomeMinifigure = document.createElement("h2")
        nomeMinifigure.innerText = minifigure.nome

        const colecaoMinifigure = document.createElement("p")
        colecaoMinifigure.innerText = minifigure.colecao

        const statusMinifigure = document.createElement("span")
        if(minifigure.status == "ja-tenho"){
            statusMinifigure.className = "situacao-comprado"
            statusMinifigure.innerText = "já tenho"
        }else {
            statusMinifigure.className = "situacao"
            statusMinifigure.innerText = "não tenho"
        }

        const excluir = document.createElement("button")
        excluir.setAttribute("id", "excluir")
        excluir.innerText = "excluir"
        excluir.addEventListener("click", () => excluirMinifigure(index))
        
        newMinifigure.append(imageMinifigure, nomeMinifigure, colecaoMinifigure, statusMinifigure, excluir)
        minifigureList.appendChild(newMinifigure)
    })
}  

function excluirMinifigure(index) {
    minifigureData.splice(index, 1)

    localStorage.setItem("minifiguresList", JSON.stringify(minifigureData))

    renderMinifigure()
}

