/* ==========================================================================
   DAIJI — shared behaviors
   - Nav goes solid on scroll
   - Light/dark theme toggle (persisted in localStorage)
   - Scroll-reveal for .fx-in elements
   - Chatbot widget open/close + placeholder reply
     (swap sendMockReply() for a real API/SDK call when you wire up the bot)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- theme toggle ---- */
  const root = document.documentElement;
  const THEME_KEY = 'daiji-theme';
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) root.setAttribute('data-theme', saved);

  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      if (next === 'dark') root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', 'light');
      localStorage.setItem(THEME_KEY, next);
    });
  });

  /* ---- nav solid on scroll ---- */
  const nav = document.getElementById('ouraNav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 60) nav.classList.add('solid');
      else nav.classList.remove('solid');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- scroll reveal ---- */
  const fx = document.querySelectorAll('.fx-in');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
      });
    }, { threshold: .12 });
    fx.forEach(el => io.observe(el));
  } else {
    fx.forEach(el => el.classList.add('show'));
  }

  /* ---- chatbot widget ---- */
  const chatFab = document.getElementById('chatFab');
  const chatPanel = document.getElementById('chatPanel');
  const chatClose = document.getElementById('chatClose');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');

  const toggleChat = () => chatPanel && chatPanel.classList.toggle('open');
  if (chatFab) chatFab.addEventListener('click', toggleChat);
  if (chatClose) chatClose.addEventListener('click', toggleChat);

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      appendBubble(text, 'user');
      chatInput.value = '';
      // TODO: replace sendMockReply() with a real call to your chatbot
      // backend / SDK (e.g. Dialogflow, WhatsApp Business API, a custom
      // Daiji endpoint, etc). This mock just echoes a canned response.
      setTimeout(() => sendMockReply(text), 500);
    });
  }

  function appendBubble(text, who) {
    if (!chatBody) return;
    const div = document.createElement('div');
    div.className = 'chat-bubble ' + who;
    div.textContent = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function sendMockReply(userText) {
    appendBubble(
      'Isso aqui é só um espaço reservado — conecte este widget ao seu backend de chatbot para responder de verdade. 🙂',
      'bot'
    );
  }

});
