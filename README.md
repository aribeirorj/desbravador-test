# GitHub Explorer

Aplicação para buscar usuários do GitHub e ver os repositórios de cada um, ordenados por estrelas.

## Como rodar

Precisa do Node 24.

```bash
npm install
npm run dev
```

Depois é só abrir http://localhost:5173.

## Scripts

- `npm run dev` - servidor de desenvolvimento
- `npm run build` - build de produção
- `npm test` - roda os testes
- `npm run lint` - ESLint
- `npm run typecheck` - checagem de tipos
- `npm run format` - formata o código com Prettier

## Tecnologias

React 19, TypeScript, Vite, React Router, TanStack Query, Axios e Bootstrap. Os testes usam Vitest e Testing Library.

## Funcionalidades

- Busca de usuários pelo username ou pelo nome, enquanto digita
- Perfil do usuário com avatar, seguidores, seguidos, e-mail e bio
- Lista de repositórios ordenada por estrelas, com opção de ordenar por nome ou por atualização mais recente
- Página de detalhes do repositório com link para o GitHub
- A busca e a ordenação ficam na URL, então dá para compartilhar o link

## Observações

A API do GitHub sem autenticação permite 60 requisições por hora (10 por minuto na busca). Se o limite estourar, a aplicação mostra uma mensagem de erro com a opção de tentar novamente.
