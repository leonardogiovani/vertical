# Backup v0.1.5 — Documentação Final

Data: 2025-11-22

## Objetivo
Consolidar as alterações da versão 0.1.5 com foco em:
- Layout bottom-magnetic e hierarquia visual do feed
- Fixação de navegação em Perfil sem resize
- Fluxo direto de criação para “Doar” e “Criar campanha”

## Componentes e Páginas

### Home
- Título do TopBar ajustado:
  - `src/pages/Home.jsx:285` → `title="Vertical"`

### FeedItem
- Overlay inferior (`.feed-overlay`) ajustada para respeitar o `nav` com espaçamento de 10px e safe-area:
  - `src/components/feed/FeedItem.css:12–19`, `214–218`, `262–266`, `292–296`, `321–325`
- `feed-info` com margem inferior baseada em variável + 30px para respiro sobre a CTA:
  - `src/components/feed/FeedItem.css:102`, `337`
- CTA (`.feed-cta`) sticky com deslocamento calculado a partir do padding inferior do bottom nav:
  - `src/components/feed/FeedItem.css:313`
- Remoção do botão “+” (opções) e expansão do botão de doação para largura total:
  - `src/components/feed/FeedItem.jsx:67–76`
  - `src/components/feed/FeedItem.css:167–173`, `175–182`

### Perfil (Tabs)
- Fixação ao topo absoluto quando ativo (`sticky-active`) sem alterações de largura ou centralização:
  - `src/pages/Profile.css:34–40` (top: 0)
  - Responsivo: `src/pages/Profile.css:162–168`, `186–192`, `209–215`
- Remoção de ajustes de `max-width`, `margin auto`, `transform` em `sticky-active` para evitar “resize”:
  - `src/pages/Profile.css:242–247`, `265–267`, `285–287`
  - `src/components/profile/ProfileTabs.css:264–270`, `287–290`, `299–301`

### Criação (Marketplace)
- Botões “Doar Item Usado” e “Criar Campanha” com links diretos que abrem o modal de criação com a label ativa:
  - `src/components/create/CreateOptions.jsx:76–85` (href com hash `#type-donation` / `#type-request`)
  - `src/marketplace/components/CreateModal.jsx:24–31` (efeito que sincroniza `type` da URL ao abrir)
  - `src/marketplace/components/CreateModal.jsx:109`, `116` (ids adicionados nas labels)

## Decisões de Design
- Bottom-magnetic: garantir espaçamento mínimo de 10px entre CTA e BottomNav para evitar colisões visuais em diferentes alturas de viewport.
- Perfil sticky-active sem resize: remove fricção visual ao ativar a navegação de tabs, mantendo previsibilidade.
- Fluxo de criação: deep link por query + âncora para foco imediato na opção desejada.

## Como Validar
1. Home: confirmar `Vertical` no TopBar.
2. Feed: rolar e validar CTA sticky acima do `nav` com gap de 10px; sem o botão “+”.
3. Perfil: rolar até tabs, observar fixação no topo e ausência de mudança de largura.
4. Create Options: clicar em “Criar Campanha” e validar modal com “Criar campanha” ativo.

## Build
- Projeto compilado com Vite sem erros após as alterações.