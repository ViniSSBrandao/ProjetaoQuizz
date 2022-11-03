let listaQuizz = []; //Lista com todos os quizzes


pegarQuizzes();

//sumário funçoes//
/*

pegarQuizzes - puxa da api os quizzes a serem selecionados
renderizarQuizz - mostra no site o quizz a ser renderizado

clicouQuizz - função executada ao clicar num quizz (abre quizz)
voltarHome - limpa o html e volta ao inicio


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
        <div><img src="https://c.wallhere.com/photos/f0/b5/mai_sakurajima_Seishun_Buta_Yarou_wa_Bunny_Girl_Senpai_no_Yume_o_Minai_anime-1791357.jpg!d" alt=""></div>
        <div class="nome_quizz"><h1>DESCUBRA SUA WAIFU! Qual a sua cara metade nos animes?</h1></div>
        </div>
    `;

    console.log(quizz);
}

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

<button onclick="voltarHome()">     VOLTAR       </button>
`;


    console.log(selecionado);

}


function voltarHome(){
    clear = document.querySelector('main');
    bannerRemove = document.querySelector('header');
    
    bannerRemove.innerHTML = `
    <div>
        BuzzQuizz
        </div>
    `;

    clear.innerHTML = `
    
    <div class="criar_quizz">

    </div>

    <div class="lista_quizz">

    </div>
    `;
    
    pegarQuizzes();
}