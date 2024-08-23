window.addEventListener("load", renderMinifigure)

function renderMinifigure() {
    let minifigureData = JSON.parse(localStorage.getItem("minifiguresList"))
    
    minifigureData.forEach((minifigure) =>{
         
        const minifigureList = document.querySelector("#minifigures_list")

        const newMinifigure = document.createElement("div")
        newMinifigure.className = "minifigure"

        const imageMinifigure = document.createElement("img")

        imageMinifigure.setAttribute("src", minifigure.url)        
        
        const nomeMinifigure = document.createElement("h2")
        nomeMinifigure.innerText = minifigure.nome

        const colecaoMinifigure = document.createElement("p")
        colecaoMinifigure.innerText = minifigure.colecao

        newMinifigure.appendChild(imageMinifigure)
        newMinifigure.appendChild(nomeMinifigure)
        newMinifigure.appendChild(colecaoMinifigure)

        minifigureList.appendChild(newMinifigure)
    })
}
