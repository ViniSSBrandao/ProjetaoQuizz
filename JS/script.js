let listaQuizz = []; //Lista com todos os quizzes
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
    //console.log(place);
    place.innerHTML += `
        <div class="quizz" id="${quizz.id}" onclick='clicouQuizz(${quizz.id})'>
        <div><img src="${quizz.image}" alt=""></div>
        <div class="nome_quizz"><h1>${quizz.title}</h1></div>
        </div>
    `;

    //console.log(quizz);
}


/* Ainda está como um template em html. precisa deixar bonitinho */
function clicouQuizz(selecionado){
    console.log(selecionado);
    quizzSelecionado = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${selecionado}`);
    

    quizzSelecionado.then(exibirQuizz);
    /*quizzSelecionado.catch(alert("Erro! Tente selecionar novamente"))*/

    
    
    
}


function exibirQuizz(selecionado){
   
    console.log(selecionado);
    place = document.querySelector('main');
    bannerPlace = document.querySelector('header');
    id = selecionado.id;
    console.log("awa "+id);
    bannerPlace.innerHTML += `
    <div class="banner" style="background: linear-gradient(0deg,
        rgba(0, 0, 0, 0.57),
        rgba(0, 0, 0, 0.57)), url(${selecionado.data.image});">
    
    </div>
    `;
    console.log("tedio "+selecionado.data.image)
    len = Object.keys(selecionado.data).length;

    place.innerHTML = `
    <div class="pergunta_caixa pergunta0" id="pergunta0">
    
            <div class="pergunta" id="" style="background-color:${selecionado.data.questions[0].color};">
                <div class="pergunta_texto" ><p>${selecionado.data.questions[0].title}</p></div>
            </div>
            
        <div class="option_box" >
            
        
           

        </div>    
    </div>
        
        
        `;

    for(let j=1; j<len; j++){
        place.innerHTML += `
        <div class="pergunta_caixa " id="pergunta${j}">
        
                <div class="pergunta" id="" style="background-color:${selecionado.data.questions[j].color};">
                    <div class="pergunta_texto" ><p>${selecionado.data.questions[j].title}</p></div>
                </div>
                
            <div class="option_box" id=${j} >
                
            
            

            </div>    
        </div>
            
            
            `;
    }
        
        console.log("len" +len);
        for(contador = 0; contador<len; contador++){
            console.log("contador " + contador);
            for(let i=0; i<4; i++){
                opcoesQuizz(selecionado, i, contador);
         }
         perguntaNova(contador, place , selecionado);
         
        }

        resultado(place, acertos, erros, selecionado.data.levels);
        
    }
    
function opcoesQuizz(selecionado, i, aux){
    console.log(aux + aux)
    colocaPergunta = document.querySelector(`#pergunta${aux}`);
    certo = selecionado.data.questions[aux].answers[i].isCorrectAnswer;
    if(certo==true){
        certo="correta";
    }
    else{
        certo="incorreta";
    }
    console.log(certo);
            colocaPergunta.innerHTML += `
            <div class="option, opt${i}" id="${certo}" onclick="optionClick(this, ${aux}, ${i})">
                <img src="${selecionado.data.questions[contador].answers[i].image}" alt="">
                <div class="option_name"><h4>${selecionado.data.questions[contador].answers[i].text}</h4></div>
            `


    colocaPergunta

}

function perguntaNova(contador, place, selecionado){
    console.log(selecionado)
    console.log(contador)
    place += `
    <div class="pergunta_caixa" id="">
        <div class="pergunta" id="" style="background-color:${selecionado.data.questions[contador].color};">
            <div class="pergunta_texto" ><p>${selecionado.data.questions[contador].title}</p></div>
        </div>
        <div class="option_box" id=${contador} >   
        </div>  
    </div>
     `;
}

function optionClick(clicada, aux, i){
    unselected = document.querySelector(`#pergunta${aux}`)
    console.log(unselected);
    unselected.querySelector(".opt0").classList.add("unselected");
    unselected.querySelector(".opt1").classList.add("unselected");
    unselected.querySelector(".opt2").classList.add("unselected");
    unselected.querySelector(".opt3").classList.add("unselected");

    clicada.classList.remove("unselected");
    clicada.classList.add("selected");


}

function resultado(place, acertos, erros, src){
    //inserir lógica de resultados

    let percentil = (erros/acertos)*100;

    place.innerHTML += `
    <div class="caixa_resultado">

        <div class="resultado_header">
        <div>joooooooooooj</div>
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

