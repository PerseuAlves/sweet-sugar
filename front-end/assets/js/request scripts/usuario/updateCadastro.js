const idUsuario = document.querySelector('#id');
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
const btnAtualizar = document.querySelector('#btnAtualizar');
const btnDeslogar = document.querySelector('#btnDeslogar');

const idUsuarioStorage = 0;
const nomeUsuarioStorage = '';
const sobrenomeUsuarioStorage = '';
const emailUsuarioStorage = '';
const senhaUsuarioStorage = '';
const telefoneUsuarioStorage = '';
const cepUsuarioStorage = '';
const logradouroUsuarioStorage = '';
const numUsuarioStorage = '';
const bairroUsuarioStorage = '';
const cidadeUsuarioStorage = '';
const complementoUsuarioStorage = '';

var token = '';
var email = '';

if(emailUsuario, senhaUsuario, confSenhaUsuario, telefoneUsuario, cepUsuario, numUsuario, logradouroUsuario, bairroUsuario, cidadeUsuario, complementoUsuario, btnAtualizar) {
    addEvents();
}

async function addEvents() {
    try {
        if(sessionStorage.getItem('IsSessionStorageUsed').includes('true')) {
            try {
                if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('true')) {
                    token = sessionStorage.getItem('TokenLogin');
                    email = sessionStorage.getItem('EmailLogin');
                    
                    /* GET request */
                    let responseUsuario = await fetch('http://localhost:8080/LojaDeDoces/api/usuario/email/' + email, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    });
            
                    let commitsUsuario = await responseUsuario.json(); // lê o corpo da resposta e converte para o formato JSON
            
                    let usuario = {
                        id: commitsUsuario.id,
                        nome: commitsUsuario.nome,
                        sobrenome: commitsUsuario.sobrenome,
                        email: commitsUsuario.email,
                        senha: commitsUsuario.senha
                    };
        
                    /* GET request */
                    let responseEndereco = await fetch('http://localhost:8080/LojaDeDoces/api/endereco/byUsuario/' + usuario.id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    });
            
                    let commitsEndereco = await responseEndereco.json(); // lê o corpo da resposta e converte para o formato JSON
        
                    let endereco = {
                        enderecoId: {
                            cep: commitsEndereco[0].enderecoId.cep,
                            logradouro: commitsEndereco[0].enderecoId.logradouro,
                            numero: commitsEndereco[0].enderecoId.numero,
                            bairro: commitsEndereco[0].enderecoId.bairro,
                            cidade: commitsEndereco[0].enderecoId.cidade
                        },
                        complemento: commitsEndereco[0].complemento,
                        usuario: {
                            id: commitsEndereco[0].usuario.id,
                            nome: commitsEndereco[0].usuario.nome,
                            sobrenome: commitsEndereco[0].usuario.sobrenome,
                            email: commitsEndereco[0].usuario.email
                        }
                    };
    
                    idUsuario.value = usuario.id;
                    nomeUsuario.value = usuario.nome;
                    sobrenomeUsuario.value = usuario.sobrenome;
                    emailUsuario.value = usuario.email;
                    senhaUsuario.value = '';
                    telefoneUsuario.value = '';
                    cepUsuario.value = endereco.enderecoId.cep;
                    logradouroUsuario.value = endereco.enderecoId.logradouro;
                    numUsuario.value = endereco.enderecoId.numero;
                    bairroUsuario.value = endereco.enderecoId.bairro;
                    cidadeUsuario.value = endereco.enderecoId.cidade;
                    complementoUsuario.value = endereco.complemento;
        
                } else if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('false')) {
                    window.location.href = "indexAdmin.html";
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
        if(confSenhaUsuario.value == senhaUsuario.value) {

            // cria os atributos e valores do arquivo JSON a ser enviado
            let usuario = {
                id: idUsuario.value,
                nome: nomeUsuario.value,
                sobrenome: sobrenomeUsuario.value,
                email: emailUsuario.value,
                senha: senhaUsuario.value
            };

            // cria o request do tipo PUT informando os headers e os dados do body convertidos para JSON
            let responseUsuario = await fetch('http://localhost:8080/LojaDeDoces/api/usuario', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(usuario)
            });

            let responseToJSONUsuario = await responseUsuario.json(); // lê o corpo da resposta e converte para o formato JSON

            alert(responseToJSONUsuario.message);

            if(responseToJSONUsuario.message.includes('sucesso')) {
                
                telefone = [
                    telefoneAntigo = {
                        numero: telefoneUsuario.value,
                        usuario: {
                            id: idUsuario.value,
                            nome: telefoneUsuarioStorage,
                            sobrenome: sobrenomeUsuario.value,
                            email: emailUsuario.value
                        }
                    },
                    telefoneNovo = {
                        numero: telefoneUsuario.value,
                        usuario: {
                            id: idUsuario.value,
                            nome: nomeUsuario.value,
                            sobrenome: sobrenomeUsuario.value,
                            email: emailUsuario.value
                        }
                    }
                ]

                // cria o request do tipo PUT informando os headers e os dados do body convertidos para JSON
                let responseTelefone = await fetch('http://localhost:8080/LojaDeDoces/api/telefone', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(telefone)
                });

                let responseToJSONTelefone = await responseTelefone.json(); // lê o corpo da resposta e converte para o formato JSON

                alert(responseToJSONTelefone.message);

                let endereco = [
                    enderecoAntigo = {
                        enderecoId: {
                            cep: cepUsuario.value,
                            logradouro: logradouroUsuario.value,
                            numero: numUsuario.value,
                            bairro: bairroUsuario.value,
                            cidade: cidadeUsuario.value
                        },
                        complemento: complementoUsuario.value,
                        usuario: {
                            id: idUsuario.value,
                            nome: nomeUsuario.value,
                            sobrenome: sobrenomeUsuario.value,
                            email: emailUsuario.value
                        }
                    },
                    enderecoNovo = {
                        enderecoId: {
                            cep: cepUsuario.value,
                            logradouro: logradouroUsuario.value,
                            numero: numUsuario.value,
                            bairro: bairroUsuario.value,
                            cidade: cidadeUsuario.value
                        },
                        complemento: complementoUsuario.value,
                        usuario: {
                            id: idUsuario.value,
                            nome: nomeUsuario.value,
                            sobrenome: sobrenomeUsuario.value,
                            email: emailUsuario.value
                        }
                    }
                ];

                // cria o request do tipo PUT informando os headers e os dados do body convertidos para JSON
                let responseEndereco = await fetch('http://localhost:8080/LojaDeDoces/api/endereco', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
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

/* btnDeslogar request */
async function btnDeslogarRequest() {
    try {
        sessionStorage.clear();
        window.location.href = "index.html";
    } catch (e) {
        alert(e.message);
    }
}
