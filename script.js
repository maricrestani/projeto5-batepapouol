let nome;
let novoNome;
let lista;
let chat;

function entrarNaSala() {

    nome = prompt("Qual é o seu nome?")

    novoNome = {
        name: nome
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', novoNome);

    promessa.then(pegarDadosChat);
    promessa.catch(pedirNovoNome);
}

function pedirNovoNome(erro) {
    if (erro.response.status === 400) {
        alert("Esse nome de usuário já existe, por favor, digite outro");
        entrarNaSala()
    }
}


function verificarStatus() {

    const novoNome = {
        name: nome
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', novoNome);

    promessa.then(statusAtualizou);
    //promessa.catch(deuErro);
}


function statusAtualizou() {
    console.log("status atualizado");
}


function pegarDadosChat(resposta) {

    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

    promessa.then(renderizarChat);
    promessa.catch(deuErro);
}


function renderizarChat(resposta) {

    chat = resposta.data;

    lista = document.querySelector(".mensagens");

    lista.innerHTML = "";

    for (let i = 0; i < chat.length; i++) {

        if (chat[i].type === "status") {
            lista.innerHTML +=
                `
              <li> <div class="mensagem ${chat[i].type}"> <span class="time">(${chat[i].time})</span> <span class="names">${chat[i].from}</span> ${chat[i].text} </div></li>
          `;
        } else if (chat[i].type === "message") {
            lista.innerHTML +=
                `
        <li> <div class="mensagem ${chat[i].type}"> <span class="time">(${chat[i].time})</span> <span class="names">${chat[i].from}</span> para <span class="names">${chat[i].to}</span>: ${chat[i].text}</div></li>
    `;
        } else if (chat[i].type === "private_message") {
            lista.innerHTML +=
                `
        <li> <div class="mensagem ${chat[i].type}"> <span class="time">(${chat[i].time})</span> <span class="names">${chat[i].from}</span> reservadamente para <span class="names">${chat[i].to}</span>: ${chat[i].text}</div></li>
    `;
        }
    }

    let mensagemMaisRecente = document.querySelector(".mensagens").lastElementChild;
    mensagemMaisRecente.scrollIntoView();
}

function atualizarChat() {
    pegarDadosChat();
    console.log("chat atualizou");
}


function enviarMensagem() {

    let mensagemEscrita = document.querySelector(".escreva");

    const msg = {
        from: nome,
        to: "Todos",
        text: mensagemEscrita.value,
        type: "message"
    }

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', msg);

    promessa.then(pegarDadosChat);
    promessa.catch(deuErro);
}

function deuErro(erro) {
    if (erro.response.status === 400) {
        window.location.reload();
    }
}

entrarNaSala()
setInterval(verificarStatus, 5000);
setInterval(atualizarChat, 3000);
