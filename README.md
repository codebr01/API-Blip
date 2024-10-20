
# Projeto Blip API - Frontend com React e Backend com Node.js

Este projeto é uma aplicação web que consome a API do Blip, desenvolvida com React no frontend, utilizando Tailwind CSS para estilização e Toastify para notificações. O backend é implementado em Node.js, utilizando Fastify para lidar com as requisições HTTP e Zod para validação de dados.

Aqui está a seção "Funcionalidades" atualizada para refletir os requisitos específicos do projeto:

## Funcionalidades

- **Login com chave de API do bot**: O usuário precisa inserir uma chave de API do bot para acessar a aplicação e autenticar suas solicitações.
- **Home com lista de contatos**: A tela inicial exibe os contatos salvos do bot, permitindo uma visualização rápida dos contatos disponíveis.
- **Visualização de mensagens de um contato**: Permite ao usuário selecionar um contato específico para ver as conversas associadas a ele.
- **Consumo da API do Blip**: A aplicação interage com a API para enviar e receber dados, garantindo comunicação contínua com o bot.
- **Notificações em tempo real**: Utiliza Toastify para exibir notificações de sucesso, erro e informações importantes para o usuário.
- **Estilização moderna com Tailwind CSS**: A interface do usuário é estilizada com Tailwind CSS para uma experiência visual moderna e responsiva.
- **Validação de dados no backend**: Zod é utilizado para validar as requisições e respostas, garantindo a integridade dos dados.

## Tecnologias Utilizadas

### Frontend
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React-Toastify](https://fkhadra.github.io/react-toastify/)

### Backend
- [Node.js](https://nodejs.org/)
- [Fastify](https://www.fastify.io/)
- [Zod](https://zod.dev/)

### Backend

O backend utiliza Fastify para gerenciar as rotas e Zod para a validação de dados. A comunicação com a API do Blip é feita através de uma rota que encaminha as requisições e respostas entre o cliente e o Blip.

### Frontend

O frontend é uma aplicação React que consome o backend para interagir com a API do Blip. O Tailwind CSS é usado para estilizar os componentes, e o Toastify para exibir notificações para o usuário.
