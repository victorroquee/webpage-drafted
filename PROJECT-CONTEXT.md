# Contexto do Projeto — Drafted Landing Page

Documento de referência interno (não é entregável da cliente). Registra o brief, as decisões e
o histórico do trabalho, pra qualquer pessoa (ou IA) retomar sem perder contexto.

---

## 1. Cliente & objetivo

- **Cliente:** Drafted — _"The next-gen PR for the AG era / AI era"_. Agência de PR para a era
  da IA. Fundadora: **Isabela Ortunho Sliesoraitis**.
- **Quem encomendou:** Victor (oggroupglobal@gmail.com) — vai usar este rascunho para preencher
  um formulário/proposta na empresa dele e apresentar para a cliente.
- **Pedido central:** criar um **rascunho de alta fidelidade** da landing page, dinâmico,
  responsivo, **com menos "cara de IA"**, seguindo **Brand Book + onboarding** (estavam em
  `~/Downloads`, renderizados em `assets/brand-ref/`).
- **Formato de entrega desejado:** idealmente um **arquivo Figma** com seções separadas, setas e
  comentários do que cada seção contém ("como se eu tivesse feito manual, orgânico"); **PDF** como
  fallback. É um **RASCUNHO para revisão**, não site final.

## 2. Conteúdo de marca fornecido

- **Headline:** "Next-gen PR for the AI era"
- **Subheadline:** "Construímos reputação, autoridade e influência para que sua marca seja
  encontrada, recomendada e confiável. Por humanos e por IA."
- **4 pilares:** Diagnóstico reputacional completo · Monitoramento da marca em ambientes digitais
  e IA · Definição de prioridades estratégicas · Gestão contínua da reputação.
- **2 produtos:** Drafted Intelligence™ · Drafted Execution™.
- **Contatos:** São Paulo · +55 11 91991-1706 · IG @drafted.ag · linkedin.com/company/drafted-co ·
  drafted.com.br
- **Idioma do site:** Bilíngue (EN + PT).

## 3. Decisões tomadas (com a cliente)

| Tema | Decisão |
|---|---|
| Paleta | **Fazer as duas versões**: A creme/vinho (brand book) e B neutra/branca |
| KAU.AI | É um **calendário de agendamento**; por ora **placeholder** ("a gente coloca o agendamento depois") |
| Entregável Figma | Fazer "da maneira mais orgânica/dinâmica" → via plugin **html.to.design** (ver abaixo) |
| Animações | Sim, mas só em **pontos específicos** (hero + seção de conexões), não o site todo |
| Ilustrações | Elementos ilustrativos/animados ("bonequinhos", conexões), **não** fotos de escritório |

## 4. Limitações de ambiente encontradas (importante)

- **Figma MCP:** o único instalado é `figma-dev-mode-mcp-server`, que é **read-only** (Figma →
  código) e estava **offline** ("Failed to connect"). **Não existe** MCP de escrita no Figma nesta
  CLI. Solução adotada e validada pelo Victor: **plugin html.to.design** importando os HTML.
- **MCP de geração de imagem:** **nenhum conectado** nesta sessão (só Atomicat, Facebook Ads,
  Google Drive, Supabase). Solução: **tudo em SVG/CSS/JS vetorial** + export GIF/MP4 via ffmpeg.
- ⚠️ **Segurança:** um token de acesso do Supabase apareceu na listagem de MCPs — **não expor nem
  reutilizar**.

## 5. O que foi entregue

- `index.html` (Versão A) e `index-light.html` (Versão B) — protótipos navegáveis completos.
- `draft-board.html` — board anotado (8 seções + animações + comparação de paletas + próximos passos).
- `deliverables/Drafted-Landing-Rascunho.pdf` — board em PDF.
- `deliverables/anim/{mascot,network}.{webm,mp4,gif}` — animações exportadas.
- `README.md` + `COMO-USAR.md` + este `PROJECT-CONTEXT.md`.

## 6. Detalhes técnicos úteis

- **Chrome:** `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` (usado pelo Puppeteer).
- **Mascote (estrela 8 pontas, centro 300,285, R230/r96):**
  `M 300,55 L 336.7,196.3 L 462.6,122.4 L 388.7,248.3 L 530,285 L 388.7,321.7 L 462.6,447.6 L 336.7,373.7 L 300,515 L 263.3,373.7 L 137.4,447.6 L 211.3,321.7 L 70,285 L 211.3,248.3 L 137.4,122.4 L 263.3,196.3 Z`
- **Versão B (neutra)** = Versão A + `body.theme-light` + `<style id="theme-light-override">`
  injetado (sobrescreve `--cream:#fff`, clareia `.shift`/`.network`, recolore nós/links/pulsos).
- **shoot.mjs:** desliga `requestAnimationFrame` via `evaluateOnNewDocument` pra congelar os
  contadores nos valores finais; captura por `clip` de um render alto único (não `element.screenshot`,
  que renderizava a seção de rede escura no tema claro).
- **pdf.mjs:** gera **uma página contínua** (width 1500px, height = `scrollHeight`).

## 7. Próximos passos possíveis

- Importar pro Figma via html.to.design e guiar a cliente.
- Plugar o embed real do KAU.AI quando houver o link.
- Trocar copies/números ilustrativos pelos reais.
- Gerar um GIF da página inteira rolando (se a cliente quiser).
