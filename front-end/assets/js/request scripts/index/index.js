const ulCategorias = document.querySelector('#ulCategorias');
const rowProdutos = document.querySelector('#rowProdutos');
const txtBusca = document.querySelector('#txtBusca');
const btnBuscar = document.querySelector('#btnBuscar');

var token = '';
var email = '';

if(ulCategorias, rowProdutos, txtBusca, btnBuscar) {
    addEvents();
}

async function addEvents() {
    try {
        if(sessionStorage.getItem('IsSessionStorageUsed').includes('true')) {
            try {
                if(sessionStorage.getItem('TokenLogin')) {
                    token = sessionStorage.getItem('TokenLogin');
                    email = sessionStorage.getItem('EmailLogin');
                }
            } catch (e) {
    
            }
        }
    } catch (e) {

    }

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

            // const rowProdutos

                // criação do divCategoria
                var divCategoriaBody = document.createElement('div');
                divCategoriaBody.classList.add('col-4');
                divCategoriaBody.classList.add('col-12-medium');

                    var sectionCategoriaBody = document.createElement('section');

                        var headerCategoriaBody = document.createElement('header');

                            var aCategoriaNav = document.createElement('a');
                            aCategoriaNav.setAttribute('id', commitCategorias[i].categoria.replace(/[\s]+/g, '-'));
                            aCategoriaNav.style = "text-decoration: none;";
                        
                                var h3CategoriaBody = document.createElement('h3');
                                h3CategoriaBody.innerText = commitCategorias[i].categoria;
                                h3CategoriaBody.style = "cursor: pointer;";

                            aCategoriaNav.append(h3CategoriaBody);

                        headerCategoriaBody.append(aCategoriaNav);
                            
                    sectionCategoriaBody.append(headerCategoriaBody);

                divCategoriaBody.append(sectionCategoriaBody);

            rowProdutos.append(divCategoriaBody);

            const categoria = document.querySelector('#' + commitCategorias[i].categoria.replace(/[\s]+/g, '-'));

            categoria.onclick = function () {
                sessionFunction(categoria.id);
            };
        }
        // const rowProdutos

            // criação do divCategoriaFim
            var divCategoriaFim = document.createElement('div');
            divCategoriaFim.classList.add('col-12');

                var pCategoriaFim = document.createElement('p');
                pCategoriaFim.innerText = 'Nos acompanhe também nas redes sociais, estamos sempre ativos, postando novos sabores e  vídeos e fotos que vocês amam.';

            divCategoriaFim.append(pCategoriaFim);

        rowProdutos.append(divCategoriaFim);

        /* GET avisos */
        let urlAviso = 'http://localhost:8080/LojaDeDoces/api/aviso';
        let responseGetAviso = await fetch(urlAviso);
        
        let commitAviso = await responseGetAviso.json(); // lê o corpo da resposta e converte para o formato JSON

        for(var i=0; i<commitAviso.length; i++) { // para cada index no JSON, faça:
            alert(commitAviso[i].descricao);
        }

        /* btnBuscar */
        btnBuscar.addEventListener('click', function() {
            btnBuscarRequest();
        });   
    } catch (e) {
        alert('Erro ao buscar');
    }
}

async function sessionFunction(categoria) {

    /* Session Storage load */
    sessionStorage.setItem('IsSessionStorageUsed', 'true');

    sessionStorage.setItem('SweetSugarCategoria', categoria.replace(/[-]+/g, ' '));

    window.location.href = "indexProdutos.html";
}

async function btnBuscarRequest() {

    sessionStorage.setItem('IsSessionStorageUsed', 'true');
    sessionStorage.setItem('IsBtnBuscarUsed', 'true');
    sessionStorage.setItem('SweetSugarTitulo', txtBusca.value);

    window.location.href = "carrinho.html";
}