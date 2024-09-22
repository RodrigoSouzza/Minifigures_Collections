// campos minifigure
const urlImagem = document.getElementById("imagemFigure")
const nomeMinifigure = document.getElementById("nameFigure")
const colecao = document.getElementById("colecao")
const situacao = document.getElementById("status")

// campos colecao
const urlImagemColecao = document.getElementById("imagemColecao")
const nomeColecao = document.getElementById("nameColecao")

// botões
const formCriarFigure = document.getElementById("formMiniFigure")
const formCriarColecao = document.getElementById("formColecao")

//funcao para atualizar colecao
function atualizarListaColecao() {
    fetch('http://localhost:3000/colecoes')
    .then(response => response.json())
    .then(data => {
        const colecao = document.getElementById('colecao')
        colecao.innerHTML = ""

        if (data.length === 0) {
            const option = document.createElement("option")
            option.value = ""
            option.innerText = "Nenhuma coleção disponível"
            colecao.appendChild(option)          
        } else {
            data.forEach(colecaoItem => {
                const option = document.createElement("option")
                option.value = colecaoItem.id
                option.innerText = colecaoItem.nome
                colecao.appendChild(option)
            })
        }
    })
    .catch(error => {
        console.error('Erro ao buscar coleções:', error);
    });
}

// funcao para criar minifigure
function criarMinifigure(event){    
    event.preventDefault()
    
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

//funcao para salvar minifigure
function salvarMinifigure(minifigure){
    fetch('http://localhost:3000/minifigure', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(minifigure),
    })
    .then(response => response.json())    
    .catch(error => {
        console.error('Erro ao salvar minifigure: ', error)
    })
}

// funcao para criar colecao
function criarColecao(event){
    event.preventDefault()
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

//funcao para salvar colecao
function salvarColecao(colecao){
    fetch('http://localhost:3000/colecao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(colecao),
    })
    .then(response => {
        atualizarListaColecao();
    })
    .catch(error => {
        console.error('Erro ao salvar coleção:', error);
    });
}

// EVENTOS
formCriarFigure.addEventListener("submit", criarMinifigure)
formCriarColecao.addEventListener("submit", criarColecao)

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarListaColecao();
});

