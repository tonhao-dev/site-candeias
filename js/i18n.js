/**
 * i18n - Sistema simples de internacionalização para o site Candeias.
 *
 * Uso nos elementos HTML:
 *  - data-i18n="chave"             -> traduz o textContent (funciona também no <title>).
 *  - data-i18n-html="chave"        -> traduz via innerHTML (para textos com <strong>, etc.).
 *  - data-i18n-attr="attr:chave"   -> traduz um atributo. Vários separados por ";"
 *                                     ex.: data-i18n-attr="alt:common.logoAlt;title:home.mapTitle"
 *
 * As traduções ficam em /locales/<lang>.json com chaves em notação de ponto.
 * O idioma é detectado automaticamente a partir do navegador do usuário
 * (navigator.languages / navigator.language). Sem seletor manual.
 */

(function () {
  const DEFAULT_LANG = 'pt-BR';
  const SUPPORTED = ['pt-BR', 'es-PE'];

  // Calcula a raiz do site a partir do caminho absoluto deste script (/js/i18n.js -> /).
  const scriptEl = document.currentScript;
  const ROOT = new URL('../', scriptEl.src).href;

  const cache = {};
  let currentDict = null;
  let applying = false;

  // Detecta o idioma diretamente do navegador. Espanhol -> es-PE, caso contrário pt-BR.
  function detectLang() {
    const prefs = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ''];
    for (const raw of prefs) {
      const lang = (raw || '').toLowerCase();
      if (lang.startsWith('es')) return 'es-PE';
      if (lang.startsWith('pt')) return 'pt-BR';
    }
    return DEFAULT_LANG;
  }

  async function loadLocale(lang) {
    if (cache[lang]) return cache[lang];
    // Os arquivos de locale têm nomes em minúsculas (es-pe.json, pt-br.json).
    // Em filesystems case-sensitive (Vercel/Linux) o nome precisa bater exatamente,
    // então normalizamos para minúsculas ao montar a URL do fetch.
    const res = await fetch(`${ROOT}locales/${lang.toLowerCase()}.json`);
    if (!res.ok) throw new Error(`Falha ao carregar locale: ${lang}`);
    const data = await res.json();
    cache[lang] = data;
    return data;
  }

  // Busca uma chave em notação de ponto ("nav.home") dentro do objeto de traduções.
  function resolve(dict, key) {
    return key.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), dict);
  }

  function applyTranslations(dict) {
    applying = true;
    // Texto simples (inclui a tag <title>)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const value = resolve(dict, el.getAttribute('data-i18n'));
      if (typeof value === 'string') el.textContent = value;
    });

    // Conteúdo com HTML interno
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const value = resolve(dict, el.getAttribute('data-i18n-html'));
      if (typeof value === 'string') el.innerHTML = value;
    });

    // Atributos: data-i18n-attr="attr:chave;attr2:chave2"
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.getAttribute('data-i18n-attr').split(';').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s && s.trim());
        if (!attr || !key) return;
        const value = resolve(dict, key);
        if (typeof value === 'string') el.setAttribute(attr, value);
      });
    });
    // Libera o observer no próximo tick, ignorando as mutações causadas por esta função.
    setTimeout(() => { applying = false; }, 0);
  }

  async function setLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = DEFAULT_LANG;
    try {
      const dict = await loadLocale(lang);
      currentDict = dict;
      applyTranslations(dict);
      document.documentElement.lang = lang;
    } catch (err) {
      console.error('[i18n]', err);
    }
  }

  // Reaplica as traduções em conteúdo inserido dinamicamente (ex.: cards de mestres).
  function observeDynamicContent() {
    const observer = new MutationObserver(mutations => {
      if (!currentDict || applying) return;
      const hasNewNodes = mutations.some(m =>
        Array.from(m.addedNodes).some(n => n.nodeType === 1 &&
          (n.matches?.('[data-i18n],[data-i18n-html],[data-i18n-attr]') ||
            n.querySelector?.('[data-i18n],[data-i18n-html],[data-i18n-attr]')))
      );
      if (hasNewNodes) applyTranslations(currentDict);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    setLanguage(detectLang());
    observeDynamicContent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
