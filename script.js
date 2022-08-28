let nome;

function entrarNaSala() {

    nome = prompt("Qual é o seu nome?")

    const novoNome = {
        name: nome
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', novoNome);

    promessa.then(deuCerto);
    promessa.catch(pedirNovoNome);

}

function pedirNovoNome(erro) {
    while (erro.response.status === 400) {
        alert("Esse nome de usuário já existe, por favor, digite outro");
        entrarNaSala()
    }
}

function deuCerto(resposta) {
    alert("axios post funcionou");
    console.log(resposta.data);
}

entrarNaSala()

