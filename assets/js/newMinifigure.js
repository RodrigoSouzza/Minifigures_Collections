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
    colecaoList.forEach(colecao => {
    let optionColecao = document.getElementById("colecao")
    const option = document.createElement("option")
    option.value = colecao.nome
    option.innerText = colecao.nome

    optionColecao.appendChild(option)
    })
}
atualizarListaColecao()

function criarMinifigure(){
    
    if(urlImagem.value == "" || nomeMinifigure.value == "" || colecao.value == ""){
        alert("É necessário preencher todos os campos!")
        return
    }
    const minifigure = {
        url: urlImagem.value,
        nome: nomeMinifigure.value,
        colecao: colecao.value,
        status: situacao.value
    }    
    minifiguresList.push(minifigure)
    localStorage.setItem("minifiguresList", JSON.stringify(minifiguresList)) 
    alert("Minifigure criada com sucesso!")
}

function addColecao(){    
    
    if(urlImagemColecao.value == "" || nomeColecao == ""){
        alert("É necessário preencher todos os campos!")
        return
    }
    const colecao = {
        url: urlImagemColecao.value,
        nome: nomeColecao.value,
    }    
    colecaoList.push(colecao)
    localStorage.setItem("colecaoList", JSON.stringify(colecaoList))
    alert("Coleção criado com sucesso!")    
}

// EVENTOS
btnCriarFigure.addEventListener("click", criarMinifigure)
btnCriarColecao.addEventListener("click", addColecao)



