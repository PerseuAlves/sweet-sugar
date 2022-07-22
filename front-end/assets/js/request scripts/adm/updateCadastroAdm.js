const id = 1;
const nomeAdm = document.querySelector('#nome');
const sobrenomeAdm = document.querySelector('#sobrenome');
const emailAdm = document.querySelector('#email');
const senhaAdm = document.querySelector('#senha');
const confSenhaAdm = document.querySelector('#confSenha');
const telefoneAdm = document.querySelector('#telefone');
const cepAdm = document.querySelector('#cep');
const numAdm = document.querySelector('#num');
const logradouroAdm = document.querySelector('#logradouro');
const bairroAdm = document.querySelector('#bairro');
const cidadeAdm = document.querySelector('#cidade');
const complementoAdm = document.querySelector('#complemento');
const btnAtualizar = document.querySelector('#btnAtualizar');
const btnDeslogar = document.querySelector('#btnDeslogar');

var token = '';
var email = '';

if(emailAdm, senhaAdm, confSenhaAdm, telefoneAdm, cepAdm, numAdm, logradouroAdm, bairroAdm, cidadeAdm, complementoAdm, btnAtualizar) {
    addEvents();
}

async function addEvents() {
    try {
        if(sessionStorage.getItem('IsSessionStorageUsed').includes('true')) {
            try {
                if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('true')) {
                    window.location.href = "indexAdmin.html";
                } else if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('false')) {
                    token = sessionStorage.getItem('TokenLogin');
                    email = sessionStorage.getItem('EmailLogin');
    
                    try {
                        /* GET request */
                        let responseUsuario = await fetch('http://localhost:8080/LojaDeDoces/api/adm/1', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            }
                        });
                
                        let commit = await responseUsuario.json(); // lê o corpo da resposta e converte para o formato JSON
                
                        nomeAdm.value = commit.nome;
                        sobrenomeAdm.value = commit.sobrenome;
                        emailAdm.value = commit.email;
                        senhaAdm.value = '';
                        telefoneAdm.value = commit.telefone;
                        cepAdm.value = commit.cep;
                        numAdm.value = commit.numero;
                        logradouroAdm.value = commit.logradouro;
                        bairroAdm.value = commit.bairro;
                        cidadeAdm.value = commit.cidade;
                        complementoAdm.value = commit.complemento;
                    } catch (e) {
                        alert(e.message);
                    }
                }
            } catch (e) {
        
            }
        } else {
            window.location.href = "login.html";
        }
    } catch (e) {
        window.location.href = "login.html";
    }

    /* btnAtualizar */
    btnAtualizar.addEventListener('click', function() {
        btnAtualizarRequest();
    });

    /* btnDeslogar */
    btnDeslogar.addEventListener('click', function() {
        btnDeslogarRequest();
    });
}

/* btnAtualizar request */
async function btnAtualizarRequest() {
    try {
        if(confSenhaAdm.value == senhaAdm.value) {
            // cria os atributos e valores do arquivo JSON a ser enviado
            let adm = {
                id: id,
                nome: nomeAdm.value,
                sobrenome: sobrenomeAdm.value,
                email: emailAdm.value,
                senha: senhaAdm.value,
                telefone: telefoneAdm.value,
                cep: cepAdm.value,
                logradouro: logradouroAdm.value,
                numero: numAdm.value,
                bairro: bairroAdm.value,
                cidade: cidadeAdm.value,
                complemento: complementoAdm.value
            };

            // cria o request do tipo PUT informando os headers e os dados do body convertidos para JSON
            let response = await fetch('http://localhost:8080/LojaDeDoces/api/adm', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(adm)
            });

            let responseToJSON = await response.json(); // lê o corpo da resposta e converte para o formato JSON

            alert(responseToJSON.message);
        } else {
            alert('O campo "Senha" está em conflito com o campo "Confirmar Senha"');
        }
    } catch (e) {
        alert(e.message);
    }
}

/* btnDeslogar request */
async function btnDeslogarRequest() {
    try {
        sessionStorage.clear();
        window.location.href = "index.html";
    } catch (e) {
        alert(e.message);
    }
}
