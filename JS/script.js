let listaQuizz = []; //Lista com todos os quizzes

pegarQuizzes();

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