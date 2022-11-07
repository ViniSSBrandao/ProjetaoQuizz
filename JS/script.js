let listaQuizz = []; //Lista com todos os quizzes
let listaQuizzUsuario = recuperaDados();
let place, acertos = 0;
let contador, clicouAntes = [];

let quizzSelecionado;

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
    elemento.innerHTML += `
        <div class="quizz" id="" onclick='exibirQuizz(${quizz.id})'>
        <div class="imagem" style="background-image: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0), rgba(0,0,0,.5), rgba(0,0,0,.8)), url('${quizz.image}');"></div>
        <div class="nome_quizz">
        <h1>${quizz.title}</h1></div>
        </div>
    `;
}



function exibirQuizz(idQuizz) {
    quizzSelecionado = listaQuizzUsuario.find((quizz) => { if (quizz.id === idQuizz) return quizz });

    if (quizzSelecionado === undefined)
        quizzSelecionado = listaQuizz.find((quizz) => { if (quizz.id === idQuizz) return quizz });



    place = document.querySelector('main');
    bannerPlace = document.querySelector('header');
    setTimeout(focaElemento, 2000, bannerPlace);
    bannerPlace.innerHTML += `
    <div class="banner" style="background: linear-gradient(0deg,
        rgba(0, 0, 0, 0.57),
        rgba(0, 0, 0, 0.57)), url(${quizzSelecionado.image});">

    </div>
    `;
    let len = quizzSelecionado.questions.length;

    place.innerHTML = `
    <div class="pergunta_caixa" id="pergunta0">
        <div class="pergunta" id="" style="background-color:${quizzSelecionado.questions[0].color};">
            <div class="pergunta_texto" ><p>${quizzSelecionado.questions[0].title}</p></div>
        </div>

        <div class="option_box" id="0">
        </div>
    </div> `;

    for(let j=1; j<len; j++){
        place.innerHTML += `
        <div class="pergunta_caixa " id="pergunta${j}">

                <div class="pergunta" id="" style="background-color:${quizzSelecionado.questions[j].color};">
                    <div class="pergunta_texto" ><p>${quizzSelecionado.questions[j].title}</p></div>
                </div>

            <div class="option_box" id="${j}" >

            </div>
        </div>


            `;
    }

    for (contador = 0; contador < len; contador++)
    {
        let respostasAleatorias = quizzSelecionado.questions[contador].answers.sort(comparador);
        for(let i=0; i < respostasAleatorias.length; i++){
            opcoesQuizz(respostasAleatorias[i], i, contador);
        }

        perguntaNova(contador, place , quizzSelecionado);
    }
}

function opcoesQuizz(resposta, i, aux){
    colocaPergunta = document.querySelector(`#pergunta${aux} .option_box`);
    let certo = resposta.isCorrectAnswer;
    if(certo){
        certo = "correta";
    }
    else{
        certo = "incorreta";
    }
    colocaPergunta.innerHTML += `
    <div class="option opt${i}" id="${certo}" onclick="optionClick(this, ${aux})">
        <img src="${resposta.image}" alt="">
        <div class="option_name"><h4>${resposta.text}</h4>
    </div>`;

}

function perguntaNova(contador, _place, selecionado) {
    _place += `
    <div class="pergunta_caixa">
        <div class="pergunta" style="background-color:${selecionado.questions[contador].color};">
            <div class="pergunta_texto" ><p>${selecionado.questions[contador].title}</p></div>
        </div>
        <div class="option_box" id="${contador}" >
        </div>
    </div>
     `;
}

function optionClick(clicada, aux){
    if(clicouAntes.includes(aux)){
        return;
    }
    const options = clicada.parentElement.querySelectorAll(`.option`)

    for (let i = 0; i < options.length; i++)
    {
        if (options[i] === clicada)
        {
            options[i].classList.add("selected");
            if (clicada.id === "correta")
                acertos++;
        }
        else
        {
            options[i].classList.add("unselected");
        }
    }

    clicouAntes.push(aux)

    if (clicouAntes.length === quizzSelecionado.questions.length)
    {
        resultado();
        setTimeout(focaElemento, 2000, document.querySelector(".caixa_resultado"));
    }
    else
    {
        setTimeout(focaElemento, 2000, document.querySelector(`#pergunta${aux + 1}`));
    }
}

function resultado(){
    //inserir lógica de resultados

    let percentual = (acertos * 100) / quizzSelecionado.questions.length;
    console.log(percentual);

    const niveis = quizzSelecionado.levels.filter((level) => { if (level.minValue <= percentual) return level; });


    niveis.sort((a, b) => { return a.minValue - b.minValue; });
    console.log(niveis);
    let nivelUsuario = niveis[niveis.length - 1];


    place.innerHTML += `
    <div class="caixa_resultado">
        <div class="resultado_header">
        <div>${parseInt(percentual)}% de acerto: ${nivelUsuario.title}</div>
        </div>

        <div class="container_row">
            <div class="resultado_img">
            <img src="${nivelUsuario.image}">
            </div>

            <div class="resultado_text">
            <p>${nivelUsuario.text}<p>
            </div>
        </div>
    </div>

    <button onclick="reiniciarQuizz()" class="reiniciar_quizz">Reiniciar Quizz</button>
    <p onclick="voltarHome()" class="voltar">Voltar pra home</p>`;
}

function reiniciarQuizz() {
    acertos = 0;
    clicouAntes = [];

    exibirQuizz(quizzSelecionado.id);
}


function focaElemento(elemento) {
    elemento.scrollIntoView();
}


function voltarHome(){
    window.location.reload();
}

function recuperaDados() {
    const quizzSerializado = localStorage.getItem("listaQuizzUsuario");

    if (quizzSerializado === null) return [];

    return JSON.parse(quizzSerializado);
}

function comparador() {
	return Math.random() - 0.5;
}