# Vertical Doe - Plataforma de Doação Social

**Versão:** 0.1.2  
**Data:** 20 de novembro de 2025  
**Hora:** 21:30 BRT (Brasília)

## 📋 Visão Geral

O Vertical Doe é uma plataforma social inovadora focada em doações e ajuda comunitária, conectando pessoas que querem ajudar com aquelas que precisam de apoio. A plataforma oferece múltiplas formas de contribuição: doações financeiras, itens físicos, campanhas de arrecadação e conteúdo educativo.

## 🎯 Objetivo

Criar uma rede social positiva que democratize a filantropia, facilitando doações de todos os tamanhos e tipos, desde R$1 até grandes campanhas, com transparência total e engajamento comunitário.

## 🏗️ Arquitetura do Sistema

### Tecnologias Utilizadas
- **Frontend:** React 18 + Vite + TypeScript
- **Estilização:** Tailwind CSS + CSS Modules
- **State Management:** Zustand
- **Roteamento:** React Router DOM v6
- **Build Tool:** Vite
- **Package Manager:** npm

### Estrutura de Pastas
```
src/
├── components/           # Componentes reutilizáveis
│   ├── create/        # Criação de posts
│   ├── donate/        # Doações e campanhas
│   ├── editpost/      # Sistema EditPost universal
│   ├── feed/          # Feed de conteúdo
│   ├── inbox/         # Mensagens e notificações
│   ├── layout/        # Layout da aplicação
│   ├── profile/       # Perfil do usuário
│   └── ui/            # Componentes UI base
├── pages/             # Páginas principais
├── styles/            # Estilos globais e variáveis
└── utils/             # Utilitários e helpers
```

## 🎨 Design System

### Cores Primárias
- **Primary:** `#00E6C3` (verde vibrante)
- **Primary Hover:** `#00BFA5` (tom mais escuro)
- **Primary Light:** `#E6FFF9` (fundo claro)
- **Primary Dark:** `#00A693` (tom escuro)

### Paleta de Cores Completa
```css
:root {
  --color-primary: #00E6C3;
  --color-primary-hover: #00BFA5;
  --color-primary-light: #E6FFF9;
  --color-primary-dark: #00A693;
  
  --color-background: #FFFFFF;
  --color-background-secondary: #F8F9FA;
  --color-surface: #FFFFFF;
  --color-surface-hover: #F5F5F5;
  
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;
  
  --color-border: #E5E7EB;
  --color-border-hover: #D1D5DB;
  
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  
  --color-overlay: rgba(0, 0, 0, 0.5);
  --color-overlay-light: rgba(0, 0, 0, 0.3);
}
```

### Tipografia
- **Font Family:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Tamanhos:** 12, 14, 16, 18, 20, 24, 32px
- **Pesos:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Espaçamento
- **Unit Base:** 4px
- **Escalas:** 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px

## 📱 Funcionalidades Principais

### 1. Sistema EditPost Universal
**Status:** ✅ Implementado e Funcional

O EditPost é o componente central que gerencia a criação e edição de todos os tipos de conteúdo da plataforma.

#### Tipos de Postagem Suportados:

**🎬 Reels (Vídeos Curtos)**
- Duração: 1-90 segundos
- Formatos: MP4, MOV, AVI, WebM
- Limite: 500MB por vídeo
- Preview: Player com controles de timeline
- Campos: Legenda (0-2200 chars), hashtags, localização, doação R$1

**📸 Fotos (Single/Carrossel)**
- Quantidade: 1-10 fotos
- Formatos: JPG, JPEG, PNG, HEIC, WebP, GIF
- Limite: 10MB por foto, 50MB total
- Preview: Carrossel com indicadores e navegação
- Campos: Legenda (0-2200 chars), hashtags, localização, doação R$1

**📝 Artigos (Texto Longo)**
- Título: 10-150 caracteres (obrigatório)
- Corpo: 100-10,000 caracteres (obrigatório)
- Cover image: 1 imagem obrigatória, máximo 5MB
- Categoria: Seleção obrigatória
- Campos: Hashtags, localização (sem doação)

