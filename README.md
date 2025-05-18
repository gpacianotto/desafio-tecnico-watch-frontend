Este projeto é um desafio técnico da empresa Watch TV Brasil. Você pode encontrar uma versão dele rodando [aqui](https://desafio-tecnico-watch-frontend.vercel.app/).

# Como Rodar
1. Para rodar este projeto, o primeiro passo é instalar as dependências dele. Para isso, abra seu terminal na pasta do projeto e digite o seguinte comando:
```bash
npm install
```

2. Depois, crie um arquivo `.env` na raíz do projeto e configure a seguinte variável de ambiente:
```.env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

> Lembre-se que por padrão, o projeto irá rodar na porta 3000, então busque ocupar o `backend` com outra porta como no exemplo acima.

3. O terceiro e último passo é rodar a aplicação com o comando:
```bash
npm run dev
```
