# v0.1.4 – Documentação

## Contexto
Esta versão substitui integralmente o fluxo de edição de post pelo modelo “newpost”, organiza a ligação entre os botões de criação e as opções do popup central na página de doações, e remove componentes legados para reduzir complexidade.

## Fluxo “newpost”
- Etapas: `UPLOAD → EDIT → DETAILS`.
- Abas de tipo: `POST` (foto/álbum), `VIDEO` (reels), `ARTIGO` (texto).
- UPLOAD: aceita arquivo conforme aba selecionada.
- EDIT:
  - POST: visualização com filtros visuais simples.
  - VIDEO: player nativo com controles.
  - ARTIGO: editor básico com toolbar minimalista.
- DETAILS: legenda e `Habilitar Doações` (toggle).
- Publicar: retorna payload mínimo (`type`, `caption`, `donationsEnabled`) e fecha overlay.

## Integração com Doações
- `CreateOptions` passa a navegar para a rota de doações com query params:
  - `Doar Item Usado` → `/donations?open=create&type=donation`
  - `Criar Campanha` → `/donations?open=create&type=request`
- `Marketplace.jsx` lê `open` e `type` na montagem:
  - `open=create` abre o `CreateModal` centralizado.
  - `type=donation|request` seleciona a aba correta e ativa o label (ex.: “Quero Doar”, “Criar campanha”).

## Arquivos
- Alterados:
  - `src/pages/Create.jsx`: import atualizado para `EditPostContainerNew`.
  - `src/pages/CreateTest.jsx`: import atualizado para `EditPostContainerNew`.
  - `src/components/create/CreateOptions.jsx`: navegação para `/donations` com `open`/`type`.
  - `src/marketplace/pages/Marketplace.jsx`: leitura de query params e sincronização modal/aba.
- Adicionado:
  - `src/components/editpost/EditPostContainerNew.jsx`: implementação do fluxo.
- Removidos:
  - Todos os componentes legados de `src/components/editpost` (incluindo pastas `styles/` e `types/`).

## Testes e Verificação
- `npm run build` finalizado com sucesso.
- Preview ativo em `http://localhost:8080/`.
- Validação visual: ao clicar em “Doar Item Usado”/“Criar Campanha” em `CreateOptions`, o popup central abre na página de doações com o label correto ativo.

## Considerações de Manutenção
- O novo fluxo não adiciona dependências externas; mantém o bundle enxuto.
- Se desejado, renomear `EditPostContainerNew.jsx` para `EditPostContainer.jsx` e ajustar imports para padronização.