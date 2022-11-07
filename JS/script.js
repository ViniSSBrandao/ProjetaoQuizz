let listaQuizz = []; //Lista com todos os quizzes
let listaQuizzUsuario = recuperaDados();
let place, erros, acertos;
let contador;


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

        resultado(place, acertos, erros);
    }
    
function opcoesQuizz(selecionado, i, aux){
    console.log(aux + aux)
    colocaPergunta = document.querySelector(`#pergunta${aux}`);
    /*certo = selecionado.data.questions[contador].answers[i].isCorrectAnswer;
    if(certo==true){
        certo="correta";
    }
    else{
        certo="incorreta";
    }*/
            colocaPergunta.innerHTML += `
            <div class="option selected" id="${1}">
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