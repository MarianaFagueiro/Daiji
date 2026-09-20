document.addEventListener('DOMContentLoaded', function () {

    // =====================================================
    // ELEMENTOS
    // =====================================================

    const loginForm =
        document.querySelector('#loginForm')

    const campoEmail =
        document.querySelector('#email')

    const campoSenha =
        document.querySelector('#senha')

    const lembrar =
        document.querySelector('#lembrar')

    const loginMessage =
        document.querySelector('#loginMessage')

    const togglePassword =
        document.querySelector('#togglePassword')

    const passwordIcon =
        document.querySelector('#passwordIcon')


    // =====================================================
    // MOSTRAR / OCULTAR SENHA
    // =====================================================

    if (togglePassword && campoSenha) {

        togglePassword.addEventListener(
            'click',
            function () {

                const visivel =
                    campoSenha.type === 'text'


                campoSenha.type =
                    visivel
                        ? 'password'
                        : 'text'


                togglePassword.setAttribute(
                    'aria-label',
                    visivel
                        ? 'Mostrar senha'
                        : 'Ocultar senha'
                )


                if (passwordIcon) {

                    passwordIcon.classList.toggle(
                        'bi-eye',
                        visivel
                    )

                    passwordIcon.classList.toggle(
                        'bi-eye-slash',
                        !visivel
                    )

                }

            }
        )

    }


    // =====================================================
    // LOGIN
    // =====================================================

    if (!loginForm) {
        return
    }


    loginForm.addEventListener(
        'submit',
        function (event) {

            event.preventDefault()


            // ---------------------------------------------
            // validação HTML
            // ---------------------------------------------

            if (!loginForm.checkValidity()) {

                loginForm.reportValidity()

                return

            }


            const email =
                campoEmail.value.trim()

            const senha =
                campoSenha.value.trim()


            // ---------------------------------------------
            // validação básica
            // ---------------------------------------------

            if (!email || !senha) {

                mostrarMensagem(
                    'Informe seu e-mail e sua senha.',
                    'erro'
                )

                return

            }


            // =================================================
            // LOGIN DO PROTÓTIPO
            //
            // neste momento qualquer e-mail e senha preenchidos
            // criam uma sessão local
            // =================================================

            const usuario = {

                email: email

            }


            if (
                !window.DaijiSession ||
                !window.DaijiSession.criarSessao
            ) {

                mostrarMensagem(
                    'Não foi possível iniciar a sessão.',
                    'erro'
                )

                console.error(
                    'session.js não foi carregado corretamente'
                )

                return

            }


            // ---------------------------------------------
            // cria sessão
            // ---------------------------------------------

            window.DaijiSession.criarSessao(
                usuario,
                lembrar?.checked === true
            )


            // ---------------------------------------------
            // mensagem
            // ---------------------------------------------

            mostrarMensagem(
                'Login realizado com sucesso.',
                'sucesso'
            )


            // ---------------------------------------------
            // vai para área interna
            // ---------------------------------------------

            setTimeout(function () {

                window.location.href =
                    'score.html'

            }, 400)

        }
    )


    // =====================================================
    // MENSAGEM
    // =====================================================

    function mostrarMensagem(
        texto,
        tipo
    ) {

        if (!loginMessage) {
            return
        }


        loginMessage.textContent =
            texto


        loginMessage.classList.remove(
            'error',
            'success',
            'erro',
            'sucesso'
        )


        if (tipo === 'erro') {

            loginMessage.classList.add(
                'error'
            )

        }


        if (tipo === 'sucesso') {

            loginMessage.classList.add(
                'success'
            )

        }

    }

})