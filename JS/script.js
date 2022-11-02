let listaQuizz = []; //Lista com todos os quizzes

//pegarQuizzes();

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
    //aqui entra o HTML
    console.log(quizz);
}

//  Criação de Quizz
function informacoesBasicas() {
    const input = document.querySelectorAll(".informacoes_basicas input");
    if (input[0].value.length <= 20 || input[0].value.length >= 65)
    {
        alert("O título deve ter no mínimo 20 caracteres e no máximo 65");
    }
    else if (input[2].value < 3)
    {
        alert("O quizz deve ter pelo menos 3 perguntas");
    }
    else if (input[3].value < 2)
    {
        alert("O quizz deve ter pelo menos 2 níveis");
    }
    else
    {
        document.querySelector("informacoes_basicas").classList.add("escondido");
        document.querySelector("perguntas").classList.remove("escondido");
    }
}