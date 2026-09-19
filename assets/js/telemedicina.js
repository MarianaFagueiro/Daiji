/* =========================================================
   DAIJI
   TELEMEDICINA
========================================================= */


/*
    INSIRA AQUI, FUTURAMENTE,
    O ENDEREÇO REAL DA DR.ONLINE
*/

const DR_ONLINE_URL = ""



/* =========================================================
   ELEMENTOS
========================================================= */

const parametros =
    new URLSearchParams(
        window.location.search
    )


const origem =
    parametros.get("origem")


const plano =
    parametros.get("plano")


const score =
    parametros.get("score")


const indicador =
    parametros.get("indicador")


const valor =
    parametros.get("valor")



const publicActions =
    document.getElementById(
        "publicActions"
    )


const scoreActions =
    document.getElementById(
        "scoreActions"
    )


const scoreOriginSection =
    document.getElementById(
        "scoreOriginSection"
    )


const telePlanBadge =
    document.getElementById(
        "telePlanBadge"
    )


const scoreValue =
    document.getElementById(
        "scoreValue"
    )


const indicatorName =
    document.getElementById(
        "indicatorName"
    )


const indicatorValue =
    document.getElementById(
        "indicatorValue"
    )


const contextTitle =
    document.getElementById(
        "contextTitle"
    )


const contextText =
    document.getElementById(
        "contextText"
    )


const drOnlineButton =
    document.getElementById(
        "drOnlineButton"
    )


const heroDrOnlineButton =
    document.getElementById(
        "heroDrOnlineButton"
    )


const drConfigMessage =
    document.getElementById(
        "drConfigMessage"
    )


const startDaijiSection =
    document.getElementById(
        "startDaijiSection"
    )



/* =========================================================
   CONFIGURAÇÃO DA PÁGINA
========================================================= */

function configurarPagina() {


    if (
        origem === "score"
    ) {

        configurarOrigemScore()

        return

    }


    if (
        origem === "planos" &&
        plano === "essencial"
    ) {

        configurarOrigemEssencial()

        return

    }


    configurarPaginaPublica()

}



/* =========================================================
   VEIO DO PLANO ESSENCIAL
========================================================= */

function configurarOrigemEssencial() {


    telePlanBadge.style.display =
        "flex"


    publicActions.style.display =
        "flex"


    scoreActions.style.display =
        "none"


    scoreOriginSection.classList.remove(
        "visible"
    )



    if (startDaijiSection) {

        startDaijiSection.style.display =
            "block"

    }

}



/* =========================================================
   VEIO DO SCORE
========================================================= */

function configurarOrigemScore() {


    /*
        Não precisa mostrar CTA
        de cadastro para usuário
        que já está no app
    */

    publicActions.style.display =
        "none"


    scoreActions.style.display =
        "flex"


    telePlanBadge.style.display =
        "none"


    scoreOriginSection.classList.add(
        "visible"
    )



    if (startDaijiSection) {

        startDaijiSection.style.display =
            "none"

    }



    preencherContextoScore()

}



/* =========================================================
   ACESSO DIRETO
========================================================= */

function configurarPaginaPublica() {


    publicActions.style.display =
        "flex"


    scoreActions.style.display =
        "none"


    scoreOriginSection.classList.remove(
        "visible"
    )

}



/* =========================================================
   CONTEXTO SCORE
========================================================= */

function preencherContextoScore() {


    if (score) {

        scoreValue.textContent =
            score

    }



    if (indicador) {

        indicatorName.textContent =
            indicador


        contextTitle.textContent =
            criarTitulo(
                indicador
            )


        contextText.textContent =
            criarDescricao(
                indicador
            )

    }



    if (valor) {

        indicatorValue.textContent =
            `${valor}%`

    }

}



/* =========================================================
   TÍTULO DO INDICADOR
========================================================= */

function criarTitulo(
    indicador
) {


    return (
        `Seu indicador de ${indicador.toLowerCase()} merece atenção`
    )

}



/* =========================================================
   TEXTO DO INDICADOR
========================================================= */

function criarDescricao(
    indicador
) {


    const nome =
        indicador
            .toLowerCase()
            .trim()



    if (
        nome === "sono"
    ) {

        return (
            "Você já consultou sugestões relacionadas " +
            "à sua rotina de sono dentro da Daiji. " +
            "Caso ainda tenha dúvidas ou queira uma " +
            "orientação individual, você pode conversar " +
            "com um profissional."
        )

    }



    if (
        nome === "bem-estar" ||
        nome === "bem estar"
    ) {

        return (
            "Seu acompanhamento indicou um ponto de atenção " +
            "relacionado ao bem-estar. Se você quiser " +
            "compreender melhor esse momento, uma conversa " +
            "com um profissional pode ser um próximo passo."
        )

    }



    if (
        nome === "atividade"
    ) {

        return (
            "Seu indicador de atividade faz parte do seu " +
            "acompanhamento na Daiji. Caso tenha dúvidas " +
            "sobre como adaptar sua rotina ao seu contexto, " +
            "você pode buscar orientação profissional."
        )

    }



    if (
        nome === "rotina"
    ) {

        return (
            "A Daiji acompanha aspectos da sua rotina " +
            "para ajudar você a perceber mudanças ao longo " +
            "do tempo. Caso queira discutir essas informações " +
            "individualmente, você pode conversar com um profissional."
        )

    }



    return (
        "Você já consultou as orientações disponíveis na Daiji. " +
        "Caso ainda tenha dúvidas ou queira uma avaliação individual, " +
        "você pode continuar sua jornada por telemedicina."
    )

}



/* =========================================================
   DR.ONLINE
========================================================= */

function abrirDrOnline() {


    /*
        Ainda sem URL configurada
    */

    if (
        !DR_ONLINE_URL
    ) {

        drConfigMessage.textContent =
            "Integração com a Dr.Online pronta para receber o endereço oficial de acesso."



        document
            .getElementById("dr-online")
            .scrollIntoView(
                {
                    behavior: "smooth",
                    block: "center"
                }
            )


        return

    }



    window.open(
        DR_ONLINE_URL,
        "_blank",
        "noopener,noreferrer"
    )

}



/* =========================================================
   BOTÕES
========================================================= */

if (
    drOnlineButton
) {

    drOnlineButton.addEventListener(
        "click",
        abrirDrOnline
    )

}



if (
    heroDrOnlineButton
) {

    heroDrOnlineButton.addEventListener(
        "click",
        abrirDrOnline
    )

}



/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    configurarPagina
)