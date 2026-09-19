const formulario = document.querySelector('#cadastroForm')
const senha = document.querySelector('#senha')
const confirmarSenha = document.querySelector('#confirmarSenha')
const empresa = document.querySelector('#empresa')
const mensagem = document.querySelector('#cadastroMessage')
const botaoCadastro = formulario.querySelector('button[type="submit"]')
let empresasCarregadas = false
let cadastroEmAndamento = false
let cadastroConcluido = false

async function carregarEmpresas() {
    botaoCadastro.disabled = true
    try {
        const resposta = await fetch('http://localhost:8080/api/empresas')
        if (!resposta.ok) throw new Error('Falha ao carregar empresas')
        const empresas = await resposta.json()
        if (!Array.isArray(empresas)) throw new Error('Resposta inválida')

        const opcoes = empresas.map(item => {
            if (!item || !Number.isInteger(item.idEmpresa) || item.idEmpresa <= 0 ||
                typeof item.nome !== 'string' || !item.nome.trim()) {
                throw new Error('Empresa inválida')
            }
            const opcao = document.createElement('option')
            opcao.value = String(item.idEmpresa)
            opcao.textContent = item.nome
            return opcao
        })
        if (!opcoes.length) {
            empresa.options[0].textContent = 'Nenhuma empresa disponível'
            mensagem.textContent = 'Nenhuma empresa disponível para cadastro no momento.'
            return
        }
        empresa.options[0].textContent = 'Selecione sua empresa'
        empresa.append(...opcoes)
        empresa.disabled = false
        empresasCarregadas = true
        botaoCadastro.disabled = false
    } catch {
        empresa.options[0].textContent = 'Empresas indisponíveis'
        mensagem.textContent = 'Não foi possível carregar as empresas. Verifique a conexão e recarregue a página.'
    }
}

formulario.addEventListener('invalid', function (event) {
    mensagem.textContent = event.target === empresa
        ? 'Selecione sua empresa.'
        : 'Preencha os campos corretamente. A senha deve ter pelo menos 8 caracteres e a confirmação deve ser igual.'
}, true)

function limparValidacaoSenha() {
    confirmarSenha.setCustomValidity('')
}
senha.addEventListener('input', limparValidacaoSenha)
confirmarSenha.addEventListener('input', limparValidacaoSenha)

formulario.addEventListener('submit', async function (event) {
    event.preventDefault()
    if (cadastroEmAndamento || cadastroConcluido) return
    if (!empresasCarregadas) {
        mensagem.textContent = 'Aguarde o carregamento das empresas. Se houver falha, recarregue a página.'
        return
    }
    confirmarSenha.setCustomValidity(senha.value === confirmarSenha.value ? '' : 'As senhas devem ser iguais')
    if (!formulario.checkValidity()) {
        formulario.reportValidity()
        return
    }

    const idEmpresa = Number(empresa.value)
    if (!Number.isInteger(idEmpresa) || idEmpresa <= 0 ||
        !Array.from(empresa.options).some(opcao => opcao.value === empresa.value && opcao.value !== '')) {
        mensagem.textContent = 'Selecione sua empresa.'
        return
    }

    const dados = {
        idEmpresa,
        nome: document.querySelector('#nome').value.trim(),
        cpf: document.querySelector('#cpf').value.replace(/\D/g, ''),
        email: document.querySelector('#email').value.trim(),
        dataNascimento: document.querySelector('#nascimento').value,
        telefoneWhatsapp: document.querySelector('#celular').value.replace(/\D/g, ''),
        senha: senha.value
    }
    if (!dados.nome || !dados.email || !dados.cpf || !dados.telefoneWhatsapp) {
        mensagem.textContent = 'Preencha nome, e-mail, CPF e celular corretamente.'
        return
    }

    cadastroEmAndamento = true
    botaoCadastro.disabled = true
    mensagem.textContent = 'Cadastrando...'
    try {
        let resposta
        try {
            resposta = await fetch('http://localhost:8080/api/auth/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            })
        } catch {
            mensagem.textContent = 'Não foi possível conectar ao serviço. Tente novamente.'
            return
        }
        if (!resposta.ok) {
            if (resposta.status === 409) {
                mensagem.textContent = 'CPF ou e-mail já cadastrado. Confira seus dados ou faça login.'
            } else if (resposta.status >= 500) {
                mensagem.textContent = 'Não foi possível realizar o cadastro. Tente novamente mais tarde.'
            } else {
                mensagem.textContent = 'Cadastro não realizado. Verifique os dados informados.'
            }
            return
        }

        cadastroConcluido = true
        // Uma resposta sem os dados completos de login não cria uma sessão.
        let usuario = null
        try {
            usuario = await resposta.json()
        } catch {
            // O cadastro pode ter sucesso sem retornar um corpo JSON.
        }
        const camposSessao = ['idBeneficiario', 'idAutenticacao', 'nome', 'email', 'tipoUsuario']
        const sessaoCompleta = usuario && Number.isInteger(usuario.idAutenticacao) &&
            (usuario.idBeneficiario === null || Number.isInteger(usuario.idBeneficiario)) &&
            (usuario.nome === null || typeof usuario.nome === 'string') &&
            typeof usuario.email === 'string' && typeof usuario.tipoUsuario === 'string'

        try {
            // Cadastro não possui a opção de manter conectado: usa sessionStorage.
            for (const campo of camposSessao) {
                localStorage.removeItem(campo)
                sessionStorage.removeItem(campo)
            }
            if (sessaoCompleta) {
                for (const campo of camposSessao) {
                    sessionStorage.setItem(campo, String(usuario[campo]))
                }
            }
        } catch {
            mensagem.textContent = 'Cadastro realizado, mas não foi possível preparar a sessão. Use o link Entrar para fazer login.'
            return
        }

        mensagem.textContent = 'Cadastro realizado com sucesso!'
        window.location.href = 'personalizacao.html'
    } finally {
        cadastroEmAndamento = false
        botaoCadastro.disabled = cadastroConcluido
    }
})

carregarEmpresas()
