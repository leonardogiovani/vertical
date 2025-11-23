# Backup v0.1.3

## Changelog
- Página `/donations` com layout centralizado nas tabs e grid responsivo
  - Tabs: “Apoiar Causas” e “Doações” centralizadas e sem quebra
  - Cor ativa igual ao `button` principal, usando `var(--color-primary)`
  - Grid com `minmax(360px, 1fr)` para melhor leitura
- Filtro modernizado com popup central
  - Usa `Modal` com `type="center"` e `preventClose` para estabilidade
  - Submenus “Localização” e “Avançado” iniciam fechados
  - Exibição de chips com filtros ativos sob as tabs
- Botões flutuantes revertidos para formato circular com ícone SVG
  - `filter-fab` abre filtros; `page-fab` abre criação
  - Posição magnética: 50px acima do topo do `nav` inferior
- Popup “Criar” com mesmo design do filtro
  - Convergência visual: header, centralização, overlay bloqueado
  - Opções de tipo com estilo de tabs (`tab-btn active`)
  - Texto atualizado: “Criar campanha” na opção de request
  - Campo novo: “Valor máximo da campanha (opcional)” sob a descrição
- Contraste de borda em campos
  - `input`, `textarea` e `label` de upload usam `var(--color-text-primary)`
  - Comportamento alinhado ao tema claro/escuro

## Documentação
- Tabs
  - “Apoiar Causas” alterna para itens do tipo `request`
  - “Doações” alterna para itens do tipo `donation`
- Filtros
  - Botão de filtro (circular) abre popup central
  - Submenus fechados por padrão; abra conforme necessidade
  - Chips abaixo das tabs mostram filtros ativos: Bairro, Cidade, Estado, País
  - “Aplicar” fecha o modal mantendo filtros; “Limpar” reseta
- Criar Item/Campanha
  - Botão “+” (circular) abre popup “Criar” centralizado
  - Tipos: “Quero Doar” e “Criar campanha” (request)
  - Campos comuns: Título, Descrição, Localização, mídia (10 fotos, 3 vídeos)
  - Campo adicional: “Valor máximo da campanha (opcional)” em `request`
- Tema
  - Cores seguem `variables.css` com variáveis `var(--color-...)`
  - Contraste das bordas acompanha `var(--color-text-primary)` no modo claro/escuro

## Bugfixes
- Popup filtro fechava logo após abrir
  - Removido listener global de clique fora
  - Respeito ao estado booleano em `onToggle`
  - Overlay centralizado e bloqueado com `preventClose`
- Centralização do modal
  - Forçada via estilo do overlay quando `type="center"`
- Consistência dos botões flutuantes
  - Revertidos para circular com ícone SVG e hover correto
- Contraste e leitura
  - Bordas dos campos ajustadas para acompanhar a cor do texto

## Referências de Código
- Tabs e chips: `src/marketplace/pages/Marketplace.jsx:149-163`
- Botões flutuantes: `src/styles/marketplace.css:24-29`, `src/marketplace/pages/Marketplace.jsx:190-198`
- Popup Filtro: `src/marketplace/components/FilterBar.jsx:48-61`
- Modal base: `src/components/ui/Modal.jsx:18-22`
- Popup Criar: `src/marketplace/components/CreateModal.jsx:100-190`
- Contraste campos (Criar): `src/marketplace/components/CreateModal.jsx:118,123,137-141,155-158,165,172-184`
- Contraste campos (Filtro): `src/marketplace/components/FilterBar.jsx:60-66`