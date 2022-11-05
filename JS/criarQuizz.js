let novoQuizz = {
    title: "",
    image: "",
    questions: [],
    levels: []
};

function criarNovoQuizz() {
    document.querySelector(".lista_quizz_usuario").classList.add("escondido");
    document.querySelector(".lista_quizz").classList.add("escondido");
    document.querySelector(".criar_quizz").classList.remove("escondido");
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
                <input class="resposta" type="text" placeholder="Resposta correta" required>
                <input class="imagem" type="url" placeholder="URL da imagem" required>

                <label>Respostas incorretas</label>
                <input class="resposta" type="text" placeholder="Resposta incorreta 1" required>
                <input class="imagem" type="url" placeholder="URL da imagem 1" required><br/>
                <input class="resposta" type="text" placeholder="Resposta incorreta 2">
                <input class="imagem" type="url" placeholder="URL da imagem 2"><br/>
                <input class="resposta" type="text" placeholder="Resposta incorreta 3">
                <input class="imagem" type="url" placeholder="URL da imagem 3"><br/>
            </div>`;
    }
    perguntasForm.innerHTML += `<button type="submit">Prosseguir pra criar níveis</button>`;

    const niveisForm = document.querySelector("form.niveis");
    for (let i = 1; i < novoQuizz.levels.length; i++)
    {
        niveisForm.innerHTML += `
            <div>
                <label>Nível ${i + 1}</label>
                <input class="titulo" type="text" placeholder="Título do nível" required minlength="10">
                <input class="porcentagem_acerto" type="number" placeholder="% de acerto mínima" required min="0" max="100">
                <input class="imagem" type="url" placeholder="URL da imagem do nível" required>
                <textarea class="descricao" type="text" placeholder="Descrição do nível" required minlength="30"></textarea>
            </div>`;
    }
    niveisForm.innerHTML += `<button type="submit">Finalizar Quizz</button>`;

    const sucessoQuizz = document.querySelector(".sucesso_quizz");
    sucessoQuizz.querySelector(".imagem").style.backgroundImage = `linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0), rgba(0,0,0,.5), rgba(0,0,0,.8)), url('${novoQuizz.image}')`;
    sucessoQuizz.querySelector(".titulo").innerHTML = novoQuizz.title;

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

        const respostaElementos = perguntaElementos[i].querySelectorAll(".resposta");
        const imagemElementos = perguntaElementos[i].querySelectorAll(".imagem");
        for (let x = 0; x < 4; x++)
        {
            if (respostaElementos[x].value === '' || imagemElementos[x].value === '') continue;

            const resposta = {
                text: respostaElementos[x].value,
                image: imagemElementos[x].value,
                isCorrectAnswer: Boolean(x === 0)
            };

            pergunta.answers.push(resposta);
        }
        novoQuizz.questions[i] = pergunta;
    }

    document.querySelector(".perguntas").classList.add("escondido");
    document.querySelector(".niveis").classList.remove("escondido");
}

function enviaNiveis() {
    let nivelElementos = document.querySelectorAll(".niveis div")

    for (let i = 0; i < novoQuizz.levels.length; i++)
    {
        const nivel = {
            title: nivelElementos[i].querySelector(".titulo").value,
            image: nivelElementos[i].querySelector(".imagem").value,
            text: nivelElementos[i].querySelector(".descricao").value,
            minValue: nivelElementos[i].querySelector(".porcentagem_acerto").value
        };
        novoQuizz.levels[i] = nivel;
    }

    const promisse = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", novoQuizz);
    promisse.then((response) => {
        console.log(response);
        document.querySelector(".niveis").classList.add("escondido");
        document.querySelector(".sucesso_quizz").classList.remove("escondido");
    });
    promisse.catch((response) => console.log(response));

}

function mudaCor(element) {
    const hexadecimal = element.parentElement.querySelector("span");
    hexadecimal.innerHTML = element.value;
}