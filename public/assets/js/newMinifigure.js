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

// dados do local Storage
let minifiguresList = JSON.parse(localStorage.getItem("minifiguresList")) || []
let colecaoList = JSON.parse(localStorage.getItem("colecaoList")) || []

// FUNÇÕES

//funcao para atualizar colecao
function atualizarListaColecao() {
    fetch('http://localhost:3000/colecoes')
    .then(response => response.json())
    .then(data => {
        const colecao = document.getElementById('colecao'); // Verifique se este é o ID correto
        colecao.innerHTML = ""; // Limpa a lista de coleções antes de adicionar novas

        if (data.data.length === 0) {
            colecao.innerHTML = "<option>Nenhuma coleção disponível</option>";
        } else {
            data.data.forEach(colecaoItem => {
                const option = document.createElement("option");
                option.value = colecaoItem.nome;
                option.innerText = colecaoItem.nome;
                colecao.appendChild(option);
            });
        }
    })
    .catch(error => {
        console.error('Erro ao buscar coleções:', error);
    });
}


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
    fetch('http://localhost:3000/minifigures', {
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
    fetch('http://localhost:3000/colecoes', {
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

// Chamar a função ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarListaColecao();
});

