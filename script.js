// Função para preencher o select de estados em ordem alfabética
function preencherEstados() {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => response.json())
        .then(data => {
            const estadoSelect = document.getElementById('estado');
            data.sort((a, b) => a.nome.localeCompare(b.nome)); // Classifique os estados por nome
            data.forEach(estado => {
                const option = document.createElement('option');
                option.value = estado.sigla;
                option.textContent = estado.nome;
                estadoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao buscar estados: ' + error));
}

// Função para preencher o select de cidades com base no estado selecionado
function preencherCidades(estadoSelecionado) {
    const cidadeSelect = document.getElementById('cidade');
    cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>'; // Limpa o select de cidades

    if (estadoSelecionado) {
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.nome.localeCompare(b.nome)); // Classifique as cidades por nome
                data.forEach(cidade => {
                    const option = document.createElement('option');
                    option.value = cidade.id;
                    option.textContent = cidade.nome;
                    cidadeSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao buscar cidades: ' + error));
    }
}

// Event listener para preencher o select de cidades quando o estado é selecionado
document.getElementById('estado').addEventListener('change', function () {
    const estadoSelecionado = this.value;
    preencherCidades(estadoSelecionado);
});

// Inicializa o preenchimento dos estados
preencherEstados();

const darkModeButton = document.getElementById("dark-mode-button");

darkModeButton.addEventListener("click", () => {
    const body = document.body;
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        darkModeButton.textContent = "Modo Escuro";
    } else {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        darkModeButton.textContent = "Modo Claro";
    }
});
