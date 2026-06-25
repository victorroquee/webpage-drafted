# Drafted — Landing Page (Rascunho de Alta Fidelidade)

Rascunho navegável da landing page da **Drafted — _The next-gen PR for the AI era_**, uma
agência de PR para a era da IA (Isabela Ortunho Sliesoraitis). Construído a partir do **Brand
Book + arquivos de onboarding**: paleta, tipografia (Sora / Poppins) e mascote estrela.

> ⚠️ **Isto é um RASCUNHO pra revisão da cliente**, não o site final. Os textos são sugestões
> fiéis ao onboarding e os números (Drafted Score, métricas) são ilustrativos.

---

## 🚀 Início rápido

```bash
# ver o protótipo
open index.html            # Versão A — Creme & Vinho (brand book)
open index-light.html      # Versão B — Neutra / Branca

# regenerar entregáveis (precisa do Google Chrome instalado)
npm install
npm run shots        # screenshots por seção (tema creme)
npm run shots:light  # screenshots por seção (tema neutro)
npm run record       # grava as animações em .webm
npm run pdf          # gera o PDF anotado em deliverables/
```

---

## 📂 Estrutura

| Caminho | O que é |
|---|---|
| `index.html` | Protótipo navegável — **Versão A (Creme & Vinho)**, animado e responsivo |
| `index-light.html` | Protótipo navegável — **Versão B (Neutra / Branca)** |
| `draft-board.html` | **Board de revisão** — cada seção com rótulo, objetivo, copy e espaço de comentário |
| `deliverables/Drafted-Landing-Rascunho.pdf` | O board acima exportado em PDF |
| `deliverables/anim/` | Animações em **GIF + MP4 + WEBM** (mascote e rede de conexões) |
| `assets/img/` | Screenshots por seção (`sec-*.png` + `-light`), SVGs do mascote, full-page |
| `assets/brand-ref/` | Páginas renderizadas do Brand Book + deck de onboarding |
| `assets/anim/` | Páginas standalone usadas pra gravar as animações |
| `js/` | Scripts de geração (Puppeteer): `shoot.mjs`, `record.mjs`, `pdf.mjs` |
| `COMO-USAR.md` | Guia rápido em PT para a cliente / quem for revisar |

---

## 🎨 Sistema de marca

**Paleta primária:** Ink `#351e28` · Wine `#6b2137` · Cream `#fffde9`
**Paleta secundária:** Rose `#ffb7b7` · Butter `#d0c360` · Sky `#b7d8ff` · Paper `#f7f7f5` · Graphite `#4f4f4f`
**Tipografia:** Sora (títulos) + Poppins (corpo), via Google Fonts.
**Mascote:** estrela vinho de 8 pontas com rosto e perninhas (SVG vetorial, animada por CSS).

Duas versões de paleta foram entregues para a cliente escolher: **A (creme/vinho)** e **B (neutra/branca)**.

---

## 🧩 Seções da página (na ordem)

1. **Hero** — proposta + CTA + mascote animado
2. **A Virada** — manifesto do brand book
3. **O que fazemos** — 4 pilares
4. **Produtos** — Drafted Intelligence™ + Drafted Execution™
5. **Método** — 4 etapas
6. **Conexões** — animação ilustrando humanos + plataformas + IA
7. **Por que agora** — prova / stats + citação
8. **Agendamento** — CTA + **KAU.AI** (placeholder do embed de calendário)
9. **FAQ** + **Footer** (São Paulo · +55 11 91991-1706 · @drafted.ag · LinkedIn · drafted.com.br)

---

## ✨ Animações (em código, on-brand, sem "cara de IA")

- **Mascote estrela** no hero: respira (bob), pisca (blink) e balança as perninhas.
- **Rede de conexões**: Drafted no centro, plataformas/IAs ao redor (ChatGPT, Gemini, Google,
  Perplexity, IG, LinkedIn), pulsos viajando pelas linhas + anel pulsante.
- Respeitam `prefers-reduced-motion`.
- Exportadas em **GIF/MP4/WEBM** (`deliverables/anim/`) porque o Figma/PDF são estáticos e não
  rodam JS — assim o movimento fica visível como referência.

Pipeline de export: `record.mjs` grava as páginas `assets/anim/*.html` via `page.screencast`
(webm) → `ffmpeg` converte para mp4 (h264/yuv420p) e gif (palettegen/paletteuse).

---

## 🖼️ Levar pro Figma (pra cliente comentar)

O MCP do Figma instalado é o **Dev Mode** — ele só *lê* designs (Figma → código), não cria
mockups. O caminho que funciona é o plugin **html.to.design**:

1. No Figma, abra o plugin **html.to.design**.
2. **Import from HTML/file** → suba `index.html` (ou `index-light.html`).
   - *Alternativa:* importe `draft-board.html` pra já trazer seções rotuladas + comentários como camadas.
3. O plugin converte em camadas nativas editáveis.
4. A Isabela comenta direto no Figma (comentário nativo / setas / post-its).
5. Arraste os GIFs de `deliverables/anim/` como referência do movimento (Figma é estático).

---

## ⏳ Pendências (dependem do cliente)

- **Copies definitivas** — os textos atuais são sugestões fiéis ao onboarding.
- **Números reais** — Drafted Score, menções e stats hoje são ilustrativos.
- **Embed do KAU.AI** — há um bloco-placeholder na seção de agendamento; plugar quando tiver o link.
- **Escolher a paleta** — A (creme/vinho) ou B (neutra) — ou mesclar.

---

## 🛠️ Stack & geração

- HTML/CSS/JS estático, single-file (estilos embutidos), Google Fonts.
- SVG + animações CSS/SMIL; IntersectionObserver (reveal) e contadores via `requestAnimationFrame`.
- `puppeteer-core` dirigindo o **Google Chrome** já instalado para screenshots, PDF e vídeo.
- `ffmpeg` para webm→mp4/gif. (Ferramentas de PDF: `pdftoppm`, `pdftotext`, `qlmanage`, `sips`.)

> **Nota:** nenhum MCP de geração de imagem nem MCP de escrita no Figma estava conectado nesta
> sessão (apenas Atomicat, Facebook Ads, Google Drive, Supabase e o Figma Dev Mode read-only).
> Por isso todas as ilustrações/animações foram feitas em código vetorial.
