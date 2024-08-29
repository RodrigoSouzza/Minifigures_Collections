// campos minifigure
const urlImagem = document.getElementById("imagemFigure")
const nomeMinifigure = document.getElementById("nameFigure")
const colecao = document.getElementById("colecao")
const situacao = document.getElementById("status")

// campos colecao
const urlImagemColecao = document.getElementById("imagemColecao")
const nomeColecao = document.getElementById("nameColecao")

// botões
const btnCriarFigure = document.getElementById("criarMiniFigure")
const btnCriarColecao = document.getElementById("criarColecao")

// dados do local Storage
let minifiguresList = JSON.parse(localStorage.getItem("minifiguresList")) || []
let colecaoList = JSON.parse(localStorage.getItem("colecaoList")) || []

// FUNÇÕES
function atualizarListaColecao(){
    colecao.innerHTML = ""
    colecaoList.forEach(colecaoItem => {
        const option = document.createElement("option")
        option.value = colecaoItem.nome
        option.innerText = colecaoItem.nome
        colecao.appendChild(option)
    })
}


function criarMinifigure(){    
    if(!urlImagem.value || !nomeMinifigure.value || !colecao.value){
        alert("É necessário preencher todos os campos!")
        return
    }
    const minifigure = {
        url: urlImagem.value,
        nome: nomeMinifigure.value,
        colecao: colecao.value,
        status: situacao.value
    }
    salvarMinifigure(minifigure)    
    alert("Minifigure criada com sucesso!")
}

function salvarMinifigure(minifigure){
    minifiguresList.push(minifigure)
    localStorage.setItem("minifiguresList", JSON.stringify(minifiguresList))
}

function addColecao(){    
    if(!urlImagemColecao.value || !nomeColecao.value){
        alert("É necessário preencher todos os campos!")
        return
    }
    const novaColecao = {
        url: urlImagemColecao.value,
        nome: nomeColecao.value,
    } 
    
    salvarColecao(novaColecao)
    atualizarListaColecao()   
    alert("Coleção criado com sucesso!")    
}

function salvarColecao(colecao){
    colecaoList.push(colecao)
    localStorage.setItem("colecaoList", JSON.stringify(colecaoList))
}

// EVENTOS
btnCriarFigure.addEventListener("click", criarMinifigure)
btnCriarColecao.addEventListener("click", addColecao)


// inicializa a lista de coleções na página
atualizarListaColecao()


