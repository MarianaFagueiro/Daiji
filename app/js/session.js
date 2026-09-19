(function () {
    const chaves = ['idBeneficiario', 'idAutenticacao', 'nome', 'email', 'tipoUsuario']
    const privada = document.currentScript.hasAttribute('data-private')
    let bloqueada = false

    function inteiroPositivo(valor) {
        return typeof valor === 'string' && /^\d+$/.test(valor) &&
            Number.isSafeInteger(Number(valor)) && Number(valor) > 0
    }

    function ler() {
        try {
            // Nunca completa uma sessão parcial com campos de outro armazenamento.
            const storage = sessionStorage.getItem('idBeneficiario') !== null
                ? sessionStorage : localStorage
            const sessao = Object.fromEntries(chaves.map(chave => [chave, storage.getItem(chave)]))
            if (!inteiroPositivo(sessao.idBeneficiario) || !inteiroPositivo(sessao.idAutenticacao) ||
                !sessao.email || !/^[^\s@]+@[^\s@]+$/.test(sessao.email) ||
                !sessao.tipoUsuario || !sessao.tipoUsuario.trim() || sessao.tipoUsuario === 'null' ||
                sessao.tipoUsuario === 'undefined') return null
            return sessao
        } catch {
            return null
        }
    }

    const contexto = privada ? ler() : null

    function bloquear() {
        bloqueada = true
        document.documentElement.style.visibility = 'hidden'
        window.location.replace('login.html')
        return false
    }

    function validar() {
        if (!privada) return true
        const atual = ler()
        if (bloqueada || !contexto || !atual ||
            atual.idBeneficiario !== contexto.idBeneficiario ||
            atual.idAutenticacao !== contexto.idAutenticacao) return bloquear()
        return true
    }

    function limpar(storage) {
        for (const chave of chaves) storage.removeItem(chave)
    }

    // Notifica outras abas abertas sem criar tokens ou credenciais adicionais.
    let canal = null
    try {
        if (typeof BroadcastChannel !== 'undefined') canal = new BroadcastChannel('daiji-session')
    } catch { /* A proteção por storage e revalidação continua disponível. */ }

    function sair() {
        const sessao = ler() || contexto
        try {
            limpar(sessionStorage)
            limpar(localStorage)
        } catch {
            bloquear()
            return
        }
        if (canal && sessao) canal.postMessage({
            acao: 'logout',
            idBeneficiario: sessao.idBeneficiario,
            idAutenticacao: sessao.idAutenticacao
        })
        bloquear()
    }

    if (canal) canal.onmessage = event => {
        const aviso = event.data
        const atual = ler()
        if (aviso?.acao !== 'logout' || !atual ||
            aviso.idBeneficiario !== atual.idBeneficiario ||
            aviso.idAutenticacao !== atual.idAutenticacao) return
        try { limpar(sessionStorage) } catch { /* A página será bloqueada. */ }
        if (privada) bloquear()
    }

    window.DaijiSession = { ler, validar, sair }

    if (privada) {
        validar()
        window.addEventListener('pageshow', validar)
        window.addEventListener('focus', validar)
        window.addEventListener('storage', event => {
            if (event.storageArea === localStorage && (event.key === null || chaves.includes(event.key))) validar()
        })
        for (const evento of ['click', 'submit']) {
            document.addEventListener(evento, event => {
                if (!validar()) {
                    event.preventDefault()
                    event.stopImmediatePropagation()
                }
            }, true)
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-logout]').forEach(botao => botao.addEventListener('click', sair))
    })
})()
