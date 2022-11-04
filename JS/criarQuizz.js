let novoQuizz = {
    title: "",
    image: "",
    questions: [],
    levels: []
};
let questions;
let answers;
let level;

resetarNovoQuizz();

function resetarNovoQuizz() {
    novoQuizz = {
        title: "",
        image: "",
        questions: [],
        levels: []
    };
    questions = {
        title: '',
        color: '',
        answers: []
    };
    answers = {
        text: '',
        image: '',
        isCorrectAnswer: false
    };

    levels = {
        title: '',
        image: '',
        text: '',
        minValue: 0
    };
}


function enviaInformacoesBasicas() {
    novoQuizz.title = document.querySelector(".informacoes_basicas .titulo").value;
    novoQuizz.image = document.querySelector(".informacoes_basicas .imagem").value;
    novoQuizz.questions.length = document.querySelector(".informacoes_basicas .qtd_perguntas").value;
    novoQuizz.levels.length = document.querySelector(".informacoes_basicas .qtd_niveis").value;

    const perguntasForm = document.querySelector("form.perguntas");
    for (let i = 0; i < novoQuizz.questions.length; i++)
    {
        perguntasForm.innerHTML += `
            <div>
                <label>Pergunta ${i + 1}</label>
                <input class="titulo" type="text" placeholder="Texto da pergunta" required minlength="20" maxlength="50">
                <label>Cor de fundo da pergunta: <span class="cor">#000000</span></label> <input type="color" oninput="mudaCor(this)">

                <label>Resposta correta</label>
                <input class="resposta" type="text" placeholder="Resposta correta">
                <input class="imagem" type="url" placeholder="URL da imagem">

                <label>Respostas incorretas</label>
                <input class="resposta" type="text" placeholder="Resposta incorreta 1">
                <input class="imagem" type="url" placeholder="URL da imagem 1"><br/>
                <input class="resposta" type="text" placeholder="Resposta incorreta 2">
                <input class="imagem" type="url" placeholder="URL da imagem 2"><br/>
                <input class="resposta" type="text" placeholder="Resposta incorreta 3">
                <input class="imagem" type="url" placeholder="URL da imagem 3"><br/>
            </div>`;
        if (i === novoQuizz.questions.length - 1)
        {
            perguntasForm.innerHTML += `<button type="submit">Prosseguir pra criar níveis</button>`
        }
    }

    document.querySelector(".informacoes_basicas").classList.add("escondido");
    document.querySelector(".perguntas").classList.remove("escondido");
}

function enviaPerguntas() {
    let perguntaElementos = document.querySelectorAll(".perguntas div");
    for (let i = 0; i < novoQuizz.questions.length; i++)
    {
        const pergunta = {
            title: perguntaElementos[i].querySelector(".titulo").value,
            color: perguntaElementos[i].querySelector(".cor").innerHTML,
            answers: []
        };

        for (let x = 0; x < 4; x++)
        {
            if (perguntaElementos[i].querySelector(".resposta").value === '') return;
            const resposta = {
                text: perguntaElementos[i].querySelector(".resposta").value,
                image: perguntaElementos[i].querySelector(".imagem").value,
                isCorrectAnswer: Boolean(x === 0)
            };

            pergunta.answers.push(resposta);
        }
        novoQuizz.questions[i] = pergunta;
    }
}

function mudaCor(element) {
    const hexadecimal = element.parentElement.querySelector("span");
    hexadecimal.innerHTML = element.value;
}