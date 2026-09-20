// =====================================================
// DAIJI - CONTROLE DE SESSÃO
// =====================================================

(function () {

    const SESSION_KEY = 'daijiSession'
    const PROFILE_KEY = 'daijiPerfil'

    // -------------------------------------------------
    // OBTER SESSÃO
    // -------------------------------------------------

    function obterSessao() {

        try {

            const sessaoLocal = localStorage.getItem(SESSION_KEY)
            const sessaoTemporaria = sessionStorage.getItem(SESSION_KEY)

            const dados = sessaoLocal || sessaoTemporaria

            if (!dados) {
                return null
            }

            return JSON.parse(dados)

        } catch (erro) {

            console.error('Erro ao recuperar sessão:', erro)

            return null

        }

    }


    // -------------------------------------------------
    // VERIFICAR AUTENTICAÇÃO
    // -------------------------------------------------

    function estaAutenticado() {

        const sessao = obterSessao()

        return Boolean(
            sessao &&
            sessao.logado === true &&
            sessao.usuario
        )

    }


    // -------------------------------------------------
    // CRIAR SESSÃO
    // -------------------------------------------------

    function criarSessao(usuario, manterConectado = false) {

        const sessao = {

            logado: true,

            usuario: usuario,

            criadoEm: new Date().toISOString()

        }

        // remove sessão anterior
        localStorage.removeItem(SESSION_KEY)
        sessionStorage.removeItem(SESSION_KEY)


        if (manterConectado) {

            localStorage.setItem(
                SESSION_KEY,
                JSON.stringify(sessao)
            )

        } else {

            sessionStorage.setItem(
                SESSION_KEY,
                JSON.stringify(sessao)
            )

        }


        // mantém também algumas informações do perfil

        try {

            const perfilAtual =
                JSON.parse(
                    localStorage.getItem(PROFILE_KEY)
                ) || {}

            const novoPerfil = {

                ...perfilAtual,

                nome:
                    usuario.nome ||
                    perfilAtual.nome ||
                    '',

                email:
                    usuario.email ||
                    perfilAtual.email ||
                    ''

            }

            localStorage.setItem(
                PROFILE_KEY,
                JSON.stringify(novoPerfil)
            )

        } catch (erro) {

            console.error(
                'Erro ao salvar perfil:',
                erro
            )

        }

    }


    // -------------------------------------------------
    // ENCERRAR SESSÃO
    // -------------------------------------------------

    function logout() {

        localStorage.removeItem(SESSION_KEY)
        sessionStorage.removeItem(SESSION_KEY)

        window.location.href = 'login.html'

    }


    // -------------------------------------------------
    // USUÁRIO ATUAL
    // -------------------------------------------------

    function obterUsuario() {

        const sessao = obterSessao()

        if (!sessao) {
            return null
        }

        return sessao.usuario || null

    }


    // -------------------------------------------------
    // DISPONIBILIZA FUNÇÕES GLOBALMENTE
    // -------------------------------------------------

    window.DaijiSession = {

        obterSessao,

        estaAutenticado,

        criarSessao,

        obterUsuario,

        logout

    }


    // -------------------------------------------------
    // PROTEÇÃO DAS PÁGINAS PRIVADAS
    // -------------------------------------------------

    const scriptAtual = document.currentScript

    const paginaPrivada =
        scriptAtual &&
        scriptAtual.hasAttribute('data-private')


    if (paginaPrivada && !estaAutenticado()) {

        window.location.replace('login.html')

    }

})()