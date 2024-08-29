window.addEventListener("load", renderColecao)

const colecaoData = JSON.parse(localStorage.getItem("colecaoList"))
const minifiguresList = JSON.parse(localStorage.getItem("minifiguresList")) || [] 

function criarElemento(tag, className, innerText, attributes = {}) {    
    const elemento = document.createElement(tag)
    if(className) elemento.className = className
    if(innerText) elemento.innerText = innerText

    Object.keys(attributes).forEach(attr => elemento.setAttribute(attr, attributes[attr]))
    return elemento
}

function renderColecao(){    
    const colecaoList = document.querySelector("#colecao_list")
    colecaoList.innerHTML = "" 
    colecaoData.forEach((colecao, index) => {  
        const newColecao = criarElemento("div", "colecao", null, {id: colecao.nome})
        const imageColecao = criarElemento("img", null, null, {src: colecao.url })
        const nomeColecao = criarElemento("h2", null, colecao.nome)
        const quantidadeMinifigures = minifiguresList.filter(minifigure => minifigure.colecao === colecao.nome).length
        const quantidade = criarElemento("p", null, `${quantidadeMinifigures} minifigures`)
        const mostrarMinifigures = criarElemento("button", null, "mostrar", {id: "mostrarMinifigures"})
        mostrarMinifigures.addEventListener("click", exibirColecao)
        
        const excluir = criarElemento("button", null, "excluir", {id: "excluir"})
        excluir.addEventListener("click", () => excluirColecao(index))
        
        newColecao.append(imageColecao, nomeColecao, quantidade, mostrarMinifigures, excluir)
        colecaoList.appendChild(newColecao)         
    })
}   

function exibirColecao(event) {    
    const conteudoModal = document.querySelector(".conteudo")
    conteudoModal.innerHTML = " " 

    minifiguresList.forEach(minifigure => {
        if(minifigure.colecao == event.target.parentElement.id){          
           
           const newMinifigure = criarElemento("div", "minifigure")
           const imageMinifigure = criarElemento("img", null, null, {src: minifigure.url})
           const nomeMinifigure = criarElemento("h2", null, minifigure.nome)
           const colecaoMinifigure = criarElemento("p", null, minifigure.colecao)
           
           const statusClass = minifigure.status === "ja-tenho" ? "situacao-comprado" : "situacao"
           const statusMinifigure = criarElemento("span", statusClass, minifigure.status === "ja-tenho" ? "ja tenho" : "nao tenho") 
            
            newMinifigure.append(imageMinifigure, nomeMinifigure, colecaoMinifigure, statusMinifigure)
            conteudoModal.appendChild(newMinifigure)
        }
    })

    const btnVoltar = criarElemento("button", null, "Voltar", {id: "fecharModal"})
    btnVoltar.addEventListener("click", exibirModal)

    conteudoModal.appendChild(btnVoltar)

    exibirModal()
}

function exibirModal(){
    const modal = document.querySelector(".janela-modal")
    modal.style.display = modal.style.display === "block" ? "none" : "block"
}

function excluirColecao(index) {    
    colecaoData.splice(index, 1)
    localStorage.setItem("colecaoList", JSON.stringify(colecaoData))

    renderColecao()
}    

