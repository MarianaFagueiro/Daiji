/* =========================================================
   DAIJI
   TELEMEDICINA
========================================================= */


/* =========================================================
   CONFIGURAÇÃO DR.ONLINE

   Substitua depois pelo endereço oficial
   que será utilizado pela integração
========================================================= */

const DR_ONLINE_URL = "#"



/* =========================================================
   ELEMENTOS
========================================================= */

const publicActions =
    document.getElementById(
        "publicActions"
    )


const scoreActions =
    document.getElementById(
        "scoreActions"
    )


const scoreContextSection =
    document.getElementById(
        "scoreContextSection"
    )


const contextScore =
    document.getElementById(
        "contextScore"
    )


const contextIndicator =
    document.getElementById(
        "contextIndicator"
    )


const contextIndicatorValue =
    document.getElementById(
        "contextIndicatorValue"
    )


const contextTitle =
    document.getElementById(
        "contextTitle"
    )


const contextDescription =
    document.getElementById(
        "contextDescription"
    )


const drOnlineButton =
    document.getElementById(
        "drOnlineButton"
    )



/* =========================================================
   PARÂMETROS RECEBIDOS
========================================================= */

const parametros =
    new URLSearchParams(
        window.location.search
    )


const origem =
    parametros.get("origem")


const score =
    parametros.get("score")


const indicador =
    parametros.get("indicador")


const valor =
    parametros.get("valor")



/* =========================================================
   VERIFICA SE VEIO DO SCORE
========================================================= */

function configurarOrigem() {

    if (origem !== "score") {

        return

    }


    /*
        Esconde os CTAs públicos
    */

    publicActions.style.display =
        "none"


    /*
        Mostra botão de retorno ao Score
    */

    scoreActions.style.display =
        "flex"


    /*
        Mostra contexto
    */

    scoreContextSection.classList.add(
        "visible"
    )


    preencherContexto()

}



/* =========================================================
   PREENCHER CONTEXTO
========================================================= */

function preencherContexto() {

    if (score) {

        contextScore.textContent =
            score

    }


    if (indicador) {

        contextIndicator.textContent =
            indicador


        contextTitle.textContent =
            `Seu indicador de ${indicador.toLowerCase()} merece atenção`

    }


    if (valor) {

        contextIndicatorValue.textContent =
            `${valor}%`

    }


    if (indicador) {

        contextDescription.textContent =
            criarDescricao(
                indicador
            )

    }

}



/* =========================================================
   DESCRIÇÃO DE ACORDO COM INDICADOR
========================================================= */

function criarDescricao(
    indicador
) {

    const nome =
        indicador.toLowerCase()


    if (nome === "sono") {

        return (
            "Você já recebeu sugestões relacionadas à sua rotina " +
            "de sono. Caso ainda tenha dúvidas sobre esse indicador " +
            "ou queira uma orientação individual, você pode conversar " +
            "com um profissional."
        )

    }


    if (
        nome === "bem-estar" ||
        nome === "bem estar"
    ) {

        return (
            "Seu acompanhamento mostrou um ponto de atenção relacionado " +
            "ao bem-estar. Se você quiser compreender melhor esse momento, " +
            "a telemedicina pode ser um próximo passo."
        )

    }


    if (nome === "atividade") {

        return (
            "Seu indicador de atividade faz parte do acompanhamento " +
            "realizado pela Daiji. Caso tenha dúvidas sobre como adaptar " +
            "sua rotina, você pode buscar orientação profissional."
        )

    }


    return (
        "Você já consultou as orientações disponíveis na Daiji. " +
        "Se ainda tiver dúvidas ou quiser uma avaliação individual, " +
        "você pode continuar a jornada por telemedicina."
    )

}



/* =========================================================
   DR.ONLINE
========================================================= */

drOnlineButton.addEventListener(
    "click",
    () => {

        /*
            Enquanto o link oficial
            ainda não estiver configurado
        */

        if (
            !DR_ONLINE_URL ||
            DR_ONLINE_URL === "#"
        ) {

            alert(
                "O endereço da Dr.Online ainda precisa ser configurado."
            )

            return

        }


        window.open(
            DR_ONLINE_URL,
            "_blank",
            "noopener,noreferrer"
        )

    }
)



/* =========================================================
   INICIAR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    configurarOrigem
)