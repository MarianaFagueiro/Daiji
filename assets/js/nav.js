(function () {

  var LINKS = [
    { href: "index.html",           label: "InÃ­cio" },
    { href: "especialidades.html",  label: "Especialidades" },
    { href: "telemedicina.html",    label: "Telemedicina" },
    { href: "planos.html",          label: "Planos" },
    { href: "como-funciona.html",   label: "Como Funciona" },
    { href: "estrategia.html",      label: "EstratÃ©gia" },
    { href: "seguranca.html",       label: "SeguranÃ§a" },
    { href: "sobre.html",           label: "Sobre" },
    { href: "contato.html",         label: "Contato" }
  ];

  // pÃ¡gina atual (nome do arquivo) para marcar o item ativo
  var atual = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (!atual) atual = "index.html";

  var itens = LINKS.map(function (l) {
    var ativo = (l.href.toLowerCase() === atual) ? ' class="active"' : "";
    return '<a href="' + l.href + '"' + ativo + '>' + l.label + "</a>";
  }).join("");

  var html =
    '<nav class="oura-nav" id="ouraNav">' +
      '<div class="row-nav">' +
        '<a class="brand" href="index.html">DA<span class="bar">|</span>JI</a>' +
        '<div class="links">' + itens + "</div>" +
        '<div class="right">' +
          '<button class="icon-btn" data-theme-toggle aria-label="Alternar tema">' +
            '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M18.5 18.5 20 20M18.5 5.5 20 4M4 20l1.5-1.5"/></svg>' +
            '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12.5A9 9 0 1111.5 3 7 7 0 0021 12.5z"/></svg>' +
          "</button>" +
          '<a class="btn-explore" style="padding:9px 20px; font-size:13px;" href="planos.html">Ver planos</a>' +
        "</div>" +
      "</div>" +
    "</nav>";

  var alvo = document.getElementById("daijiNav");
  if (alvo) {
    alvo.outerHTML = html;
  } else {
    // fallback: injeta no topo do body se o placeholder nÃ£o existir
    document.body.insertAdjacentHTML("afterbegin", html);
  }

})();