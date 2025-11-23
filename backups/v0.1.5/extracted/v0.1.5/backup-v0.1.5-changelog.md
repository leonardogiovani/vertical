# Backup v0.1.5 — Changelog

Data: 2025-11-22

## Resumo
- Ajustes de layout e UX em Home (feed), navegação inferior, e Perfil.
- Remoção de botão redundante na CTA do feed e expansão do botão de doação.
- Fixação das tabs do perfil no topo sem “resize” quando ativo.
- Linkagem direta entre opções de criação e a label ativa no modal de criação.

## Mudanças

### Título
- Home: título atualizado para “Vertical”.
  - Referência: `src/pages/Home.jsx:285`

### Feed (Home)
- Overlay inferior com espaçamento magnético ao `nav` com 10px (ajustes responsivos).
  - Referências:
    - `src/components/feed/FeedItem.css:12–19`
    - `src/components/feed/FeedItem.css:214–218`
    - `src/components/feed/FeedItem.css:262–266`
    - `src/components/feed/FeedItem.css:292–296`
    - `src/components/feed/FeedItem.css:321–325`
- `feed-info` com margem inferior baseada em variável + 30px.
  - Referências:
    - `src/components/feed/FeedItem.css:102`
    - `src/components/feed/FeedItem.css:337`
- `feed-cta` sticky acima do `nav`.
  - Referência: `src/components/feed/FeedItem.css:313`
- Remoção do botão de opções “+” e expansão horizontal do botão de doação.
  - Referências:
    - Remoção: `src/components/feed/FeedItem.jsx:67–76`
    - CSS: `src/components/feed/FeedItem.css:167–173`, `src/components/feed/FeedItem.css:175–182`

### Perfil
- Tabs fixas com `top: 0px` quando `sticky-active`.
  - Referências:
    - `src/pages/Profile.css:34–40`
    - Responsivo: `src/pages/Profile.css:162–168`, `src/pages/Profile.css:186–192`, `src/pages/Profile.css:209–215`
- Remoção de “resize” (max-width/centralização) em `sticky-active` nas breakpoints.
  - Referências:
    - `src/pages/Profile.css:242–247`, `src/pages/Profile.css:265–267`, `src/pages/Profile.css:285–287`
    - `src/components/profile/ProfileTabs.css:264–270`, `src/components/profile/ProfileTabs.css:287–290`, `src/components/profile/ProfileTabs.css:299–301`

### Criação de Itens/Campanhas
- Botões “Doar Item Usado” e “Criar Campanha” agora são links diretos para abrir o modal com a label correspondente ativa.
  - Referências:
    - `src/components/create/CreateOptions.jsx:76–85` (link com hash para a label)
    - `src/marketplace/components/CreateModal.jsx:24–31` (sincroniza `type` a partir da URL)
    - `src/marketplace/components/CreateModal.jsx:109`, `src/marketplace/components/CreateModal.jsx:116` (ids nas labels)

## Impacto
- Melhora de consistência visual, acessibilidade e fluxo de criação.
- Redução de elementos redundantes na UI.

## Build
- Vite build concluído com sucesso após alterações.