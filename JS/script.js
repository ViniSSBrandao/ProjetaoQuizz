let listaQuizz = []; //Lista com todos os quizzes
let listaQuizzUsuario = recuperaDados();
let place, erros, acertos;
let contador, clicouAntes = [];


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
        <div class="quizz" id="" onclick='exibirQuizz(${quizz.id})'>
        <div class="imagem" style="background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0), rgba(0,0,0,.5), rgba(0,0,0,.8)), url('${quizz.image}');"></div>
        <div class="nome_quizz">
        <h1>${quizz.title}</h1></div>
        </div>
    `;

    //console.log(quizz);
}



function exibirQuizz(idQuizz){
    const quizzSelecionado = listaQuizzUsuario.find((quizz) => { if (quizz.id === idQuizz) return quizz });

    if (quizzSelecionado === null)
        quizzSelecionado = listaQuizz.find((quizz) => { if (quizz.id === idQuizz) return quizz });



    console.log(quizzSelecionado);
    place = document.querySelector('main');
    bannerPlace = document.querySelector('header');
    bannerPlace.innerHTML += `
    <div class="banner" style="background: linear-gradient(0deg,
        rgba(0, 0, 0, 0.57),
        rgba(0, 0, 0, 0.57)), url(${quizzSelecionado.image});">

    </div>
    `;
    let len = quizzSelecionado.questions.length;

    place.innerHTML = `
    <div class="pergunta_caixa pergunta0" id="pergunta0">

            <div class="pergunta" id="" style="background-color:${quizzSelecionado.questions[0].color};">
                <div class="pergunta_texto" ><p>${quizzSelecionado.questions[0].title}</p></div>
            </div>

        <div class="option_box" >




        </div>
    </div>


        `;

    for(let j=1; j<len; j++){
        place.innerHTML += `
        <div class="pergunta_caixa " id="pergunta${j}">

                <div class="pergunta" id="" style="background-color:${quizzSelecionado.questions[j].color};">
                    <div class="pergunta_texto" ><p>${quizzSelecionado.questions[j].title}</p></div>
                </div>

            <div class="option_box" id=${j} >




            </div>
        </div>


            `;
    }

        console.log("len" +len);
        for(contador = 0; contador<len; contador++){
            console.log("contador " + contador);
            for(let i=0; i < quizzSelecionado.questions[contador].answers.length; i++){
                opcoesQuizz(quizzSelecionado, i, contador);
         }
         perguntaNova(contador, place , quizzSelecionado);

        }

        resultado(place, acertos, erros, quizzSelecionado.levels);

    }

function opcoesQuizz(selecionado, i, aux){
    console.log(aux + aux)
    colocaPergunta = document.querySelector(`#pergunta${aux}`);
    certo = selecionado.questions[aux].answers[i].isCorrectAnswer;
    if(certo==true){
        certo="correta";
    }
    else{
        certo="incorreta";
    }
    console.log(certo);
            colocaPergunta.innerHTML += `
            <div class="option, opt${i}" id="${certo}" onclick="optionClick(this, ${aux})">
                <img src="${selecionado.questions[contador].answers[i].image}" alt="">
                <div class="option_name"><h4>${selecionado.questions[contador].answers[i].text}</h4></div>
            `


    colocaPergunta

}

function perguntaNova(contador, _place, selecionado){
    console.log(selecionado)
    console.log(contador)
    _place += `
    <div class="pergunta_caixa" id="">
        <div class="pergunta" id="" style="background-color:${selecionado.questions[contador].color};">
            <div class="pergunta_texto" ><p>${selecionado.questions[contador].title}</p></div>
        </div>
        <div class="option_box" id=${contador} >
        </div>
    </div>
     `;
}

function optionClick(clicada, aux){
    if(clicouAntes.includes(aux)){
        return 0;
    }
    unselected = document.querySelector(`#pergunta${aux}`)
    console.log(unselected);
    unselected.querySelector(".opt0").classList.add("unselected");
    unselected.querySelector(".opt1").classList.add("unselected");
    unselected.querySelector(".opt2").classList.add("unselected");
    unselected.querySelector(".opt3").classList.add("unselected");

    clicada.classList.remove("unselected");
    clicada.classList.add("selected");
    clicouAntes.push(aux)

}

function resultado(place, acertos, erros, src){
    //inserir lógica de resultados

    let percentil = (erros/acertos)*100;


    place.innerHTML += `
    <div class="caixa_resultado">

        <div class="resultado_header">
        <div>${src[0].title}</div>
        </div>

        <div class="container_row">
            <div class="resultado_img">
            <img src="${src[0].image}">
            </div>

            <div class="resultado_text">
            <p>${src[0].text}<p>
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