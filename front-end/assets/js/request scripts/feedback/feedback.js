const ulCategorias = document.querySelector('#ulCategorias');
const nome = document.querySelector('#nome');
const sobrenome = document.querySelector('#sobrenome');
const email = document.querySelector('#email');
const experiencia = document.querySelector('#experiencia');
const btnEnviarExperiencia = document.querySelector('#btnEnviarExperiencia');

var token = '';
var emailToken = '';

if(ulCategorias, nome, sobrenome, email, experiencia, btnEnviarExperiencia) {
    addEvents();
}

async function addEvents() {

    try {
        if(sessionStorage.getItem('IsSessionStorageUsed').includes('true')) {
            try {
                if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('true')) {
                    token = sessionStorage.getItem('TokenLogin');
                    emailToken = sessionStorage.getItem('EmailLogin');

                    /* GET categorias */
                    let url = 'http://localhost:8080/LojaDeDoces/api/produto/allCategory';
                    let responseGetCategorias = await fetch(url);
                    
                    let commitCategorias = await responseGetCategorias.json(); // lê o corpo da resposta e converte para o formato JSON

                    for(var i=0; i<commitCategorias.length; i++) { // para cada index no JSON, faça:
                        
                        // const ulCategorias

                            // criação do liCategoria
                            var liCategoriaNav = document.createElement('li');
                            liCategoriaNav.style = "white-space: nowrap;";

                                var aCategoriaNav = document.createElement('a');
                                aCategoriaNav.href = "indexProdutos.html";
                                aCategoriaNav.innerText = commitCategorias[i].categoria;
                                aCategoriaNav.style = "display: block;";

                            liCategoriaNav.append(aCategoriaNav);

                        ulCategorias.append(liCategoriaNav);
                    }
                } else if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('false')) {
                    alert('Login como Adm, redirecionando para o index do Adm');
                    window.location.href = "indexAdmin.html";
                } else {
                    window.location.href = "login.html";
                }
            } catch (e) {
    
            }
        } else {
            window.location.href = "login.html";
        }
    } catch (e) {
        window.location.href = "login.html";
    }

    /* btnEnviarExperiencia */
    btnEnviarExperiencia.addEventListener('click', function() {
        btnEnviarExperienciaRequest();
    });
}

async function btnEnviarExperienciaRequest() {

    try {

        let idRadom = Math.floor(Math.random() * 1000000) + 1;

        /* GET request */
        let responseGetFeedBack = await fetch('http://localhost:8080/LojaDeDoces/api/feedback/' + idRadom, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        while(responseGetFeedBack.toString.length != 0) {
            idRadom = Math.floor(Math.random() * 1000000) + 1;

            /* GET request */
            responseGetFeedBack = await fetch('http://localhost:8080/LojaDeDoces/api/feedback/' + idRadom, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
        }

        let feedback = {
            id: idRadom,
            nome: nome.value,
            sobrenome: sobrenome.value,
            email: email.value,
            mensagem: experiencia.value
        };

        // cria o request do tipo POST informando os headers e os dados do body convertidos para JSON
        let responsePostFeedback = await fetch('http://localhost:8080/LojaDeDoces/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(feedback)
        });

        let responseToJSONProduto = await responsePostFeedback.json(); // lê o corpo da resposta e converte para o formato JSON

        alert(responseToJSONProduto.message);

        window.location.href = "index.html";
    } catch (e) {
        alert(e.message);
    }
}