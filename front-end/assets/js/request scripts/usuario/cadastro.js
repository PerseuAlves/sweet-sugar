const nomeUsuario = document.querySelector('#nome');
const sobrenomeUsuario = document.querySelector('#sobrenome');
const emailUsuario = document.querySelector('#email');
const senhaUsuario = document.querySelector('#senha');
const confSenhaUsuario = document.querySelector('#confSenha');
const telefoneUsuario = document.querySelector('#telefone');
const cepUsuario = document.querySelector('#cep');
const numUsuario = document.querySelector('#num');
const logradouroUsuario = document.querySelector('#logradouro');
const bairroUsuario = document.querySelector('#bairro');
const cidadeUsuario = document.querySelector('#cidade');
const complementoUsuario = document.querySelector('#complemento');
const btnCadastrar = document.querySelector('#btnCadastrar');

if(emailUsuario, senhaUsuario, confSenhaUsuario, telefoneUsuario, cepUsuario, numUsuario, logradouroUsuario, bairroUsuario, cidadeUsuario, complementoUsuario, btnCadastrar) {
    addEvents();
}

async function addEvents() {

    /* btnCadastrar */
    btnCadastrar.addEventListener('click', function() {
        btnCadastrarRequest();
    });
}

/* btnCadastrar request */
async function btnCadastrarRequest() {
    try {
        if(confSenhaUsuario.value == senhaUsuario.value) {

            /* GET usuario */
            let idRadom = Math.floor(Math.random() * 1000000) + 1;

            url = 'http://localhost:8080/LojaDeDoces/api/usuario/' + idRadom;
            let responseGetUsuario = await fetch(url);

            while(responseGetUsuario.toString.length != 0) {
                idRadom = Math.floor(Math.random() * 1000000) + 1;

                url = 'http://localhost:8080/LojaDeDoces/api/usuario/' + idRadom;
                responseGetUsuario = await fetch(url);
            }

            // cria os atributos e valores do arquivo JSON a ser enviado
            let usuario = {
                id: idRadom,
                nome: nomeUsuario.value,
                sobrenome: sobrenomeUsuario.value,
                email: emailUsuario.value,
                senha: senhaUsuario.value
            };

            // cria o request do tipo POST informando os headers e os dados do body convertidos para JSON
            let responseUsuario = await fetch('http://localhost:8080/LojaDeDoces/api/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });

            let responseToJSONUsuario = await responseUsuario.json(); // lê o corpo da resposta e converte para o formato JSON

            alert(responseToJSONUsuario.message);

            if(responseToJSONUsuario.message.includes('sucesso')) {

                let telefone = {
                    numero: telefoneUsuario.value,
                    usuario: {
                        id: idRadom,
                        nome: nomeUsuario.value,
                        sobrenome: sobrenomeUsuario.value,
                        email: emailUsuario.value
                    }
                };

                // cria o request do tipo POST informando os headers e os dados do body convertidos para JSON
                let responseTelefone = await fetch('http://localhost:8080/LojaDeDoces/api/telefone', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(telefone)
                });

                let responseToJSONTelefone = await responseTelefone.json(); // lê o corpo da resposta e converte para o formato JSON

                alert(responseToJSONTelefone.message);

                let endereco = {
                    enderecoId: {
                        cep: cepUsuario.value,
                        logradouro: logradouroUsuario.value,
                        numero: numUsuario.value,
                        bairro: bairroUsuario.value,
                        cidade: cidadeUsuario.value
                    },
                    complemento: complementoUsuario.value,
                    usuario: {
                        id: idRadom,
                        nome: nomeUsuario.value,
                        sobrenome: sobrenomeUsuario.value,
                        email: emailUsuario.value
                    }
                };

                // cria o request do tipo POST informando os headers e os dados do body convertidos para JSON
                let responseEndereco = await fetch('http://localhost:8080/LojaDeDoces/api/endereco', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(endereco)
                });

                let responseToJSONEndereco = await responseEndereco.json(); // lê o corpo da resposta e converte para o formato JSON

                alert(responseToJSONEndereco.message);

                window.location.href = "index.html";
            }
        } else {
            alert('O campo "Senha" está em conflito com o campo "Confirmar Senha"');
        }
    } catch (e) {
        alert(e.message);
    }
}

