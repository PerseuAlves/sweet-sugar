const content = document.querySelector('#content');
const textAreaAviso = document.querySelector('#textareaAviso');
const btnEnviarAviso = document.querySelector('#btnEnviarAviso');

var token = '';
var email = '';

if(content, btnEnviarAviso) {
    addEvents();
}

async function addEvents() {
    try {
        if(sessionStorage.getItem('IsSessionStorageUsed').includes('true')) {
            try {
                if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('true')) {
                    window.location.href = "index.html";
                } else if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('false')) {
                    token = sessionStorage.getItem('TokenLogin');
                    email = sessionStorage.getItem('EmailLogin');
    
                    /* GET request */
                    try {
    
                        /* GET request */
                        let response = await fetch('http://localhost:8080/LojaDeDoces/api/aviso', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            }
                        });
    
                        let commits = await response.json(); // lê o corpo da resposta e converte para o formato JSON
    
                        for(var i=0; i<commits.length; i++) { // para cada index no JSON, faça:
    
                            // idDescricaoProduto.innerText = 'ID: ' + commits[i].id;
    
                            // criação do article de cada aviso
                            var articleAviso = document.createElement('article');
    
                                var divAviso = document.createElement('div');
                                divAviso.classList.add('campo');
    
                                    var labelAviso = document.createElement('label');
                                    labelAviso.style = 'width: 100%; text-align: center;';
                                    
                                        var strongAviso = document.createElement('strong');
                                        strongAviso.innerText = 'Descrição do aviso: ';
    
                                    labelAviso.append(strongAviso);
    
                                    var h5Aviso = document.createElement('h5');
                                    h5Aviso.style = 'width: 100%; text-align: center;';
                                    h5Aviso.innerText = commits[i].descricao;
    
                                divAviso.append(labelAviso, h5Aviso);
    
                                var btnDeletarAviso = document.createElement('button');
                                btnDeletarAviso.classList.add('button');
                                btnDeletarAviso.style = 'display: flex; margin-left: auto; margin-right: auto; width: auto;';
                                btnDeletarAviso.innerText = 'Deletar aviso';
                                btnDeletarAviso.setAttribute("id", 'btnDeletarAviso' + commits[i].id);
    
                            articleAviso.append(divAviso, btnDeletarAviso);
    
                            content.append(articleAviso);
    
                            const btnDeletarAvisoGerado = document.querySelector('#' + btnDeletarAviso.id);
    
                            if(btnDeletarAvisoGerado) {
                                /* btnDeletarAviso */
                                btnDeletarAvisoGerado.addEventListener('click', function() {
                                    btnDeletarAvisoRequest(btnDeletarAvisoGerado.id);
                                });   
                            }
                        }
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

    /* btnEnviarAviso */
    btnEnviarAviso.addEventListener('click', function() {
        btnEnviarAvisoRequest();
    });
}

/* btnEnviarAviso request */
async function btnEnviarAvisoRequest() {
    try {

        /* GET request */
        let responseAdm = await fetch('http://localhost:8080/LojaDeDoces/api/adm/1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        let commitAdm = await responseAdm.json(); // lê o corpo da resposta e converte para o formato JSON

        var nomeAdm = commitAdm.nome;
        var sobrenomeAdm = commitAdm.sobrenome;
        var emailAdm = commitAdm.email;
        var senhaAdm = commitAdm.senha;
        var telefoneAdm = commitAdm.telefone;
        var cepAdm = commitAdm.cep;
        var numAdm = commitAdm.numero;
        var logradouroAdm = commitAdm.logradouro;
        var bairroAdm = commitAdm.bairro;
        var cidadeAdm = commitAdm.cidade;
        var complementoAdm = commitAdm.complemento;

        /* POST aviso */

        let idRadom = Math.floor(Math.random() * 100000000) + 1;

        // cria os atributos e valores do arquivo JSON a ser enviado
        let aviso = {
            id: idRadom,
            descricao: textAreaAviso.value,
            adm: {
                id: 1,
                nome: nomeAdm,
                sobrenome: sobrenomeAdm,
                email: emailAdm,
                senha: senhaAdm,
                telefone: telefoneAdm,
                cep: cepAdm,
                logradouro: logradouroAdm,
                numero: numAdm,
                bairro: bairroAdm,
                cidade: cidadeAdm,
                complemento: complementoAdm
            }
        };

        // cria o request do tipo POST informando os headers e os dados do body convertidos para JSON
        let response = await fetch('http://localhost:8080/LojaDeDoces/api/aviso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(aviso)
        });

        let responseToJSON = await response.json(); // lê o corpo da resposta e converte para o formato JSON
        alert(JSON.stringify(responseToJSON.message));

        window.location.href = "avisos.html";
    } catch (e) {
        alert('Erro ao inserir aviso');
    }
}

/* btnDeletarAviso request */
async function btnDeletarAvisoRequest(id) {
    try {

        /* GET request */
        let responseAdm = await fetch('http://localhost:8080/LojaDeDoces/api/adm/1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        let commitAdm = await responseAdm.json(); // lê o corpo da resposta e converte para o formato JSON

        var nomeAdm = commitAdm.nome;
        var sobrenomeAdm = commitAdm.sobrenome;
        var emailAdm = commitAdm.email;
        var senhaAdm = commitAdm.senha;
        var telefoneAdm = commitAdm.telefone;
        var cepAdm = commitAdm.cep;
        var numAdm = commitAdm.numero;
        var logradouroAdm = commitAdm.logradouro;
        var bairroAdm = commitAdm.bairro;
        var cidadeAdm = commitAdm.cidade;
        var complementoAdm = commitAdm.complemento;

        /* DELETE aviso */

        // cria os atributos e valores do arquivo JSON a ser enviado
        let aviso = {
            id: parseInt(id.slice(15)),
            descricao: 'descricao',
            adm: {
                id: 1,
                nome: nomeAdm,
                sobrenome: sobrenomeAdm,
                email: emailAdm,
                senha: senhaAdm,
                telefone: telefoneAdm,
                cep: cepAdm,
                logradouro: logradouroAdm,
                numero: numAdm,
                bairro: bairroAdm,
                cidade: cidadeAdm,
                complemento: complementoAdm
            }
        };

        // cria o request do tipo DELETE informando os headers e os dados do body convertidos para JSON
        let response = await fetch('http://localhost:8080/LojaDeDoces/api/aviso', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(aviso)
        });

        let responseToJSON = await response.json(); // lê o corpo da resposta e converte para o formato JSON

        alert(responseToJSON.message);

        window.location.href = "avisos.html";
    } catch (e) {
        alert(e.message);
    }
}
