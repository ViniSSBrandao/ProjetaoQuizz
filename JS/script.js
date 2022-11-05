let listaQuizz = []; //Lista com todos os quizzes
let listaQuizzUsuario = recuperaDados();
let place, erros, acertos;


pegarQuizzes();

//sumário funçoes//
/*

pegarQuizzes - puxa da api os quizzes a serem selecionados
renderizarQuizz - mostra no site o quizz a ser renderizado

clicouQuizz - função executada ao clicar num quizz (abre quizz)
voltarHome - limpa o html e volta ao inicio

resultado - exibe o resultado do quizz
informacoesBasicas -  Criação de Quizz

recuperaDados - procura pelo aquivo guardado no computador, se tiver ele converte e retorna a lista, se não, retorna um array vazio

*/

function pegarQuizzes() {
    let promisse = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promisse.then((response) => {
        listaQuizz = response.data;
        for (let i = 0; i < listaQuizz.length; i++)
        {
            renderizaQuizz(listaQuizz[i], document.querySelector('.lista_quizz'));
        }

        if (listaQuizzUsuario.length > 0)
        {
            for (let i = 0; i < listaQuizzUsuario.length; i++)
            {
                renderizaQuizz(listaQuizzUsuario[i], document.querySelector(".lista_quizz_usuario .lista"));
            }
            document.querySelector(".lista_usuario").classList.remove("escondido");
            document.querySelector(".nenhum_quizz").classList.add("escondido");
        }

     });
    promisse.catch((response) => { console.log(response) });
}

function renderizaQuizz(quizz, elemento) {
    //console.log(place);
    elemento.innerHTML += `
        <div class="quizz" id="" onclick='clicouQuizz(this)'>
        <div class="imagem" style="background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0), rgba(0,0,0,.5), rgba(0,0,0,.8)), url('${quizz.image}');"></div>
        <div class="nome_quizz">
        <h1>${quizz.title}</h1></div>
        </div>
    `;

    //console.log(quizz);
}


/* Ainda está como um template em html. precisa deixar bonitinho */
function clicouQuizz(selecionado){


    place = document.querySelector('main');
    bannerPlace = document.querySelector('header');

    bannerPlace.innerHTML += `
    <div class="banner">

    </div>
    `;

    place.innerHTML = `
    <div class="pergunta_caixa" id="">

    <div class="pergunta" id="">
        <div class="pergunta_texto"><p>AQUI VAI A pergunta</p></div>
    </div>

    <div class="option_box">
        <div class="option selected" id="">
            <img src="https://static.anime21.blog.br/2021/04/11-4-1200x675-cropped.jpg" alt="">
            <div class="option_name"><h4>questão</h4></div>
        </div>

        <div class="option unselected" id="">
            <img src="https://www.comboinfinito.com.br/principal/wp-content/uploads/2020/07/Re-zero-rem-02-896x504-1.jpg" alt="">
            <div class="option_name"><h4>questão</h4></div>
        </div>

        <div class="option unselected" id="">
            <img src="https://www.comboinfinito.com.br/principal/wp-content/uploads/2020/07/Re-zero-rem-02-896x504-1.jpg" alt="">
            <div class="option_name"><h4>questão</h4></div>
        </div>

        <div class="option unselected" id="">
            <img src="https://www.comboinfinito.com.br/principal/wp-content/uploads/2020/07/Re-zero-rem-02-896x504-1.jpg" alt="">
            <div class="option_name"><h4>questão</h4></div>
        </div>
    </div>
</div>


`;


    console.log(selecionado);
    resultado(place, acertos, erros);
}

function resultado(place, acertos, erros){
    //inserir lógica de resultados

    let percentil = (erros/acertos)*100;

    place.innerHTML += `
    <div class="caixa_resultado">

        <div class="resultado_header">
        <div>joooooooooooj</div>
        </div>

        <div class="container_row">
            <div class="resultado_img">
            <img src="https://steamuserimages-a.akamaihd.net/ugc/495780761315593167/44E8B4F92DB9DC92646213D847F3B9F61C680C4D/?imw=1024&imh=576&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true">
            </div>

            <div class="resultado_text">
            <p>ssssssssssss<p>
            </div>
        </div>
    </div>

    <button onclick="voltarHome()" class="voltar">     Voltar ao menu       </button>
    `

}

function voltarHome(){
    window.location.reload();
}

function recuperaDados() {
    const quizzSerializado = localStorage.getItem("listaQuizzUsuario");

    if (quizzSerializado === null) return [];

    return JSON.parse(quizzSerializado);
}