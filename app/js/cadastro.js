const formulario = document.querySelector('#cadastroForm')

const senha = document.querySelector('#senha')

const confirmarSenha = document.querySelector('#confirmarSenha')


formulario.addEventListener('submit', function (event) {

    event.preventDefault()


    if (!formulario.checkValidity()) {

        formulario.reportValidity()

        return

    }


    if (senha.value !== confirmarSenha.value) {

        confirmarSenha.setCustomValidity(
            'As senhas devem ser iguais'
        )

        confirmarSenha.reportValidity()

        return

    }


    confirmarSenha.setCustomValidity('')


    window.location.href = 'personalizacao.html'

})


confirmarSenha.addEventListener('input', function () {

    confirmarSenha.setCustomValidity('')

})