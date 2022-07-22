const tituloProduto = document.querySelector('#titulo');
const descricaoProduto = document.querySelector('#descricao');
const valorProduto = document.querySelector('#valor');
const categoria1Produto = document.querySelector('#Categoria1');
const categoria2Produto = document.querySelector('#Categoria2');
const categoria3Produto = document.querySelector('#Categoria3');

const imgBrowserImg = document.querySelector('#imgBrowserImg');
const btnBrowserImg = document.querySelector('#btnBrowserImg');
const btnExcluirImg = document.querySelector('#btnExcluirImg');

const btnAdicionar = document.querySelector('#btnAdicionarProduto');

var token = '';
var email = '';

if(tituloProduto, descricaoProduto, valorProduto, categoria1Produto, categoria2Produto, categoria3Produto, imgBrowserImg, btnBrowserImg, btnExcluirImg, btnAdicionar) {
    addEvents();
}

function addEvents() {
    try {
        if(sessionStorage.getItem('IsSessionStorageUsed').includes('true')) {
            try {
                if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('true')) {
                    window.location.href = "index.html";
                } else if(sessionStorage.getItem('TokenLogin') && sessionStorage.getItem('IsLoginUser').includes('false')) {
                    token = sessionStorage.getItem('TokenLogin');
                    email = sessionStorage.getItem('EmailLogin');
                }
            } catch (e) {
        
            }
        } else {
            window.location.href = "login.html";
        }
    } catch (e) {
        window.location.href = "login.html";
    }

    /* btnBrowserImg */
    btnBrowserImg.addEventListener("change", function () {
        const file = btnBrowserImg.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);

            alert('Imagem Carregada')

            //convert image file to base64 string
            imgBrowserImg.src = reader.result;
        }
    });

    /* btnExcluirImg */
    btnExcluirImg.addEventListener('click', function() {
        btnExcluirImgRequest();
    });

    /* btnAdicionar */
    btnAdicionar.addEventListener('click', function() {
        btnAdicionarRequest();
    });
}

/* btnAdicionar request */
async function btnExcluirImgRequest() {
    try {
        if(btnBrowserImg.files[0]) {
            btnBrowserImg.value = null;
            imgBrowserImg.src = "images/pic07.jpg";
        } else {
            alert('Imagem não encontrada');
        }
    } catch (e) {
        alert(e.message);
    }
}

/* btnAdicionar request */
async function btnAdicionarRequest() {
    try {
        if(btnBrowserImg.files[0]) {
            let idRadom = Math.floor(Math.random() * 100000000) + 1;

            // cria os atributos e valores do arquivo JSON a ser enviado
            let produto = {
                id: idRadom,
                titulo: tituloProduto.value,
                descricao: descricaoProduto.value,
                preco: valorProduto.value,
                categoria1: categoria1Produto.value,
                categoria2: categoria2Produto.value,
                categoria3: categoria3Produto.value
            };
    
            // cria o request do tipo POST informando os headers e os dados do body convertidos para JSON
            let response = await fetch('http://localhost:8080/LojaDeDoces/api/produto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(produto)
            });
    
            let responseToJSON = await response.json(); // lê o corpo da resposta e converte para o formato JSON
    
            alert(responseToJSON.message);
    
            if(responseToJSON.message.includes('sucesso')) {

                var file = btnBrowserImg.files[0];
                var reader = new FileReader();

                reader.readAsDataURL(file);

                alert('Imagem Carregada');

                var arquivoImagem = reader.result;

                // cria o request do tipo POST informando os headers e os dados do body convertidos para JSON
                let responseImagem = await fetch('http://localhost:8080/LojaDeDoces/api/imagem/' + idRadom, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain',
                        'Authorization': 'Bearer ' + token
                    },
                    body: arquivoImagem
                });

                let responseToJSONImagem = await responseImagem.json(); // lê o corpo da resposta e converte para o formato JSON
    
                alert(responseToJSONImagem.message);
            }
        } else {
            alert('Imagem não encontrada');
        }
        
        window.location.href = "adicionarProduto.html";
    } catch (e) {
        alert(e.message);
    }
}
