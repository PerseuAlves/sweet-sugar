const ulCategorias = document.querySelector('#ulCategorias');
const campoCalendario = document.querySelector('#campoCalendario');
const numCartao = document.querySelector('#numCartao');
const codCartao = document.querySelector('#codSegCartao');
const nomeCartao = document.querySelector('#nomeCartao');
const vencimentoCartao = document.querySelector('#vencimento');
const btnFinalizarCompra = document.querySelector('#btnFinalizarCompra');

var token = '';
var email = '';

if(ulCategorias, campoCalendario, numCartao, codCartao, nomeCartao, vencimentoCartao, btnFinalizarCompra) {
    addEvents();
}

async function addEvents() {
    try {
        if(sessionStorage.getItem('IsSessionStorageUsed').includes('true')) {
            try {
                if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('true')) {
                    token = sessionStorage.getItem('TokenLogin');
                    email = sessionStorage.getItem('EmailLogin');

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

                    /* Session Storage load */
                    if(sessionStorage.getItem('IsSessionStorageUsed').includes('true')) {
                                
                        const qtdProdutoCompra = sessionStorage.getItem('SweetSugarQtd');
                        const idProdutoCompra = sessionStorage.getItem('SweetSugarId');

                        sessionStorage.removeItem('SweetSugarQtd');
                        sessionStorage.removeItem('SweetSugarId');

                        /* GET produto */
                        let url = 'http://localhost:8080/LojaDeDoces/api/produto/' + idProdutoCompra;
                        let responseGetProduto = await fetch(url);
                        
                        let commitProduto = await responseGetProduto.json(); // lê o corpo da resposta e converte para o formato JSON

                        var divProduto = document.createElement('div');
                        divProduto.classList.add('campo');
                        divProduto.style = 'margin-top: 30px;';

                            var idProdutoLabel = document.createElement('label');
                            idProdutoLabel.innerText = 'ID: ';

                                var idProdutoStrong = document.createElement('strong');
                                idProdutoStrong.innerText = commitProduto.id.toString();

                            idProdutoLabel.append(idProdutoStrong);

                            var nomeProdutoLabel = document.createElement('label');
                            nomeProdutoLabel.innerText = 'Nome: ';

                                var tituloProdutoStrong = document.createElement('strong');
                                tituloProdutoStrong.innerText = commitProduto.titulo;

                            nomeProdutoLabel.append(tituloProdutoStrong);

                            var qtdProdutoLabel = document.createElement('label');
                            qtdProdutoLabel.innerText = 'Qtd: ';

                                var qtdProdutoStrong = document.createElement('strong');
                                qtdProdutoStrong.innerText = qtdProdutoCompra;

                            qtdProdutoLabel.append(qtdProdutoStrong);

                            var valorTotalProdutoLabel = document.createElement('label');
                            valorTotalProdutoLabel.innerText = 'Valor total: ';

                                var valorProdutoStrong = document.createElement('strong');
                                valorProdutoStrong.setAttribute('id', 'valorTotalProduto');
                                valorProdutoStrong.innerText = (parseInt(qtdProdutoCompra) * parseFloat(commitProduto.preco));

                            valorTotalProdutoLabel.append(valorProdutoStrong);

                        divProduto.append(idProdutoLabel, nomeProdutoLabel, qtdProdutoLabel, valorTotalProdutoLabel);

                        campoCalendario.append(divProduto);

                        /* btnFinalizarCompra */
                        btnFinalizarCompra.addEventListener('click', function() {
                            btnFinalizarCompraRequest(commitProduto, qtdProdutoCompra);
                        });
                    }
                } else if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('false')) {
                    sessionStorage.removeItem('SweetSugarQtd');
                    sessionStorage.removeItem('SweetSugarId');

                    alert('Login como Adm, redirecionando para o index do Adm');
                    window.location.href = "indexAdmin.html";
                } else {
                    sessionStorage.removeItem('SweetSugarQtd');
                    sessionStorage.removeItem('SweetSugarId');
                    
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
}

async function btnFinalizarCompraRequest(commitProduto, qtdProdutoCompra) {
    try {

        /* GET compra */
        let idRadom = Math.floor(Math.random() * 1000000) + 1;

        /* GET request */
        let responseGetCompra = await fetch('http://localhost:8080/LojaDeDoces/api/compra/' + idRadom, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        while(responseGetCompra.toString.length != 0) {
            idRadom = Math.floor(Math.random() * 1000000) + 1;

            responseGetCompra = await fetch('http://localhost:8080/LojaDeDoces/api/compra/' + idRadom, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
        }

        /* POST pagamento */
        var date = vencimentoCartao.value.split('-');

        var valorTotalPagamento = parseInt((parseInt((parseInt(qtdProdutoCompra) * parseFloat(commitProduto.preco))) + '00'));
        
        let pagamento = {
            reference_id: idRadom.toString(),
            description: 'Compra na loja SweetSugar',
            amount: {
                value: valorTotalPagamento,
                currency: 'BRL'
            },
            payment_method: {
                type: 'CREDIT_CARD',
                installments: 1,
                capture: false,
                soft_descriptor: 'SweetSugar',
                card: {
                    number: numCartao.value,
                    exp_month: date[1],
                    exp_year: date[0],
                    security_code: codCartao.value,
                    holder: {
                        name: nomeCartao.value
                    }
                }
            },
            notification_urls: [
                'https://yourserver.com/nas_ecommerce/277be731-3b7c-4dac-8c4e-4c3f4a1fdc46/'
            ]
        };

        // cria o request do tipo POST informando os headers e os dados do body convertidos para JSON
        let responsePostPagamento = await fetch('http://localhost:8080/LojaDeDoces/api/pagseguro/' + email, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(pagamento)
        });
        
        let responseToJSON = await responsePostPagamento.json(); // lê o corpo da resposta e converte para o formato JSON
        
        if(responseToJSON.message.includes('Autorizado')) {
            
            /* POST compra */

            let compra = {
                id: idRadom,
                qtd_produto: qtdProdutoCompra,
                valor_total: valorTotalPagamento,
                usuario: {
                    id: 1,
                    nome: 'Carlos',
                    sobrenome: 'Almeida',
                    email: 'Carlos123@sim'
                },
                produto: {
                    id: parseInt(commitProduto.id),
                    titulo: commitProduto.titulo,
                    descricao: commitProduto.descricao,
                    preco: commitProduto.preco
                }
            };

            // cria o request do tipo POST informando os headers e os dados do body convertidos para JSON
            let responsePostProduto = await fetch('http://localhost:8080/LojaDeDoces/api/compra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(compra)
            });

            let responseToJSONProduto = await responsePostProduto.json(); // lê o corpo da resposta e converte para o formato JSON

            alert(responseToJSONProduto.message);
        } else {
            alert(responseToJSON.message);
        }

        window.location.href = "index.html";
    } catch (e) {
        alert(e.message);
    }
}
