const formularioLogin = document.querySelector('#loginForm')

const mensagemLogin = document.querySelector('#loginMessage')


const campoEmail = document.querySelector('#email')
const campoSenha = document.querySelector('#senha')
const lembrarLogin = document.querySelector('#lembrar')
const botaoLogin = formularioLogin.querySelector('button[type="submit"]')
let loginEmAndamento = false

function mostrarMensagemLogin(mensagem) {
    if (mensagemLogin) {
        mensagemLogin.textContent = mensagem
    }
}

formularioLogin.addEventListener('invalid', function () {
    mostrarMensagemLogin('Preencha o e-mail e a senha corretamente.')
}, true)

formularioLogin.addEventListener('submit', async function (event) {

    event.preventDefault()


    if (loginEmAndamento) return

    const email = campoEmail.value.trim()
    const senha = campoSenha.value
    const manterConectado = lembrarLogin.checked

    if (!email || !senha || !formularioLogin.checkValidity()) {

        mostrarMensagemLogin('Preencha o e-mail e a senha corretamente.')

        formularioLogin.reportValidity()

        return

    }


    loginEmAndamento = true
    botaoLogin.disabled = true
    mostrarMensagemLogin('Entrando...')

    try {
        let resposta

        try {
            resposta = await DaijiHttp.request('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            })
        } catch (erro) {
            mostrarMensagemLogin(DaijiHttp.isTimeout(erro)
                ? 'O servidor demorou para responder. Tente entrar novamente.'
                : 'Não foi possível conectar ao servidor. Tente novamente.')
            return
        }

        if (!resposta.ok) {
            if (resposta.status === 401 || resposta.status === 403) {
                mostrarMensagemLogin('E-mail ou senha inválidos.')
            } else if (resposta.status === 400 || resposta.status === 422) {
                mostrarMensagemLogin('Não foi possível entrar. Verifique o e-mail e a senha.')
            } else {
                mostrarMensagemLogin('Não foi possível entrar. Tente novamente mais tarde.')
            }
            return
        }

        let usuario

        try {
            usuario = await resposta.json()
        } catch {
            mostrarMensagemLogin('Não foi possível confirmar o login. Tente novamente.')
            return
        }

        if (!usuario || !Number.isInteger(usuario.idAutenticacao) ||
            !(usuario.idBeneficiario === null || Number.isInteger(usuario.idBeneficiario)) ||
            !(usuario.nome === null || typeof usuario.nome === 'string') ||
            typeof usuario.email !== 'string' || typeof usuario.tipoUsuario !== 'string') {
            mostrarMensagemLogin('Não foi possível confirmar o login. Tente novamente.')
            return
        }

        const camposSessao = ['idBeneficiario', 'idAutenticacao', 'nome', 'email', 'tipoUsuario']

        try {
            const armazenamento = manterConectado ? localStorage : sessionStorage
            const outroArmazenamento = manterConectado ? sessionStorage : localStorage

            for (const campo of camposSessao) {
                outroArmazenamento.removeItem(campo)
                armazenamento.setItem(campo, String(usuario[campo]))
            }
        } catch {
            mostrarMensagemLogin('Não foi possível salvar a sessão. Verifique as permissões do navegador e tente novamente.')
            return
        }

        window.location.href = 'score.html'
    } finally {
        loginEmAndamento = false
        botaoLogin.disabled = false
    }

})
