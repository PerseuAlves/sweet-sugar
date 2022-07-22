const section = document.querySelector('#requestHeadListaComprasSection');
const idArray = new Array().fill(null);

var token = '';
var email = '';

if(section) {
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
                        let response = await fetch('http://localhost:8080/LojaDeDoces/api/compra', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            }
                        });
                
                        let commits = await response.json(); // lê o corpo da resposta e converte para o formato JSON
                
                        for(var i=0; i<commits.length; i++) { // para cada index no JSON, faça:
                
                            if(commits[i].compra_finalizada == 0) {
                                // const section
                
                                    // criação do articleCompra
                                    var articleCompra = document.createElement('article');
                                    articleCompra.classList.add('box');
                                    articleCompra.classList.add('excerpt');
                
                                        var divCompra = document.createElement('div');
                
                                            var headerCompra = document.createElement('header');
                                            headerCompra.style = 'margin-left: 0%;';
                
                                                var h3Compra = document.createElement('h3');
                                                h3Compra.innerText = 'ID da compra: ' + commits[i].id;
                
                                            headerCompra.append(h3Compra);
                
                                            var pValorTotalCompra = document.createElement('p');
                                            pValorTotalCompra.innerText = 'Valor Total: ' + commits[i].valor_total;
                
                                            var pNomeDoCliente = document.createElement('p');
                                            pNomeDoCliente.innerText = 'Nome do cliente: ' + commits[i].usuario.nome + ' ' + commits[i].usuario.sobrenome;
                
                                            var pIdCliente = document.createElement('p');
                                            pIdCliente.innerText = 'ID do cliente: ' + commits[i].usuario.id;
                                            pIdCliente.setAttribute('id', 'pIdCliente' + commits[i].id);
                
                                            var pEmailDoCliente = document.createElement('p');
                                            pEmailDoCliente.innerText = 'Email do cliente: ' + commits[i].usuario.email;
                
                                            var pIdDoProduto = document.createElement('p');
                                            pIdDoProduto.innerText = 'ID do produto: ' + commits[i].produto.id;
                
                                            var pNomeDoProduto = document.createElement('p');
                                            pNomeDoProduto.innerText = 'Nome do produto: ' + commits[i].produto.titulo;
                
                                            var pPrecoDoProduto = document.createElement('p');
                                            pPrecoDoProduto.innerText = 'Preço individual do produto: ' + commits[i].produto.preco;
                
                                            var pQtdCompradaDeProdutos = document.createElement('p');
                                            pQtdCompradaDeProdutos.innerText = 'Quantidade comprada: ' + commits[i].qtd_produto;
                                            pQtdCompradaDeProdutos.setAttribute('id', 'pQtdCompradaDeProdutos' + commits[i].id);
                
                                            var btnFinalizarCompra = document.createElement('input');
                                            btnFinalizarCompra.style = 'width: auto; margin-right: 2px;';
                                            btnFinalizarCompra.type = 'button';
                                            btnFinalizarCompra.value = 'Finalizar';
                                            btnFinalizarCompra.setAttribute("id", 'btnFinalizarCompra' + commits[i].id);
                
                                            var btnVisualizarEndereco = document.createElement('input');
                                            btnVisualizarEndereco.style = 'width: auto; margin-left: 2px;';
                                            btnVisualizarEndereco.type = 'button';
                                            btnVisualizarEndereco.value = 'Visualizar Endereco';
                                            btnVisualizarEndereco.setAttribute("id", 'btnVisualizarEndereco' + commits[i].id);
                
                                        divCompra.append(headerCompra, pValorTotalCompra, pNomeDoCliente, pIdCliente, pEmailDoCliente, pIdDoProduto, pNomeDoProduto, pPrecoDoProduto, pQtdCompradaDeProdutos, btnFinalizarCompra, btnVisualizarEndereco);
                                    articleCompra.append(divCompra);
                            
                                section.append(articleCompra);
                
                                idArray[i] = commits[i].id;
                
                                const btnFinalizarCompraGerado = document.querySelector('#' + btnFinalizarCompra.id);
                                const btnVisualizarEnderecoGerado = document.querySelector('#' + btnVisualizarEndereco.id);
                
                                if(btnFinalizarCompraGerado, btnVisualizarEnderecoGerado) {
                
                                    /* btnFinalizarCompraGerado */
                                    btnFinalizarCompraGerado.addEventListener('click', function() {
                                        btnFinalizarCompraRequest(btnFinalizarCompraGerado.id);
                                    });   
                
                                    /* btnVisualizarEnderecoGerado */
                                    btnVisualizarEnderecoGerado.addEventListener('click', function() {
                                        btnVisualizarEnderecoRequest(btnVisualizarEnderecoGerado.id);
                                    });  
                                }
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
}

/* btnFinalizarCompra request */
async function btnFinalizarCompraRequest(id) {

    try {
        /* GET request */
        let responsePut = await fetch('http://localhost:8080/LojaDeDoces/api/compra/' + id.slice(18), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        let commitPut = await responsePut.json(); // lê o corpo da resposta e converte para o formato JSON

        compra = {
            id: commitPut.id,
            qtd_produto: commitPut.qtd_produto,
            valor_total: commitPut.valor_total,
            usuario: {
                id: commitPut.usuario.id,
                nome: commitPut.usuario.nome,
                sobrenome: commitPut.usuario.sobrenome,
                email: commitPut.usuario.email
            },
            produto: {
                id: commitPut.produto.id,
                titulo: commitPut.produto.titulo,
                descricao: commitPut.produto.descricao,
                preco: commitPut.produto.preco,
                categoria1: commitPut.produto.categoria1,
                categoria2: commitPut.produto.categoria2,
                categoria3: commitPut.produto.categoria3
            },
            compra_finalizada: 1
        }

        // cria o request do tipo PUT informando os headers e os dados do body convertidos para JSON
        let response = await fetch('http://localhost:8080/LojaDeDoces/api/compra', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(compra)
        });

        let responseToJSON = await response.json(); // lê o corpo da resposta e converte para o formato JSON

        alert(responseToJSON.message);

        window.location.href = "compras.html";
    } catch (e) {
        alert(e.message);
    }
}

/* btnVisualizarEndereco request */
async function btnVisualizarEnderecoRequest(id) {

    try {
        /* GET request */
        let responseGetCompra = await fetch('http://localhost:8080/LojaDeDoces/api/compra/' + parseInt(id.slice(21)), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        let commitGetCompra = await responseGetCompra.json(); // lê o corpo da resposta e converte para o formato JSON

        /* GET request */
        let responseGetUsuario = await fetch('http://localhost:8080/LojaDeDoces/api/endereco/byUsuario/' + parseInt(commitGetCompra.usuario.id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        let commitGetUsuario = await responseGetUsuario.json(); // lê o corpo da resposta e converte para o formato JSON

        for(i=0; i<commitGetUsuario.length; i++) {

            alert(JSON.stringify(commitGetUsuario[i].enderecoId));
        }
    } catch (e) {
        alert(e.message);
    }
}
