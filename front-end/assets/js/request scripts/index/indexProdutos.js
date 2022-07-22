const ulCategorias = document.querySelector('#ulCategorias');
const rowProdutos = document.querySelector('#rowProdutos');

if(ulCategorias, rowProdutos) {
    addEvents();
}

async function addEvents() {

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

        /* GET produtos by categoria */

        if(sessionStorage.getItem('IsSessionStorageUsed').includes('true')) {
            const categoria = sessionStorage.getItem('SweetSugarCategoria');

            sessionStorage.removeItem('SweetSugarCategoria');

            let urlProduto = 'http://localhost:8080/LojaDeDoces/api/produto/categoria/' + categoria;
            let responseGetProdutoByCategoria = await fetch(urlProduto);
            
            let responseGetProduto = await responseGetProdutoByCategoria.json(); // lê o corpo da resposta e converte para o formato JSON

            for(var i=0; i<responseGetProduto.length; i++) { // para cada index no JSON, faça:

                // const rowProdutos

                    // criação do articleProduto
                    var articleProduto = document.createElement('article');
                    articleProduto.classList.add('box');
                    articleProduto.classList.add('excerpt');
                    articleProduto.classList.add('col-12');
                    articleProduto.classList.add('col-12-large');

                        var aImgProduto = document.createElement('a');
                        aImgProduto.href = '#';
                        aImgProduto.classList.add('image');
                        aImgProduto.classList.add('left');

                            var imgProduto = document.createElement('img');
                            imgProduto.style = 'max-width: 640px; max-height: 430px;';

                            let urlImagem = 'http://localhost:8080/LojaDeDoces/api/imagem/' + responseGetProduto[i].id;
                            let responseImagem = await fetch(urlImagem);
                    
                            let commitsImagem = await responseImagem.json(); // lê o corpo da resposta e converte para o formato JSON

                            imgProduto.src=commitsImagem.message;
                        
                        aImgProduto.append(imgProduto);

                        var divProduto = document.createElement('div');

                            var headerProduto = document.createElement('header');

                                var h3Produto = document.createElement('h3');

                                    var aTituloProduto = document.createElement('a');
                                    aTituloProduto.href = '#';
                                    aTituloProduto.innerText = responseGetProduto[i].titulo;

                                h3Produto.append(aTituloProduto);

                            headerProduto.append(h3Produto);

                            var pDescricaoProduto = document.createElement('p');
                            pDescricaoProduto.innerText = 'Descrição: ' + responseGetProduto[i].descricao;

                            var pValorProduto = document.createElement('p');
                            pValorProduto.innerText = 'Valor: ' + responseGetProduto[i].preco;

                            var pCategoria1Produto = document.createElement('p');
                            pCategoria1Produto.innerText = 'Categoria 1: ' + responseGetProduto[i].categoria1;

                            var pCategoria2Produto = document.createElement('p');
                            pCategoria2Produto.innerText = 'Categoria 2: ' + responseGetProduto[i].categoria2;

                            var pCategoria3Produto = document.createElement('p');
                            pCategoria3Produto.innerText = 'Categoria 3: ' + responseGetProduto[i].categoria3;

                            var btnComprarProduto = document.createElement('input');
                            btnComprarProduto.style = 'width: auto; margin-right: 2px; margin-top: 20px;';
                            btnComprarProduto.type = 'button';
                            btnComprarProduto.value = 'Comprar';
                            btnComprarProduto.setAttribute("id", 'btnComprarProduto' + responseGetProduto[i].id);

                        divProduto.append(headerProduto, pDescricaoProduto, pValorProduto, pCategoria1Produto, pCategoria2Produto, pCategoria3Produto, btnComprarProduto);
                    articleProduto.append(aImgProduto, divProduto);

                rowProdutos.append(articleProduto);

                const btnComprarProdutoGerado = document.querySelector('#' + btnComprarProduto.id);

                if(btnComprarProdutoGerado) {

                    /* btnComprarProdutoGerado */
                    btnComprarProdutoGerado.addEventListener('click', function() {
                        btnComprarProdutoRequest(btnComprarProdutoGerado.id);
                    });  
                }
            }
            // const rowProdutos

                // criação do divCategoriaFim
                var divCategoriaFim = document.createElement('div');
                divCategoriaFim.classList.add('col-12');

                    var pCategoriaFim = document.createElement('p');
                    pCategoriaFim.innerText = 'Nos acompanhe também nas redes sociais, estamos sempre ativos, postando novos sabores e  vídeos e fotos que vocês amam.';

                divCategoriaFim.append(pCategoriaFim);

            rowProdutos.append(divCategoriaFim);
        }
    } catch (e) {
        alert('Erro ao buscar');
    }
}

async function btnComprarProdutoRequest(id) {

    /* Session Storage load */
    sessionStorage.setItem('IsSessionStorageUsed', 'true');
    sessionStorage.setItem('IsBtnBuscarUsed', 'false');
    sessionStorage.setItem('SweetSugarId', id.slice(17));

    window.location.href = "carrinho.html";
}