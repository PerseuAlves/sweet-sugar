const section = document.querySelector('#requestHeadListaProdutosSection');

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
    
                    /* GET request */
                    try {
    
                        let response = await fetch('http://localhost:8080/LojaDeDoces/api/produto', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            }
                        });
    
                        let commits = await response.json(); // lê o corpo da resposta e converte para o formato JSON
    
                        for(var i=0; i<commits.length; i++) { // para cada index no JSON, faça:
                            // const section
    
                                // criação do articleProduto
                                var articleProduto = document.createElement('article');
                                articleProduto.classList.add('box');
                                articleProduto.classList.add('excerpt');
                                articleProduto.style = 'text-align: center';
    
                                    var aImgProduto = document.createElement('a');
                                    aImgProduto.href = '#';
                                    aImgProduto.classList.add('image');
                                    aImgProduto.classList.add('left');
    
                                        var imgProduto = document.createElement('img');
                                        imgProduto.style = 'max-width: 640px; max-height: 430px;';
    
                                        /* GET request */
                                        let responseImagem = await fetch('http://localhost:8080/LojaDeDoces/api/imagem/' + commits[i].id, {
                                            method: 'GET',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'Authorization': 'Bearer ' + token
                                            }
                                        });
                                                
                                        let commitsImagem = await responseImagem.json(); // lê o corpo da resposta e converte para o formato JSON
    
                                        imgProduto.src=commitsImagem.message;
                                    
                                    aImgProduto.append(imgProduto);
    
                                    var divProduto = document.createElement('div');
    
                                        var headerProduto = document.createElement('header');
    
                                            var h3Produto = document.createElement('h3');
    
                                                var aTituloProduto = document.createElement('a');
                                                aTituloProduto.href = '#';
                                                aTituloProduto.innerText = commits[i].titulo;
    
                                            h3Produto.append(aTituloProduto);
    
                                        headerProduto.append(h3Produto);
    
                                        var idDescricaoProduto = document.createElement('p');
                                        idDescricaoProduto.innerText = 'ID: ' + commits[i].id;
    
                                        var pDescricaoProduto = document.createElement('p');
                                        pDescricaoProduto.innerText = 'Descrição: ' + commits[i].descricao;
    
                                        var pValorProduto = document.createElement('p');
                                        pValorProduto.innerText = 'Valor: ' + commits[i].preco;
    
                                        var pCategoria1Produto = document.createElement('p');
                                        pCategoria1Produto.innerText = 'Categoria 1: ' + commits[i].categoria1;
    
                                        var pCategoria2Produto = document.createElement('p');
                                        pCategoria2Produto.innerText = 'Categoria 2: ' + commits[i].categoria2;
    
                                        var pCategoria3Produto = document.createElement('p');
                                        pCategoria3Produto.innerText = 'Categoria 3: ' + commits[i].categoria3;
    
                                        var btnDeletarProduto = document.createElement('input');
                                        btnDeletarProduto.style = 'width: auto; margin-right: 2px;';
                                        btnDeletarProduto.type = 'button';
                                        btnDeletarProduto.value = 'Deletar';
                                        btnDeletarProduto.setAttribute("id", 'btnDeletarProduto' + commits[i].id);
    
                                        var btnAtualizarProduto = document.createElement('input');
                                        btnAtualizarProduto.style = 'width: auto; margin-left: 2px;';
                                        btnAtualizarProduto.type = 'button';
                                        btnAtualizarProduto.value = 'Atualizar';
                                        btnAtualizarProduto.setAttribute("id", 'btnAtualizarProduto' + commits[i].id);
    
                                    divProduto.append(headerProduto, idDescricaoProduto, pDescricaoProduto, pValorProduto, pCategoria1Produto, pCategoria2Produto, pCategoria3Produto, btnDeletarProduto, btnAtualizarProduto);
                                articleProduto.append(aImgProduto, divProduto);
                            
                            section.append(articleProduto);
    
                            const btnDeletarProdutoGerado = document.querySelector('#' + btnDeletarProduto.id);
                            const btnAtualizarProdutoGerado = document.querySelector('#' + btnAtualizarProduto.id);
    
                            if(btnDeletarProdutoGerado, btnAtualizarProdutoGerado) {
    
                                /* btnDeletarProdutoGerado */
                                btnDeletarProdutoGerado.addEventListener('click', function() {
                                    btnDeletarProdutoRequest(btnDeletarProdutoGerado.id);
                                });   
    
                                /* btnAtualizarProdutoGerado */
                                btnAtualizarProdutoGerado.addEventListener('click', function() {
                                    btnAtualizarProdutoRequest(btnAtualizarProdutoGerado.id);
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
}

/* btnDeletarProduto request */
async function btnDeletarProdutoRequest(id) {
    try {
        /* GET request */
        let responseGetProduto = await fetch('http://localhost:8080/LojaDeDoces/api/produto/' + parseInt(id.slice(17)), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        let commit = await responseGetProduto.json(); // lê o corpo da resposta e converte para o formato JSON

        let produto = {
            id: commit.id,
            titulo: commit.titulo,
            descricao: commit.descricao,
            preco: commit.preco,
            categoria1: commit.categoria1,
            categoria2: commit.categoria2,
            categoria3: commit.categoria3
        };

        // cria o request do tipo DELETE informando os headers e os dados do body convertidos para JSON
        let responseDeleteProduto = await fetch('http://localhost:8080/LojaDeDoces/api/produto', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(produto)
        });

        let responseToJSON = await responseDeleteProduto.json(); // lê o corpo da resposta e converte para o formato JSON

        alert(responseToJSON.message);

        if(responseToJSON.message.includes('sucesso')) {

            let imagem = {
                id: commit.id
            };
    
            // cria o request do tipo DELETE informando os headers e os dados do body convertidos para JSON
            let responseDeleteImagem = await fetch('http://localhost:8080/LojaDeDoces/api/imagem', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(imagem)
            });
    
            let responseToJSON = await responseDeleteImagem.json(); // lê o corpo da resposta e converte para o formato JSON

            alert(responseToJSON.message);
        }

        window.location.href = "listaProdutos.html";
    } catch (e) {
        alert(e.message);
    }
}

/* btnAtualizarProduto request */
async function btnAtualizarProdutoRequest(id) {
    try {
        /* GET request */
        let responseGetProduto = await fetch('http://localhost:8080/LojaDeDoces/api/produto/' + parseInt(id.slice(19)), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        let commit = await responseGetProduto.json(); // lê o corpo da resposta e converte para o formato JSON

        /* Session Storage load */
        sessionStorage.setItem('IsSessionStorageUsed', 'true');

        sessionStorage.setItem('SweetSugarProdutoId', commit.id);
        sessionStorage.setItem('SweetSugarProdutoTitulo', commit.titulo);
        sessionStorage.setItem('SweetSugarProdutoDescricao', commit.descricao);
        sessionStorage.setItem('SweetSugarProdutoPreco', commit.preco);
        sessionStorage.setItem('SweetSugarProdutoCategoria1', commit.categoria1);
        sessionStorage.setItem('SweetSugarProdutoCategoria2', commit.categoria2);
        sessionStorage.setItem('SweetSugarProdutoCategoria3', commit.categoria3);

        window.location.href = "atualizarProduto.html";
    } catch (e) {
        alert(e.message);
    }
}
