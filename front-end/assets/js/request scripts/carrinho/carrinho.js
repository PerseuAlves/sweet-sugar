const divProdutoCompra = document.querySelector('#divProdutoCompra');
const ulCategorias = document.querySelector('#ulCategorias');

var token = '';
var email = '';

if(divProdutoCompra, ulCategorias) {
    addEvents();
}

async function addEvents() {
    try {
        if(sessionStorage.getItem('IsSessionStorageUsed').includes('true')) {
            try {
                if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('true')) {
                    token = sessionStorage.getItem('TokenLogin');
                    email = sessionStorage.getItem('EmailLogin');

                    try {
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
                
                            let responseGetProduto;
                
                            if(sessionStorage.getItem('IsBtnBuscarUsed').includes('true')) {
                
                                var tituloProduto = sessionStorage.getItem('SweetSugarTitulo');
                
                                let urlProduto = 'http://localhost:8080/LojaDeDoces/api/produto/titulo/' + tituloProduto;
                                let responseGetProdutoByTitulo = await fetch(urlProduto);
                
                                responseGetProduto = await responseGetProdutoByTitulo.json(); // lê o corpo da resposta e converte para o formato JSON
                
                                var idProduto = responseGetProduto.id;
                
                            } else {
                                var idProduto = sessionStorage.getItem('SweetSugarId');
                
                                let urlProduto = 'http://localhost:8080/LojaDeDoces/api/produto/' + idProduto;
                                let responseGetProdutoById = await fetch(urlProduto);
                                
                                responseGetProduto = await responseGetProdutoById.json(); // lê o corpo da resposta e converte para o formato JSON
                
                                var idProduto = sessionStorage.getItem('SweetSugarId');
                            }
                
                            sessionStorage.removeItem('IsBtnBuscarUsed');
                            sessionStorage.removeItem('SweetSugarTitulo');
                            sessionStorage.removeItem('SweetSugarId');
                
                            let urlProduto = 'http://localhost:8080/LojaDeDoces/api/produto/' + idProduto;
                            let responseGetProdutoById = await fetch(urlProduto);
                
                            responseGetProduto = await responseGetProdutoById.json(); // lê o corpo da resposta e converte para o formato JSON
                
                            // const divProdutoCompra
                
                                var articleProduto = document.createElement('article');
                                articleProduto.classList.add('box');
                                articleProduto.classList.add('excerpt');
                                articleProduto.style = 'text-align: center;';
                            
                                    var imgProduto = document.createElement('img');
                                    imgProduto.style = 'max-width: 640px; max-height: 430px;';
                
                                    let urlImagem = 'http://localhost:8080/LojaDeDoces/api/imagem/' + responseGetProduto.id;
                                    let responseImagem = await fetch(urlImagem);
                            
                                    let commitsImagem = await responseImagem.json(); // lê o corpo da resposta e converte para o formato JSON
                
                                    imgProduto.src=commitsImagem.message;
                            
                                    var divProduto = document.createElement('div');
                            
                                        var headerProduto = document.createElement('header');
                            
                                            var h3Produto = document.createElement('h3');
                                            h3Produto.innerText = responseGetProduto.titulo;
                            
                                        headerProduto.append(h3Produto);
                            
                                        var descricaoProduto = document.createElement('p');
                                        descricaoProduto.innerText = 'Descrição: ' + responseGetProduto.descricao;
                            
                                        var valorProduto = document.createElement('p');
                                        valorProduto.innerText = 'Valor: ' + parseFloat(responseGetProduto.preco);
                            
                                        var quantidadeProduto = document.createElement('p');
                                        quantidadeProduto.innerText = 'Quantidade: ';
                            
                                            var inputQuantidadeProduto = document.createElement('input');
                                            inputQuantidadeProduto.type = 'number';
                                            inputQuantidadeProduto.setAttribute('id','qtdProdutoCompra');
                            
                                        quantidadeProduto.append(inputQuantidadeProduto);
                            
                                        var brProduto = document.createElement('br');
                            
                                        var btnFinalizarCompraProduto = document.createElement('input');
                                        btnFinalizarCompraProduto.type = 'button';
                                        btnFinalizarCompraProduto.value = 'Finalizar Compra';
                                        btnFinalizarCompraProduto.setAttribute('id', 'btnGeradoFinalizarCompra');
                                        btnFinalizarCompraProduto.classList.add('button');
                                        btnFinalizarCompraProduto.style = 'width: auto; background-image: linear-gradient(to left, rgb(71, 118, 230), rgb(142, 84, 233));';
                            
                                    divProduto.append(headerProduto, descricaoProduto, valorProduto, quantidadeProduto, brProduto, btnFinalizarCompraProduto);
                            
                                articleProduto.append(imgProduto, divProduto);
                
                            divProdutoCompra.append(articleProduto);
                
                            const inputQuantidadeProdutoGerado = document.querySelector('#' + inputQuantidadeProduto.id);
                            const btnFinalizarCompraProdutoGerado = document.querySelector('#' + btnFinalizarCompraProduto.id);
                
                            if(inputQuantidadeProdutoGerado, btnFinalizarCompraProdutoGerado) {
                
                                /* btnFinalizarCompraProdutoGerado */
                                btnFinalizarCompraProdutoGerado.addEventListener('click', function() {
                                    btnFinalizarCompraRequest(inputQuantidadeProdutoGerado.value, idProduto);
                                });  
                            }
                        }
                    } catch (e) {
                        alert('Erro ao buscar');
                    }
                } else if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('false')) {
                    sessionStorage.removeItem('IsBtnBuscarUsed');
                    sessionStorage.removeItem('SweetSugarTitulo');
                    sessionStorage.removeItem('SweetSugarId');

                    alert('Login como Adm, redirecionando para o index do Adm');
                    window.location.href = "indexAdmin.html";
                } else {
                    sessionStorage.removeItem('IsBtnBuscarUsed');
                    sessionStorage.removeItem('SweetSugarTitulo');
                    sessionStorage.removeItem('SweetSugarId');

                    window.location.href = "login.html";
                }
            } catch (e) {
                sessionStorage.removeItem('IsBtnBuscarUsed');
                sessionStorage.removeItem('SweetSugarTitulo');
                sessionStorage.removeItem('SweetSugarId');
                alert('oi');
                window.location.href = "login.html";
            }
        } else {
            window.location.href = "login.html";
        }
    } catch (e) {
        window.location.href = "login.html";
    }
}

async function btnFinalizarCompraRequest(qtd, id) {

    if(qtd > 0) {
        
        /* Session Storage load */
        sessionStorage.setItem('IsSessionStorageUsed', 'true');

        sessionStorage.setItem('SweetSugarQtd', qtd);
        sessionStorage.setItem('SweetSugarId', id);

        window.location.href = "dadosCartao.html";
    } else {
        alert('Qtd não pode ser menor que 1');
    }
}
