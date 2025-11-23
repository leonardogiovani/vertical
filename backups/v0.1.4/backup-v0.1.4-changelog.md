## v0.1.4 – Changelog

### Mudanças Principais
- Substituição integral do fluxo de edição (`editpost`) pelo modelo “newpost” com etapas `UPLOAD → EDIT → DETAILS`.
- Criação de `EditPostContainerNew.jsx` e atualização das páginas para usar o novo fluxo.
- Remoção de todos os componentes legados de `src/components/editpost` (container, preview, form, donation, delivery, witnesses, publish, save state, validation, header, tipos e estilos).
- Integração entre `CreateOptions` e `Marketplace` via query params para abrir o popup de criação já posicionado e com o label correto ativo:
  - `Doar Item Usado` → `/donations?open=create&type=donation`
  - `Criar Campanha` → `/donations?open=create&type=request`
- Ajuste em `Marketplace.jsx` para ler `open=create` e `type=donation|request` e sincronizar modal e aba.

### Arquivos Alterados
- `src/pages/Create.jsx`: usa `EditPostContainerNew`.
- `src/pages/CreateTest.jsx`: usa `EditPostContainerNew`.
- `src/components/create/CreateOptions.jsx`: adiciona navegação para `/donations` com query params.
- `src/marketplace/pages/Marketplace.jsx`: lê query params e abre modal/seleciona aba.

### Arquivos Adicionados
- `src/components/editpost/EditPostContainerNew.jsx`: novo fluxo “newpost” integrado.

### Arquivos Removidos
- Toda a estrutura anterior de `src/components/editpost` (componentes, estilos e tipos).

### Verificação
- Build concluído com sucesso (`npm run build`).
- Preview disponível em `http://localhost:8080/`.

### Observações
- Dependências do projeto raiz preservadas; o novo fluxo foi implementado sem adicionar bibliotecas externas.