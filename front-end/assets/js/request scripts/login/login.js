const email = document.querySelector('#email');
const senha = document.querySelector('#senha');
const btnEntrar = document.querySelector('#btnEntrar');

if(email, senha, btnEntrar) {
    addEvents();
}

async function addEvents() {

    try {
        if(sessionStorage.getItem('IsSessionStorageUsed').includes('true')) {
            if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('true')) {
                window.location.href = "updateCadastro.html";
            } else if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('false')) {
                window.location.href = "updateCadastroAdm.html";
            }
        }
    } catch (e) {
        
    }

    /* btnEntrar */
    btnEntrar.addEventListener('click', function() {
        btnEntrarRequest();
    });
}

/* btnAtualizar request */
async function btnEntrarRequest() {

    try {

        let login = {
            username: email.value,
            password: senha.value
        }

        // cria o request do tipo POST informando os headers e os dados do body convertidos para JSON
        let response = await fetch('http://localhost:8080/LojaDeDoces/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        });

        let responseToJSON = await response.json(); // lê o corpo da resposta e converte para o formato JSON

        if(responseToJSON.token) {

            let loginUser = false;

            /* GET request */
            let url = 'http://localhost:8080/LojaDeDoces/api/usuario';
            let responseUsuario = await fetch(url);

            let commitsUsuario = await responseUsuario.json(); // lê o corpo da resposta e converte para o formato JSON

            for(var i=0; i<commitsUsuario.length; i++) {
                if(commitsUsuario[i].email.includes(email.value)) {
                    loginUser = true;
                }
            }

            /* Session Storage load */
            sessionStorage.setItem('IsSessionStorageUsed', 'true');

            sessionStorage.setItem('TokenLogin', responseToJSON.token);
            sessionStorage.setItem('EmailLogin', email.value);

            alert('Login efetuado com sucesso');

            if(loginUser == true) {
                sessionStorage.setItem('IsLoginUser', 'true');
                window.location.href = "index.html";
            } else {
                sessionStorage.setItem('IsLoginUser', 'false');
                window.location.href = "indexAdmin.html";
            }
        } else {
            alert('Erro ao logar, tente novamente');
        }
    } catch (e) {
        alert(e.message);
    }
}