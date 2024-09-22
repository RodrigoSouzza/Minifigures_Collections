window.addEventListener("load", renderColecao)

// funcao que cria o elemento que e utilizado na criacao da colecao e da minifigure
function criarElemento(tag, className, innerText, attributes = {}) {    
    const elemento = document.createElement(tag)
    if(className) elemento.className = className
    if(innerText) elemento.innerText = innerText

    Object.keys(attributes).forEach(attr => elemento.setAttribute(attr, attributes[attr]))
    return elemento
}

// funcao que renderiza colecao
function renderColecao(){    
    fetch('http://localhost:3000/colecoes')
    .then(response => response.json())
    .then(data => {
        const colecaoList = document.getElementById('colecao_list');
        colecaoList.innerHTML = ""

        if (data.length === 0) {
            colecaoList.innerHTML = "<p>Nenhuma coleção encontrada</p>";
        } else {
            data.forEach(colecao => {
                const card = criarColecaoElement(colecao);
                colecaoList.appendChild(card);                
            });
        }        
    })
}   

// funcao que cria o elemento da colecao
function criarColecaoElement(colecao) { 
    const newColecao = criarElemento("div", "colecao", null, {id: colecao.nome})
    const imageColecao = criarElemento("img", null, null, {src: colecao.url })
    const nomeColecao = criarElemento("h2", null, colecao.nome)

    const mostrarMinifigures = criarElemento("button", null, "mostrar", {id: "mostrarMinifigures"})
    mostrarMinifigures.addEventListener("click", () => exibirColecao(colecao))

    const excluir = criarElemento("button", null, "excluir", {id: "excluir"})
    excluir.addEventListener("click", () => excluirColecao(colecao.id))
    
    newColecao.append(imageColecao, nomeColecao, mostrarMinifigures, excluir)

    return newColecao
}

// funcao que exibe a colecao dentro do modal
function exibirColecao(colecao) {    
   
    fetch(`http://localhost:3000/minifigures-colecao?colecao=${colecao.id}`)
    .then(response => response.json())
    .then(minifigures => {
        const conteudoModal = document.querySelector(".conteudo")
        conteudoModal.innerHTML = ""

        minifigures.forEach(minifigure => {
            const newMinifigure = criarElemento("div", "minifigure")
            const imageMinifigure = criarElemento("img", null, null, { src: minifigure.url })
            const nomeMinifigure = criarElemento("h2", null, minifigure.nome)
            const colecaoMinifigure = criarElemento("p", null, minifigure.colecao_nome);
            const statusClass = minifigure.status === "ja-tenho" ? "situacao-comprado" : "situacao"
            const statusMinifigure = criarElemento("span", statusClass, minifigure.status === "ja-tenho" ? "já tenho" : "não tenho")

            newMinifigure.append(imageMinifigure, nomeMinifigure, colecaoMinifigure, statusMinifigure)
            conteudoModal.appendChild(newMinifigure)
        })
        const btnVoltar = criarElemento("button", null, "Voltar", {id: "fecharModal"})
        btnVoltar.addEventListener("click", () => exibirModal())

        conteudoModal.appendChild(btnVoltar)
        exibirModal() 
    })          
}

// funcao que exibi modal alterando o style do display 
function exibirModal(){
    const modal = document.querySelector(".janela-modal")
    modal.style.display = modal.style.display === "block" ? "none" : "block"
}

// funcao que exclui a colecao 
function excluirColecao(index) {
    if (confirm("Você tem certeza que deseja excluir essa coleção?")) {
        fetch('http://localhost:3000/colecao', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id:index})
        })
        .then(response => {
            if(response.ok){
                renderColecao()
            } else {
                console.error("Erro ao apagar coleção")
            }
        })
        .catch(error => {
            console.error("Erro ao apagar coleção: ", error)
        })
    }
}

