# FitTrack

Sistema web de gestão de academia para cadastro e acompanhamento de alunos
matriculados. A aplicação permite listar, cadastrar, editar e excluir alunos por
meio de uma interface React integrada a uma API REST.

## Funcionalidades

- Tela inicial com acesso ao sistema.
- Listagem de alunos matriculados em tabela.
- Cadastro de aluno com nome completo e e-mail.
- Edição de alunos existentes.
- Exclusão de alunos com confirmação no navegador.
- Validação dos campos do formulário:
  - nome obrigatório com pelo menos 3 caracteres;
  - e-mail obrigatório em formato válido.
- Indicadores de carregamento durante consultas e salvamentos.
- Notificações globais de sucesso e erro.
- Página 404 para rotas inexistentes.
- Cache e invalidação das consultas de alunos com TanStack Query.

## Tecnologias

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 6
- [Vite](https://vite.dev/) 8
- [Material UI](https://mui.com/) para componentes e layout
- [React Router](https://reactrouter.com/) para navegação
- [TanStack Query](https://tanstack.com/query) para consultas e mutações
- [Axios](https://axios-http.com/) para comunicação HTTP
- [Yup](https://github.com/jquense/yup) para validação
- [Zustand](https://zustand.docs.pmnd.rs/) para notificações globais

## Pré-requisitos

- Node.js compatível com as versões usadas no projeto
- npm
- Acesso à API REST configurada em `VITE_API_URL`

## Instalação

Clone o repositório, entre na pasta do projeto e instale as dependências:

```bash
git clone https://github.com/Math3ux/fittrack.git
cd fittrack
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

No Windows PowerShell, o mesmo arquivo pode ser copiado com:

```powershell
Copy-Item .env.example .env
```

Configure a URL da API no arquivo `.env`:

```env
VITE_API_URL=https://sua-api.example.com/api/v1/
```

O valor é lido pelo Vite em tempo de compilação. Depois de alterar o `.env`,
reinicie o servidor de desenvolvimento.

## Executando o projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Por padrão, o Vite informa no terminal a URL local da aplicação.

Para gerar a versão de produção:

```bash
npm run build
```

Para visualizar localmente a versão gerada:

```bash
npm run preview
```

Para executar o lint:

```bash
npm run lint
```

## API esperada

A aplicação usa Axios com `VITE_API_URL` como `baseURL` e espera os seguintes
endpoints:

| Método | Endpoint | Uso |
| --- | --- | --- |
| `GET` | `/alunos` | Lista todos os alunos |
| `GET` | `/alunos/:id` | Busca um aluno para edição |
| `POST` | `/alunos` | Cadastra um novo aluno |
| `PUT` | `/alunos/:id` | Atualiza um aluno |
| `DELETE` | `/alunos/:id` | Exclui um aluno |

O objeto de aluno utilizado pelo frontend possui o formato:

```json
{
  "id": "1",
  "nome": "Ana Souza",
  "email": "ana.souza@example.com"
}
```

As requisições possuem timeout de 5 segundos. Falhas de carregamento ou
alteração são exibidas na interface por meio das notificações globais.

## Rotas da aplicação

| Rota | Descrição |
| --- | --- |
| `/` | Página inicial |
| `/alunos` | Lista de alunos |
| `/alunos/novo` | Formulário de cadastro |
| `/alunos/editar/:id` | Formulário de edição |
| Qualquer outra rota | Página 404 |

As rotas de alunos são renderizadas por `RotaPrivada`. Atualmente, a
autenticação está simulada e a rota sempre considera o usuário autenticado.
Para habilitar login real, essa camada deve ser conectada a um estado de sessão
e a uma estratégia de autenticação.

## Estrutura do projeto

```text
fittrack/
├── public/                 # Arquivos públicos e ícones
├── src/
│   ├── components/         # Componentes reutilizáveis
│   ├── hooks/              # Hooks de consulta, como useAlunos
│   ├── pages/              # Páginas de listagem e formulário
│   ├── routes/             # Controle de rotas privadas
│   ├── services/           # Cliente Axios e integração com a API
│   ├── store/              # Estado global com Zustand
│   ├── App.tsx             # Rotas e páginas principais
│   └── main.tsx            # Ponto de entrada e providers
├── .env.example            # Exemplo de configuração de ambiente
├── index.html              # HTML base da aplicação
├── package.json             # Scripts e dependências
├── tsconfig*.json           # Configuração do TypeScript
└── vite.config.ts           # Configuração do Vite
```

## Fluxo de dados

1. `main.tsx` cria o `QueryClient` e disponibiliza o TanStack Query.
2. `App.tsx` configura o `BrowserRouter`, as rotas e as notificações globais.
3. `useAlunos` busca a lista em `GET /alunos` e mantém os dados em cache por
   cinco minutos.
4. `FormularioAluno` executa `POST` ou `PUT` conforme a presença do parâmetro
   `id`.
5. `ListaAlunos` executa `DELETE` após a confirmação do usuário.
6. Após uma mutação bem-sucedida, a consulta `alunos` é invalidada para que a
   lista seja atualizada.

## Desenvolvimento

Antes de abrir um pull request, recomenda-se executar:

```bash
npm run build
npm run lint
```

O build valida o TypeScript e gera a pasta `dist/`. Dependências, arquivos de
ambiente e artefatos de build não devem ser versionados; essas exclusões já
estão configuradas no `.gitignore`.

## Limitações conhecidas

- Não há fluxo de autenticação implementado; a proteção de rotas é apenas um
  ponto de extensão.
- Não há testes automatizados no repositório.
- O frontend depende da disponibilidade e do contrato da API externa.
- O build pode emitir um aviso sobre o tamanho do bundle principal; isso não
  impede a geração dos artefatos.
