const pesquisaInput = document.querySelector("#pesquisa")
const minifigureList = document.querySelector("#minifigures_list")
const btnBusca = document.getElementById("buscar")

function exibirBusca(){
    
    minifigureList.innerHTML = ""

    let minifigureData = JSON.parse(localStorage.getItem("minifiguresList"))
    
    minifigureData.forEach((minifigure) =>{

        if(pesquisaInput.value == minifigure.nome || pesquisaInput.value == minifigure.colecao) {            

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
        
            newMinifigure.append(imageMinifigure, nomeMinifigure, colecaoMinifigure, statusMinifigure)
            minifigureList.appendChild(newMinifigure)
        }       
    })    
}

btnBusca.addEventListener("click", exibirBusca)
