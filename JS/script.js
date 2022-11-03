let listaQuizz = []; //Lista com todos os quizzes

/*
pegarQuizzes();
*/
function pegarQuizzes() {
    let promisse = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promisse.then((response) => {
        listaQuizz = response.data;
        for (let i = 0; i < listaQuizz.length; i++)
        {
            renderizaQuizz(listaQuizz[i]);
        }
     });
    promisse.catch((response) => { console.log(response) });
}

function renderizaQuizz(quizz) {
    place = document.querySelector('.lista_quizz');
    console.log(place);
    place.innerHTML += `
        <div class="quizz" id="" onclick='clicouQuizz(this)'>
        <div><img src="https://www.crunchyroll.com/imgsrv/display/thumbnail/1200x675/catalog/crunchyroll/e3f6c36d65ba484f80e778a2c12105be.jpeg" alt=""></div>
        <div class="nome_quizz"><h1>DESCUBRA SUA WAIFU! Qual a sua cara metade nos animes?</h1></div>
        </div>
    `;

    console.log(quizz);
}

function clicouQuizz(selecionado){

    place = document.querySelector('main')

    place.innerHTML = ``


    console.log(selecionado);

}