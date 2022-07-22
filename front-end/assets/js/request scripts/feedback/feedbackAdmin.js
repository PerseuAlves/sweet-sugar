const rowProdutos = document.querySelector('#rowProdutos');

var token = '';
var email = '';

if(rowProdutos) {
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
    
                    try {
                        /* GET request */
                        let responseGetFeedbacks = await fetch('http://localhost:8080/LojaDeDoces/api/feedback', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            }
                        });
                        
                        let commitFeedbacks = await responseGetFeedbacks.json(); // lê o corpo da resposta e converte para o formato JSON
                
                        if(commitFeedbacks.length == 0) {
                
                            // const rowProdutos
                
                                // criação do divFeedback
                                var divFeedbackBody = document.createElement('div');
                                divFeedbackBody.classList.add('col-4');
                                divFeedbackBody.classList.add('col-12-medium');
                                divFeedbackBody.style = 'margin-left: auto; margin-right: auto;';
                
                                    var sectionFeedbackBody = document.createElement('section');
                
                                        var headerFeedbackBody = document.createElement('header');
                
                                            var idFeedback = document.createElement('h3');
                                            idFeedback.innerText = 'Não há avisos a serem mostrados';
                                            
                                        headerFeedbackBody.append(idFeedback);
                                            
                                    sectionFeedbackBody.append(headerFeedbackBody);
                
                                divFeedbackBody.append(sectionFeedbackBody);
                
                            rowProdutos.append(divFeedbackBody);
                        }
                
                        for(var i=0; i<commitFeedbacks.length; i++) { // para cada index no JSON, faça:
                            
                            // const rowProdutos
                
                                // criação do divFeedback
                                var divFeedbackBody = document.createElement('div');
                                divFeedbackBody.classList.add('col-4');
                                divFeedbackBody.classList.add('col-12-medium');
                
                                    var sectionFeedbackBody = document.createElement('section');
                
                                        var headerFeedbackBody = document.createElement('header');
                
                                            var idFeedback = document.createElement('h3');
                                            idFeedback.innerText = 'ID: ' + commitFeedbacks[i].id;
                
                                            var nomeFeedback = document.createElement('h4');
                                            nomeFeedback.innerText = 'Nome: ' + commitFeedbacks[i].nome;
                                            nomeFeedback.style = 'margin-bottom: 0px; text-transform: none; font-weight: normal;';
                
                                            var sobrenomeFeedback = document.createElement('h4');
                                            sobrenomeFeedback.innerText = 'Sobrenome: ' + commitFeedbacks[i].sobrenome;
                                            sobrenomeFeedback.style = 'margin-bottom: 0px; text-transform: none; font-weight: normal;';
                
                                            var emailFeedback = document.createElement('h4');
                                            emailFeedback.innerText = 'Email: ' + commitFeedbacks[i].email;
                                            emailFeedback.style = 'margin-bottom: 0px; text-transform: none; font-weight: normal;';
                
                                            var mensagemFeedback = document.createElement('h6');
                                            mensagemFeedback.innerText = 'Mensagem: ' + commitFeedbacks[i].mensagem;
                                            mensagemFeedback.style = 'margin-bottom: 0px; text-transform: none; font-weight: normal;';
                
                                            var btnDeletarFeedback = document.createElement('input');
                                            btnDeletarFeedback.style = 'width: auto; margin-right: 2px; margin-top: 10px';
                                            btnDeletarFeedback.type = 'button';
                                            btnDeletarFeedback.value = 'Deletar';
                                            btnDeletarFeedback.setAttribute("id", 'btnDeletarFeedback' + commitFeedbacks[i].id);
                                            
                                        headerFeedbackBody.append(idFeedback, nomeFeedback, sobrenomeFeedback, emailFeedback, mensagemFeedback, btnDeletarFeedback);
                                            
                                    sectionFeedbackBody.append(headerFeedbackBody);
                
                                divFeedbackBody.append(sectionFeedbackBody);
                
                            rowProdutos.append(divFeedbackBody);
                
                            const btnDeletarFeedbackGerado = document.querySelector('#' + btnDeletarFeedback.id);
                
                            if(btnDeletarFeedbackGerado) {
                
                                /* btnDeletarFeedbackGerado */
                                btnDeletarFeedbackGerado.addEventListener('click', function() {
                                    btnDeletarFeedbackRequest(btnDeletarFeedbackGerado.id);
                                });   
                            }
                        }
                    } catch (e) {
                        alert('Erro ao buscar');
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
}

async function btnDeletarFeedbackRequest(id) {

    try {
        /* GET request */
        let responseGetFeedback = await fetch('http://localhost:8080/LojaDeDoces/api/feedback/' + parseInt(id.slice(18)), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        let commitFeedback = await responseGetFeedback.json(); // lê o corpo da resposta e converte para o formato JSON

        let feedback = {
            id: commitFeedback.id,
            nome: commitFeedback.nome,
            sobrenome: commitFeedback.sobrenome,
            email: commitFeedback.email,
            mensagem: commitFeedback.mensagem
        };
        
        // cria o request do tipo DELETE informando os headers e os dados do body convertidos para JSON
        let responseDeleteFeedback = await fetch('http://localhost:8080/LojaDeDoces/api/feedback', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(feedback)
        });

        let responseToJSON = await responseDeleteFeedback.json(); // lê o corpo da resposta e converte para o formato JSON

        alert(responseToJSON.message);

        window.location.href = "feedbackAdmin.html";
    } catch (e) {
        alert(e.message);
    }
}