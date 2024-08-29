const pesquisaInput = document.querySelector("#pesquisa");
const minifigureList = document.querySelector("#minifigures_list");
const btnBusca = document.getElementById("buscar");

function exibirBusca() {
    minifigureList.innerHTML = "";

    const minifigureData = JSON.parse(localStorage.getItem("minifiguresList")) || [];
    const pesquisaTermo = pesquisaInput.value.trim().toLowerCase();

    if (pesquisaTermo === "") {
        alert("Por favor, insira um termo para buscar.");
        return;
    }

    let resultadoEncontrado = false;

    minifigureData.forEach((minifigure) => {
        const nomeNormalizado = minifigure.nome.toLowerCase();
        const colecaoNormalizada = minifigure.colecao.toLowerCase();

        if (nomeNormalizado.includes(pesquisaTermo) || colecaoNormalizada.includes(pesquisaTermo)) {
            resultadoEncontrado = true;
            const newMinifigure = createMinifigureElement(minifigure);
            minifigureList.appendChild(newMinifigure);
        }
    });

    if (!resultadoEncontrado) {
        const noResult = document.createElement("p");
        noResult.innerText = "Nenhuma minifigura encontrada.";
        minifigureList.appendChild(noResult);
    }
}

function createMinifigureElement(minifigure) {
    const newMinifigure = document.createElement("div");
    newMinifigure.className = "minifigure";

    const imageMinifigure = document.createElement("img");
    imageMinifigure.setAttribute("src", minifigure.url);

    const nomeMinifigure = document.createElement("h2");
    nomeMinifigure.innerText = minifigure.nome;

    const colecaoMinifigure = document.createElement("p");
    colecaoMinifigure.innerText = minifigure.colecao;

    const statusMinifigure = document.createElement("span");
    statusMinifigure.className = minifigure.status === "ja-tenho" ? "situacao-comprado" : "situacao";
    statusMinifigure.innerText = minifigure.status === "ja-tenho" ? "já tenho" : "não tenho";

    newMinifigure.append(imageMinifigure, nomeMinifigure, colecaoMinifigure, statusMinifigure);
    return newMinifigure;
}

btnBusca.addEventListener("click", exibirBusca);
pesquisaInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        exibirBusca();
    }
});
