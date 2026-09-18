const formularioLogin = document.querySelector('#loginForm')

const mensagemLogin = document.querySelector('#loginMessage')


formularioLogin.addEventListener('submit', function (event) {

    event.preventDefault()


    if (!formularioLogin.checkValidity()) {

        formularioLogin.reportValidity()

        return

    }


    if (mensagemLogin) {

        mensagemLogin.textContent = 'Entrando...'

    }


    window.location.href = 'score.html'

})
