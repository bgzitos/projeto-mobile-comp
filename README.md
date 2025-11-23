# ExploradorDeJogos

*Aplicativo mobile para pesquisar, explorar e consultar informações à respeito de diversos jogos no universo de videogames, desenvolvido em React Native e Expo.*

---

## Sobre o Projeto

O ExploradorDeJogos é um catálogo de jogos intuitivo e moderno. Seu objetivo principal é permitir que usuários naveguem por uma vasta biblioteca e acessem detalhes de seus jogos favoritos. O projeto foca em uma experiência de usuário fluida, com design responsivo e funcionalidades interativas.

---

## Funções Principais

* **Listagem de Jogos Populares:** Listagem de Jogos Populares: Tela inicial com scroll infinito (paginação) exibindo os jogos em alta.
* **Busca Interativa:** Pesquise jogos pelos seus nomes em tempo real.
* **Tela de Detalhes:** Veja informações detalhadas sobre os jogos, como sua sinopse, plataformas imagem da capa e avaliação.
* **Carregamento dinâmico:** Feedbacks visuais de `loading`, e tratamento de erros em todas requisições à API.

### Diferenciais (UI/UX)

* **Dark/Light Mode:** Suporte completo a temas claro e escuro, com persistência da escolha do usuário.
* **Animações:** Transições de tela suaves com animações de "fade-in" e microinterações de toque.
* **Design Responsivo:** Layout adaptável que funciona bem em diferentes telas.

---

## Tecnologias usadas

* **Core:** React Native, Expo
* **Navegação:** Expo Router
* **Gerenciamento de Estados:** React Hooks (useState, useEffect, useContext) e Context API
* **Persistência de Dados:** AsyncStorage (para salvar o tema)
* **Requisições HTTPS:** Axios
* **API Externa:** RAWG Video Games Database API

---

## Como usar

Siga os passos abaixo para rodar o aplicativo em ambiente local.

## Pré-requisitos

* Node.js (versão LTS recomendada)
* Dispositivo físico (Android ou IOS) com o app Expo Go
* Uma chave de API gratuita da [RAWG](https://rawg.io/apidocs).

### Instalação

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/bgzitos/projeto-mobile-comp
    cd projeto-mobile-comp
    ```

2. **Instale as dependências:**
    *Nota: utilize a flag `--legacy-peer-deps` para evitar conflitos de versões*
    ```bash
    npm install --legacy-peer-deps
    ```

3. **Configure a chave da API:** 
    Para que o app consiga buscar os dados, você precisa adicionar sua chave.
    * Abra o arquivo `app.json` na raiz do projeto.
    * Localize a seção `"extra"` (ou crie se não existir) dentro de `"expo"` e adicione sua chave:

    ```json
    "expo": {
      ...
      "extra": {
        "rawgApiKey": "SUA_CHAVE_DA_RAWG_AQUI"
      }
    }
    ```

### Execução

1. **Inicie o servidor de desenvolvimento:**
    *Recomendo limpar o cache na primeira execução.*
    ```bash
    npx expo start -c
    ```

2. **Abra no celular:**
    * Escaneie o **QRCode** exibido no terminal com o app do **Expo Go**.

---

## API Utilizada

Este projeto consome a [**RAWG Video Games Database API**](https://rawg.io/apidocs). 
Ela fornece todos os dados necessários para a listagem, busca e detalhamento dos jogos no aplicativo.

--- 

## Vídeo de Demonstração

* **[Assista ao vídeo de demonstração do ExploradorDeJogos aqui]**(https://drive.google.com/drive/folders/1LJ0aBQKJ5obB0wW5dK6PLBYWnGtdBEI9?usp=sharing)

---

*Desenvolvido por Lucas Borges para o Processo Seletivo Mobile 2025/2.*
