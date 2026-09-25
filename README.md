# Site Grupo Candeias de Capoeira

Site institucional do **Grupo Candeias de Capoeira**. Apresenta a história do grupo, o conselho de mestres, núcleos, eventos, formaturas, graduações, projetos e a galeria de fotos.

🌐 **Produção:** [grupocandeias.com.br](https://grupocandeias.com.br)

---

## Sobre o projeto

É um **site estático** (multi-página), escrito em HTML, CSS e JavaScript puros — sem framework nem etapa de build. Cada seção do site é uma página independente dentro de `pages/`, com seu próprio HTML, CSS e JS.

### Stack

| Camada | Tecnologia |
|---|---|
| Marcação | HTML5 |
| Estilos | CSS puro + [Bootstrap 5.3](https://getbootstrap.com/) (via CDN) e variáveis em `css/variables.css` |
| Scripts | JavaScript vanilla (ES) |
| Ícones | [Remix Icon](https://remixicon.com/) e [Font Awesome](https://fontawesome.com/) |
| Animações | [AOS](https://michalsnik.github.io/aos/) |
| i18n | Sistema próprio em `js/i18n.js` com traduções em `locales/` |

---

## Estrutura de pastas

```
.
├── index.html                 # Página inicial
├── css/
│   ├── style.css              # Estilos globais
│   └── variables.css          # Variáveis de tema (cores, fontes, etc.)
├── js/
│   ├── script.js              # Comportamento geral (menu, header)
│   ├── carrosel.js            # Carrossel da home
│   └── i18n.js                # Internacionalização (PT/ES/EN)
├── locales/
│   ├── pt-br.json             # Traduções em português
│   ├── es-pe.json             # Traduções em espanhol
│   └── en-us.json             # Traduções em inglês
├── assets/
│   ├── icons/                 # Bandeiras dos países (brasil, irlanda, franca, eua, inglaterra)
│   └── images/                # Logos, fotos de mestres, backgrounds
└── pages/                     # Uma pasta por seção, cada uma com index.html + css/ + js/
    ├── artes/
    ├── conselho-de-mestres/   # Lista de mestres (dados em js/mestres.js)
    ├── eventos/
    ├── formaturas/
    ├── galeria/
    ├── graduacoes/
    ├── historia-do-grupo/
    ├── nucleos/
    └── projetos/
```

### Conselho de Mestres

A página `pages/conselho-de-mestres/` monta a lista de mestres dinamicamente:

- **`js/mestres.js`** — dados dos mestres, organizados por cordão: `branca`, `brancaVermelha`, `vermelha`. Cada registro tem `nome`, `apelido`, `instagram`, `pais`, `bandeira`, `img`, `nucleo` e `historia`.
- **`js/renderizaMestres.js`** — renderiza os cards a partir desses dados.
- **`js/renderizaModal.js`** — abre o modal com a história de cada mestre, escolhendo a variante de idioma.

A `historia` de cada mestre é um objeto multilíngue `{ "pt-BR": "...", "es-PE": "...", "en-US": "..." }`. O modal lê `document.documentElement.lang` (definido pelo módulo i18n) e escolhe a variante correspondente, caindo em `pt-BR` quando o idioma não existe no registro. Strings simples (formato legado) continuam funcionando.

Para adicionar ou promover um mestre, edite apenas `mestres.js`. A `bandeira` deve corresponder a um arquivo em `assets/icons/<bandeira>.png` (valores disponíveis: `brasil`, `irlanda`, `franca`, `eua`, `inglaterra`); valores ausentes caem no fallback para `brasil`.

---

## Internacionalização (i18n)

O site suporta **português (pt-BR)**, **espanhol (es-PE)** e **inglês (en-US)**. O idioma é **detectado automaticamente pelo navegador do usuário** (`navigator.languages` / `navigator.language`) — não há seletor manual:

- locale começando com `es*` → **es-PE**
- locale começando com `en*` → **en-US**
- locale começando com `pt*` (ou qualquer outro) → **pt-BR** (padrão)

As traduções ficam em `locales/*.json` com chaves em notação de ponto. Os três arquivos têm exatamente as mesmas chaves — ao adicionar uma chave nova, adicione nos três. **Os nomes de arquivo são minúsculos** (`en-us.json`, não `en-US.json`) porque o host de deploy (Vercel/Linux) é case-sensitive; o módulo normaliza o código do idioma para minúsculas ao montar a URL do `fetch`.

No HTML, marque os elementos com:

- `data-i18n="chave"` — traduz o `textContent`;
- `data-i18n-html="chave"` — traduz via `innerHTML` (para textos com tags);
- `data-i18n-attr="attr:chave;attr2:chave2"` — traduz atributos (`alt`, `title`, etc.).

---

## Rodando localmente

Como é um site estático, basta servir a pasta raiz por HTTP (os JSONs de tradução são carregados via `fetch`, então abrir o arquivo direto com `file://` não funciona):

```bash
# Python 3
python -m http.server 5500

# ou, com Node
npx serve .
```

Depois acesse [http://localhost:5500](http://localhost:5500).

> Dica: no VS Code, a extensão **Live Server** também funciona bem.

---

## Deploy

O deploy é **automático**, disparado por push na branch `main`. Há duas publicações configuradas:

### 1. Vercel (produção — domínio oficial)

A integração Git da **Vercel** está conectada a este repositório:

- **Push em `main`** → a Vercel dispara automaticamente um build/deploy de **Production**.
- O site é publicado no domínio customizado **[grupocandeias.com.br](https://grupocandeias.com.br)** (o domínio padrão da Vercel é `site-candeias.vercel.app`).
- **Pull Requests e outras branches** geram deploys de **Preview** com uma URL própria, úteis para revisar as mudanças antes do merge.

Não é preciso rodar nenhum comando manual: ao fazer merge de um PR em `main`, a Vercel reconstrói e atualiza o site de produção sozinha.

### 2. GitHub Pages (espelho)

O workflow [`.github/workflows/static.yml`](.github/workflows/static.yml) também roda em push na `main`:

1. faz merge de `main` na branch `gh-pages`;
2. publica o conteúdo via **GitHub Pages**.

---

## Fluxo de contribuição

1. Crie uma branch a partir da `main` (ex.: `feat/nova-secao`, `docs/ajuste`).
2. Faça as alterações e valide localmente (servindo por HTTP).
3. Abra um **Pull Request** para `main` — isso gera um **deploy de Preview na Vercel** para revisão.
4. Após aprovar e fazer **merge em `main`**, o deploy de **produção** acontece automaticamente em [grupocandeias.com.br](https://grupocandeias.com.br).

> A branch `main` é protegida: publique sempre via Pull Request.
