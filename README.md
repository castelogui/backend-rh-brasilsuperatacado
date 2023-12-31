<h1 align="center">RH Brasil Super Atacado - Backend</h1>

<p align="center">
  <a href="https://wakatime.com/badge/user/b889ed60-65c5-4d75-a1e7-65c986b29d59/project/018c34c8-8a85-415a-b44e-5bdb3c86249d"><img src="https://wakatime.com/badge/user/b889ed60-65c5-4d75-a1e7-65c986b29d59/project/018c34c8-8a85-415a-b44e-5bdb3c86249d.svg" alt="wakatime"></a>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/castelogui/backend-rh-brasilsuperatacado">
  <a href="https://github.com/castelogui/backend-rh-brasilsuperatacado/blob/main/LICENCE">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
  </a>
  <a href="https://www.linkedin.com/in/castelo-guilherme/">
    <img alt="Made by castelogui" src="https://img.shields.io/badge/made%20by-castelogui-%2304D361">
  </a>
  <a href="https://github.com/castelogui/backend-rh-brasilsuperatacado/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/castelogui/backend-rh-brasilsuperatacado">
  </a>
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/castelogui/backend-rh-brasilsuperatacado">
</p>

## 💻 O Projeto 

Um backend REST API para a equipe do RH Brasil Super Atacado gerenciar as entradas e saídas de EPIs e Uniformes de seus funcionários.

## :rocket: Tecnologias

Este projeto foi desenvolvido comm as seguintes Tecnologias:

- [TypeScript][typescript]
- [Node.js][nodejs]
- [TypeOrm][typeorm]
- [Docker-compose][docker-compose]

## 🔖 Funcionalidades

### Categorias

| STATUS | ACTION | METHOD | ROUTE |
|-------------|-------|--------------|--------------|
| :heavy_check_mark: | cadastrar categoria | POST | /categories |
| :heavy_check_mark: | buscar categorias | GET | /categories |
| :heavy_check_mark: | buscar categoria | GET | /categories/:id |
| :heavy_check_mark: | atualizar categoria | PUT | /categories/:id |
| :heavy_check_mark: | deletar categoria | DELETE | /categories/:id |

### Cores

| STATUS | ACTION | METHOD | ROUTE |
|-------------|-------|--------------|--------------|
| :heavy_check_mark: | cadastrar cor | POST | /colors |
| :heavy_check_mark: | buscar cores | GET | /colors |
| :heavy_check_mark: | buscar cor | GET | /colors/:id |
| :heavy_check_mark: | atualizar cor | PUT | /colors/:id |
| :heavy_check_mark: | deletar cor | DELETE | /colors/:id |

### Itens

| STATUS | ACTION | METHOD | ROUTE |
|-------------|-------|--------------|--------------|
| :heavy_check_mark: | cadastrar item | POST | /items |
| :heavy_check_mark: | buscar itens | GET | /items |
| :heavy_check_mark: | buscar item | GET | /items/:id |
| :heavy_check_mark: | atualizar item | PUT | /items/:id |
| :heavy_check_mark: | deletar item | DELETE | /items/:id |

### Tipo de Movimento

| STATUS | ACTION | METHOD | ROUTE |
|-------------|-------|--------------|--------------|
| :heavy_check_mark: | cadastrar tipo movimento | POST | /typemovement |
| :heavy_check_mark: | buscar tipos movimento | GET | /typemovement |
| :heavy_check_mark: | buscar tipo movimento | GET | /typemovement/:id |
| :heavy_check_mark: | atualizar tipo movimento | PUT | /typemovement/:id |
| :heavy_check_mark: | deletar tipo movimento | DELETE | /typemovement/:id |

### Movimento

| STATUS | ACTION | METHOD | ROUTE |
|-------------|-------|--------------|--------------|
| :heavy_check_mark: | cadastrar movimento | POST | /movement |
| :heavy_check_mark: | buscar movimentos | GET | /movement |
| :heavy_check_mark: | buscar movimento | GET | /movement/:id |
| :heavy_check_mark: | atualizar movimento | PUT | /movement/:id |
| :heavy_check_mark: | deletar movimento | DELETE | /movement/:id |

## :interrobang: Como usar

Para clonar esta aplicação é preciso ter o [Git](https://git-scm.com) e o [Node.js][nodejs] v18.13.0 instalado em seu computador.

```bash
# Clonar esse repositório
$ git clone https://github.com/castelogui/backend-rh-brasilsuperatacado

# Navegue até o diretório
$ cd backend-rh-brasilsuperatacado

# Instale as dependências
$ pnpm install

# Suba o docker-compose disponível no repositório
$ docker-compose up -d

# Em seu .env defina as seguintes variáveis
# - URL do banco que subiu no docker
DATABASE_URL="postgresql://postgres:pwadmin@localhost:5433/postgres"
# - Porta para utilizar a api (qualquer porta disponível)
PORT=3000

# Inicie a aplicação 
$ pnpm run dev

# A aplicação estará rodando em 
localhost:3000/

```

## 🛫 Deploy

Foi feito deploy utilizando a [Vercel][vercel] e o [Neon][neon]

Primeiro crie sua conta no [Neon][neon] e adicione um projeto de banco de dados para conseguir o DATABASE_URL.

Adicione o projeto na vercel com a seguinte variável de ambiente:
- DATABASE_URL="link_do_seu_projeto_de_banco_de_dados_na_neon"

Após iniciar o deploy, a vercel irá pegar as configurações do arquivo *vercel.json* e irá rodar o comando __vercel-build__ disponível no package.json.

```bash
# Arquivo vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "(.*)",
      "dest": "src/server.ts"
    }
  ]
}
```

```bash
# Comando para a vercel fazer o build
    "vercel-build": "typeorm-ts-node-commonjs migration:run -d src/database/AppDataSource.ts"
```

## Como contribuir

- Faça a *fork*;
- Crie uma *branch* de sua feature: `git checkout -b minha-alteracao`;
- Faça um *commit* de suas mudanças: `git commit -m 'mudanças: minha-alteracao'`;
- De um *push* da sua branch: `git push origin minha-alteracao`.

Depois de mesclar seu *pull request*, você pode deletar a sua *branch*.

## :memo: License

Este projeto está sob a MIT License. Consulte [LICENSE](https://github.com/castelogui/backend-rh-brasilsuperatacado/blob/master/LICENSE) para mais detalhes.

[nodejs]: https://nodejs.org/
[typescript]: https://www.typescriptlang.org/
[typeorm]: https://typeorm.io/
[docker-compose]: https://docs.docker.com/compose/
[vercel]: https://vercel.com/
[neon]: https://neon.tech/

-----

<p align="left">
<a href="#">#étudocrud</a>
</p>
