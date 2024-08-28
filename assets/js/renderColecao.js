window.addEventListener("load", renderColecao)

let colecaoData = JSON.parse(localStorage.getItem("colecaoList"))
let minifiguresList = JSON.parse(localStorage.getItem("minifiguresList")) || []

function renderColecao() {    
    
    const colecaoList = document.querySelector("#colecao_list")    
    
    colecaoData.forEach(colecao => {  
        
        const newColecao = document.createElement("div")
        newColecao.className = "colecao"
        newColecao.id = colecao.nome
        
        const imageColecao = document.createElement("img")
        imageColecao.setAttribute("src", colecao.url)        
        
        const nomeColecao = document.createElement("h2")
        nomeColecao.innerText = colecao.nome  
        
        const quantidadeMinifigures = minifiguresList.filter(minifigure => minifigure.colecao === colecao.nome).length

        const quantidade = document.createElement("p")
        quantidade.innerText = `${quantidadeMinifigures} minifigures`        

        const mostrarMinifigures = document.createElement("button")
        mostrarMinifigures.setAttribute("id", "mostrarMinifigures")
        mostrarMinifigures.innerText = "mostrar"
        mostrarMinifigures.addEventListener("click", exibirColecao)

        newColecao.append(imageColecao, nomeColecao, quantidade, mostrarMinifigures)
        colecaoList.appendChild(newColecao)         
    })
}

const btnFechar = document.getElementById("fecharModal")

function exibirColecao(event) {
    
    const conteudoModal = document.querySelector(".conteudo")
    conteudoModal.innerHTML = " " 

    minifiguresList.forEach(minifigure => {
        if(minifigure.colecao == event.target.parentElement.id){          
           
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
            conteudoModal.appendChild(newMinifigure)
        }
    })
    const btnVoltar = document.createElement("button")
    btnVoltar.setAttribute("id", "fecharModal")
    btnVoltar.innerText = "Voltar"
    btnVoltar.addEventListener("click", exibirModal)

    conteudoModal.appendChild(btnVoltar)

    exibirModal()
}

function exibirModal(){
    const modal = document.querySelector(".janela-modal")
    const estiloAtual = modal.style.display
    if(estiloAtual == "block"){
        modal.style.display = "none"
    }else{
        modal.style.display = "block"
    }
}

btnFechar.addEventListener("click", exibirColecao)










       



     
