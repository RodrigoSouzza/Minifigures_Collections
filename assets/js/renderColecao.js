window.addEventListener("load", renderColecao)

function renderColecao() {
    let colecaoData = JSON.parse(localStorage.getItem("colecaoList"))
    
    colecaoData.forEach((colecao) =>{
         
        const colecaoList = document.querySelector("#colecao_list")

        const newColecao = document.createElement("div")
        newColecao.className = "colecao"

        const imageColecao = document.createElement("img")
        imageColecao.setAttribute("src", colecao.url)        
        
        const nomeColecao = document.createElement("h2")
        nomeColecao.innerText = colecao.nome

        newColecao.appendChild(imageColecao)
        newColecao.appendChild(nomeColecao)

        colecaoList.appendChild(newColecao) 
    })
}