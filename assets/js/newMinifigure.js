const btnCriarFigure = document.querySelector("#criarMiniFigure")
const btnCriarColecao = document.querySelector("#criarColecao")

// FUNÇÕES
function addMinifigure(){
    const urlImagem = document.querySelector("#imagemFigure").value.trim()
    const nomeMinifigure = document.querySelector("#nameFigure").value.trim()
    const nomeColecao = document.querySelector("#colecaoFigure").value.trim()
    const situacao = document.querySelector("#status").value.trim()
    
    if(!urlImagem || !nomeMinifigure || !nomeColecao){
        alert("É necessário preencher todos os campos!")
        return
    }

    const minifigure = {
        url: urlImagem,
        nome: nomeMinifigure,
        colecao: nomeColecao,
        status: situacao
    }

    let minifiguresList = JSON.parse(localStorage.getItem("minifiguresList")) || []
    minifiguresList.push(minifigure)
    localStorage.setItem("minifiguresList", JSON.stringify(minifiguresList))  
    
    alert("Minifigure criada com sucesso!")
}

function addColecao(){
    const urlImagemColecao = document.querySelector("#imagemColecao").value.trim()
    const nomeColecao = document.querySelector("#nameColecao").value.trim()
    
    if(!urlImagemColecao || !nomeColecao){
        alert("É necessário preencher todos os campos!")
        return
    }

    const colecao = {
        url: urlImagemColecao,
        nome: nomeColecao
    }

    let colecaoList = JSON.parse(localStorage.getItem("colecaoList")) || []
    colecaoList.push(colecao)
    localStorage.setItem("colecaoList", JSON.stringify(colecaoList))

    alert("Coleção criado com sucesso!")
}

// EVENTOS
btnCriarFigure.addEventListener("click", addMinifigure)
btnCriarColecao.addEventListener("click", addColecao)