**🎁 Doação de Itens Físicos**
- Fotos: Mínimo 3 fotos obrigatórias, máximo 10
- Nome: 5-100 caracteres (obrigatório)
- Descrição: 20-1000 caracteres (obrigatório)
- Condição: Novo/Usado-Bom/Usado-Ruim (obrigatório)
- Categoria: Seleção obrigatória
- Entrega: Retirada local, entrega, correio

**💰 Campanhas de Arrecadação**
- Fotos: Mínimo 3 fotos obrigatórias, máximo 10
- Título: 10-100 caracteres (obrigatório)
- Subtítulo: 0-200 caracteres (opcional)
- Descrição: 50-3000 caracteres (obrigatório)
- Meta financeira: Opcional, R$1-1.000.000
- Prazo: 1-365 dias (obrigatório)
- Testemunhas: Exatamente 3 usuários (obrigatórias)

### 2. Sistema de Doação
**Status:** ✅ Implementado

- **Doação rápida R$1:** Para Reels e Fotos
- **Meta específica:** Para campanhas com valor definido
- **Doação de itens:** Sistema completo para doação física
- **Transparência:** Testemunhas para campanhas maiores

### 3. Feed de Conteúdo
**Status:** ✅ Implementado

- **Posts variados:** Vídeos, fotos, artigos, doações, campanhas
- **Interface responsiva:** Mobile-first design
- **Expandable text:** Textos longos com opção de expandir
- **Tipos visuais:** Indicadores claros para cada tipo de conteúdo

### 4. Marketplace de Doações
**Status:** ✅ Implementado

- **Campanhas em destaque:** Cards informativos com progresso
- **Itens disponíveis:** Carrossel de itens para doação
- **Filtros por categoria:** Facilidade para encontrar necessidades
- **Interface intuitiva:** Design clean e moderno

### 5. Sistema de Perfil
**Status:** ✅ Implementado

- **ProfileTabs magnético:** Fixo no topo com scroll-to-top
- **Grid de posts:** Visualização em grade para posts do perfil
- **Popup de posts:** Visualização detalhada ao clicar
- **Interface adaptativa:** Funciona perfeitamente em todas as resoluções

## 🔧 Componentes Técnicos

### EditPost Container
```javascript
// Props principais
{
  postType: 'reel' | 'photo' | 'article' | 'item_donation' | 'campaign',
  media: Array<MediaFile>,
  mode: 'create' | 'edit',
  onClose: Function,
  onSave: Function,
  onPublish: Function
}
```

### Sistema de Validação
```javascript
// Regras por tipo de post
const VALIDATION_RULES = {
  reel: {
    media: { required: true, type: 'video', maxDuration: 90 },
    caption: { maxLength: 2200 }
  },
  photo: {
    media: { required: true, type: 'image', maxCount: 10 },
    caption: { maxLength: 2200 }
  },
  article: {
    title: { required: true, minLength: 10, maxLength: 150 },
    body: { required: true, minLength: 100, maxLength: 10000 }
  }
  // ... mais regras para outros tipos
}
```

### Sistema de Upload
- **Preview instantâneo:** Visualização imediata de mídias
- **Validação de formato:** Suporte a formatos específicos por tipo
- **Limites de tamanho:** Controle rigoroso de tamanho de arquivos
- **Progress bar:** Indicador visual de progresso de upload

## 🎨 Wireframes e Layouts

### Layout Base EditPost
```
┌─────────────────────────────────────────┐
│ [← Voltar]  Publicar Post  [Rascunho]  │ ← Header 56pt
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │                                 │   │ ← Preview Area
│  │    CONTEÚDO PREVIEW             │   │   (condicional por tipo)
│  │    (Vídeo/Foto/Texto)           │   │   200-400pt altura
│  │                                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [Avatar] Seu Nome              [↓]    │ ← Identidade + Visibilidade
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  SEÇÃO DE METADADOS                     │ ← Scroll vertical
│  (Condicional por tipo de post)        │
│                                         │
│  • Legenda/Título                       │
│  • Hashtags                             │
│  • Localização                          │
│  • Configurações de doação              │
│  • Opções avançadas                     │
│                                         │
├─────────────────────────────────────────┤
│  [PUBLICAR AGORA]                       │ ← Footer fixo 64pt
└─────────────────────────────────────────┘
```

