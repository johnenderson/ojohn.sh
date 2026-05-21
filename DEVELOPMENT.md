# Guia de Desenvolvimento

## Requisitos

- **Node.js** `>=18` (testado com v24)
- **Yarn** `>=1.22`

Para instalar o Yarn globalmente caso não tenha:

```bash
npm install -g yarn
```

## Configuração inicial

1. Clone o repositório e entre na pasta:

```bash
git clone <repo-url>
cd johnenderson.dev
```

2. Instale as dependências:

```bash
yarn install
```

Isso também executa `husky install` via o script `prepare`, configurando os git hooks para lint automático nos commits.

## Subindo localmente

```bash
yarn dev
```

O site ficará disponível em [http://localhost:3000](http://localhost:3000).

## Scripts disponíveis

| Comando               | Descrição                                                                  |
| --------------------- | -------------------------------------------------------------------------- |
| `yarn dev`            | Inicia o servidor de desenvolvimento                                       |
| `yarn build`          | Gera o build de produção                                                   |
| `yarn start`          | Inicia o build de produção localmente                                      |
| `yarn lint`           | Executa o ESLint                                                           |
| `yarn prettier:check` | Verifica a formatação do código                                            |
| `yarn prettier:fix`   | Corrige a formatação automaticamente                                       |
| `yarn eslint:fix`     | Corrige problemas de lint automaticamente                                  |
| `yarn typecheck`      | Executa a verificação de tipos do TypeScript                               |
| `yarn cypress`        | Abre o Cypress para testes E2E                                             |
| `yarn update:webperf` | Regenera o conteúdo de web performance a partir dos repositórios no GitHub |

## Qualidade de código

Os hooks de pré-commit (via Husky + lint-staged) rodam automaticamente o ESLint e o Prettier nos arquivos `.js`, `.ts`, `.tsx`, `.css` e `.md` antes de cada commit.

Para rodar as verificações manualmente:

```bash
yarn typecheck
yarn prettier:check
yarn lint
```

## Testes E2E

Os testes do Cypress precisam que o servidor de desenvolvimento esteja rodando:

```bash
# Terminal 1
yarn dev

# Terminal 2
yarn cypress
```

Os testes rodam contra `http://localhost:3000`.

## Scripts de conteúdo

A pasta `packages/scripts` contém scripts auxiliares. Para regenerar o conteúdo de tópicos de web performance a partir do GitHub:

```bash
yarn update:webperf
```

Se o script precisar de autenticação, crie um arquivo `.env.local` na raiz com um token do GitHub:

```
GITHUB_TOKEN=seu_token_aqui
```

O arquivo `.env.local` está no `.gitignore` e não será commitado.

## Stack tecnológica

- **Framework**: [Next.js](https://nextjs.org/) 13
- **Linguagem**: TypeScript
- **Estilização**: Emotion (CSS-in-JS) + MUI
- **Conteúdo**: MDX via `next-mdx-remote`
- **Animações**: Framer Motion
- **Deploy**: Vercel