### Preview por Tipo

**Reel Preview:**
```
┌─────────────────────────────────────┐
│                                     │
│        VIDEO PLAYER                 │ ← 9:16, 300pt altura
│        [▶️ Play/Pause]              │   Controles overlay
│        [🔊 Mute] [✂️ Editar]        │
│                                     │
│  ▌▌▌▌▌▌▌▌▌░░░░░░░░ 35s / 60s      │ ← Timeline com trim
└─────────────────────────────────────┘
```

**Photo Preview:**
```
┌─────────────────────────────────────┐
│  [<]  FOTO 1 de 5  [>]              │ ← Navegação se múltiplas
│                                     │
│        IMAGEM PREVIEW               │ ← 1:1 ou 4:5, 280pt
│        [✏️ Editar] [🗑️ Remover]     │   Ações overlay
│                                     │
│  ●●○○○                              │ ← Indicadores carrossel
└─────────────────────────────────────┘
```

## 🐛 Bugs Conhecidos e Correções

### Bugs Corrigidos na v0.1.2

1. **Modal Click Propagation Issue**
   - **Problema:** Botões de opções não abriam o popup EditPost
   - **Solução:** Implementado `preventClose` e `stopPropagation()`

2. **Complex State Management**
   - **Problema:** Sistema de steps causava timing issues
   - **Solução:** Simplificado para boolean flags independentes

3. **Event Handling Conflicts**
   - **Problema:** Modal fechava e navegava antes da seleção completar
   - **Solução:** Adicionado delays e prevenção de fechamento

4. **Component Rendering Issues**
   - **Problema:** Erros de sintaxe e imports faltando
   - **Solução:** Corrigido imports e dependências circulares

5. **CSS Import Issues**
   - **Problema:** Arquivos CSS sendo importados mas não existiam
   - **Solução:** Criado todos os arquivos CSS necessários

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js 18.16.1 ou superior
- npm ou pnpm

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd vertical-doe

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

### Build para Produção
```bash
# Build otimizado
npm run build

# Preview do build
npm run preview
```

## 📊 Performance e Otimização

### Métricas de Implementação
- **Arquivos criados:** 25+ novos componentes e estilos
- **Linhas de código:** ~3000+ linhas de código React/JavaScript
- **Componentes reutilizáveis:** 15+ componentes modulares
- **Cobertura de tipos:** 5 tipos de postagem completamente implementados

### Otimizações Aplicadas
- **Design tokens:** Sistema consistente de cores e espaçamentos
- **Componentes modulares:** Reutilização máxima de código
- **Validação em tempo real:** Feedback instantâneo ao usuário
- **Lazy loading:** Componentes carregados sob demanda
- **Mobile first:** Otimizado para dispositivos móveis

## 🔮 Próximas Etapas

### Funcionalidades Planejadas
1. **Editor de texto rico:** WYSIWYG para artigos
2. **Ferramentas de edição de mídia:** Crop, filtros, ajustes
3. **Agendamento de posts:** Publicação programada
4. **Templates de postagem:** Templates pré-definidos
5. **Analytics integrado:** Métricas de desempenho

### Melhorias de Performance
1. **Cache de mídia:** Sistema de cache para previews
2. **Upload progressivo:** Upload em background
3. **Validação assíncrona:** Validações complexas em background
4. **Code splitting:** Divisão inteligente de código

## 📞 Suporte e Contribuição

### Reportar Bugs
- Use o sistema de issues do repositório
- Inclua passos para reproduzir o problema
- Adicione screenshots se possível

### Contribuir
- Fork o repositório
- Crie uma branch para sua feature
- Faça pull request com descrição detalhada

## 📄 Licença

Este projeto está sob licença [tipo de licença]. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ para a comunidade**  
**Vertical Doe - Conectando quem pode ajudar com quem precisa**