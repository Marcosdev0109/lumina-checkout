# Lumina Store

Loja virtual de iluminação desenvolvida em **React + Vite** como **Projeto Avaliativo do Módulo 2 (Semana 12)** do curso Front-End React (SC Tech / SENAI-SC).

É a evolução do **Lumina Checkout**, o Mini-Projeto da Semana 07: o checkout com carrinho fixo virou uma loja completa, com catálogo vindo de uma API, busca, detalhe do produto, carrinho compartilhado com Context API e o mesmo fluxo de pagamento simulado.

> **Autor:** João Marcos Rodrigues Barbosa
> **Repositório:** https://github.com/Marcosdev0109/lumina-checkout

---

## Sumário

- [Links do projeto](#links-do-projeto)
- [O problema que o sistema resolve](#o-problema-que-o-sistema-resolve)
- [Funcionalidades](#funcionalidades)
- [Assistente de iluminação](#assistente-de-iluminação-novo)
- [Identidade visual](#identidade-visual)
- [Fluxo do usuário e rotas](#fluxo-do-usuário-e-rotas)
- [Tecnologias e técnicas](#tecnologias-e-técnicas)
- [Arquitetura e estrutura de pastas](#arquitetura-e-estrutura-de-pastas)
- [Como executar](#como-executar)
- [API simulada (json-server)](#api-simulada-json-server)
- [Testes](#testes)
- [Build e deploy](#build-e-deploy)
- [Acessibilidade e responsividade](#acessibilidade-e-responsividade)
- [Organização das tarefas e versionamento](#organização-das-tarefas-e-versionamento)
- [Uso de IA](#uso-de-ia)
- [Créditos das imagens](#créditos-das-imagens)
- [Melhorias futuras](#melhorias-futuras)

---

## Links do projeto

| Item | Link |
| --- | --- |
| Aplicação publicada (Netlify) | https://lumina-store-marcos.netlify.app |
| Quadro do Trello | https://trello.com/b/LzOY372y/lumina-store-projeto-avaliativo-m2s12 |
| Vídeo de apresentação (até 7 min) | https://drive.google.com/file/d/1EDyT3i_ktIViGglFCa9D5ROFXbAswQ4w/view?usp=drive_link |

## O problema que o sistema resolve

No Mini-Projeto da Semana 07, a Lumina tinha apenas a etapa final da compra: um carrinho fixo, o formulário do cartão e as telas de sucesso e falha. A loja agora precisava permitir que o cliente **navegasse pelo catálogo, encontrasse o que procura e montasse o próprio carrinho** antes de pagar.

A **Lumina Store** fecha esse ciclo de e-commerce: vitrine → busca → detalhe do produto → carrinho → checkout. Os produtos vêm de uma API REST simulada com json-server, o carrinho é controlado por Context API e o pagamento continua sendo **apenas uma simulação no navegador**: nenhum dado de cartão é enviado ou armazenado.

## Funcionalidades

**Catálogo e API (Grupo A)**

- `db.json` com **12 produtos em 4 categorias** (Luminárias de Mesa, Pendentes, Lâmpadas, Fitas e Barras de LED).
- Página `/produtos` com `fetch` dentro de `useEffect`, tratando **carregamento**, **erro** (API fora do ar, com botão "Tentar novamente") e **lista vazia**.
- Componente `ProdutoCard` com imagem e texto alternativo, nome, categoria, preço em reais, link para o detalhe e botão "Adicionar ao carrinho".
- **Busca controlada** que filtra pelo nome enquanto o usuário digita, sem diferenciar maiúsculas, minúsculas e acentos ("lampada" encontra "Lâmpada"). A regra fica em `utils/busca.js` e o resultado é calculado com `useMemo`. Sem resultados, aparece "Nenhum produto encontrado" e o botão "Limpar busca".
- **Rota dinâmica** `/produtos/:id` com `useParams`, buscando `GET /produtos/:id` e exibindo "Produto não encontrado" quando o id não existe.

**Carrinho com Context API (Grupo B)**

- `CarrinhoContext` com Provider envolvendo as rotas e o custom hook `useCarrinho`, expondo `itens`, `adicionarItem`, `alterarQuantidade`, `removerItem`, `limparCarrinho`, `quantidadeTotal` e `valorTotal`.
- Adicionar soma 1 quando o produto já está no carrinho e **nunca ultrapassa o estoque** (o botão vira "Limite de estoque atingido").
- Página `/carrinho` com aumentar/diminuir (mínimo 1, máximo o estoque), remover, subtotal de cada item e total em reais. Carrinho vazio mostra mensagem e link para `/produtos`.
- **Contador no Header** com o `Badge` do Material UI, atualizado em todas as páginas.

**Pagamento e resultado (Grupo C)**

- Formulário de `/pagamento` com **React Hook Form + Zod** e as mesmas regras do Mini-Projeto: titular preenchido, cartão com 16 dígitos (ignorando espaços e hífens), validade MM/AA com mês entre 01 e 12 e CVV com 3 dígitos. O total vem do `CarrinhoContext`.
- Processamento assíncrono com "Processando compra..." e botão desabilitado.
- Cartão com todos os dígitos iguais leva a `/falha` com a mensagem exata **"tentativa de golpe"**; os demais vão para `/sucesso`.
- **Rota privada**: `/pagamento` só abre com pelo menos um item no carrinho; caso contrário redireciona para `/carrinho`.
- Compra aprovada **limpa o carrinho**. Na falha os itens são mantidos e o botão "Tentar novamente" volta para `/pagamento`.

**Bônus implementados**

- ⭐ Carrinho persistente no `localStorage` (sobrevive ao recarregar a página).
- ⭐ Busca sincronizada com a URL (`/produtos?busca=lampada`) com `useSearchParams`.
- ⭐ Filtro por categoria e ordenação por preço.
- ⭐ Teste de componente com React Testing Library e relatório de cobertura.

## Assistente de iluminação (novo)

Rota `/assistente`, no menu do topo. O cliente responde quatro perguntas (cômodo, tamanho em m², o que quer fazer com a luz e estilo) e um orçamento opcional. O assistente:

- calcula os **lúmens recomendados** para o cômodo: lux de referência × área (por exemplo, escritório com 500 lux, como na NBR ISO/CIE 8995-1);
- pontua cada produto do catálogo pelos critérios atendidos e mostra **até 3 recomendações**, com o motivo de cada uma e a compatibilidade em %;
- ignora produtos sem estoque ou acima do orçamento e desempata pelo menor preço;
- traz uma **tabela para comparar** as opções e o botão para adicionar ao carrinho.

As regras ficam em `src/utils/recomendacao.js` (funções puras) e têm testes em `recomendacao.test.js` e `Assistente.test.jsx`. Cada produto do `db.json` ganhou os campos `ambientes`, `estilos` e `usos`.

## Identidade visual

O visual foi redesenhado para combinar com as fotos dos produtos e deixar o produto em primeiro plano.

| Elemento | Decisão |
|----------|---------|
| **Paleta "luz quente"** | Fundo off-white `#faf7f2`, texto e superfícies em grafite `#1c1917` e acento em latão `#d6a04a`, definidos como variáveis CSS em `index.css` e repetidos no tema do Material UI (`tema.js`) |
| **Tipografia** | Inter no texto e Fraunces nos títulos (Google Fonts), com `theme-color` do navegador na cor de fundo |
| **Marca** | Logo com pendente e feixe de luz; header translúcido com o carrinho em formato de pílula; rodapé em grafite |
| **Catálogo** | Faixa de destaque com foto de ambiente (`DestaqueCatalogo`) e chips de categoria com o `Chip` do Material UI (`ChipsCategorias`) |
| **Card de produto** | Uma ação principal ("Adicionar ao carrinho", grafite `#44403c`) e uma secundária ("Ver detalhes", borda fina), as duas com 44px de altura; o nome reserva duas linhas para preço e botões ficarem alinhados em todos os cards |
| **Checkout** | Prévia realista do cartão, que vira para o verso ao preencher o CVV (`CartaoPreview`), e indicador das etapas da compra no carrinho, no pagamento e no sucesso (`EtapasCompra`) |
| **Movimento** | Cards sobem levemente ao passar o mouse ou receber foco; tudo é desligado para quem ativa "reduzir movimento" |

## Fluxo do usuário e rotas

1. Acessar a loja e ser direcionado para `/produtos`, onde a lista é carregada da API.
2. Buscar, filtrar por categoria ou ordenar por preço.
3. Abrir o detalhe em `/produtos/:id`.
4. Adicionar produtos ao carrinho (pelo card ou pelo detalhe) e acompanhar o contador no Header.
5. Em `/carrinho`, alterar quantidades, remover itens e conferir subtotais e total.
6. Clicar em "Finalizar compra" e ir para `/pagamento` (apenas com itens no carrinho).
7. Preencher dados fictícios, enviar e ver "Processando compra...".
8. Ir para `/sucesso` (carrinho limpo) ou `/falha` com "tentativa de golpe" (carrinho mantido).

| Rota | Página | Observação |
| --- | --- | --- |
| `/` | — | Redireciona para `/produtos` |
| `/produtos` | Produtos | Lista da API, busca, filtro e ordenação |
| `/produtos/:id` | DetalheProduto | Rota dinâmica com `useParams` |
| `/carrinho` | Carrinho | Itens do `CarrinhoContext` |
| `/pagamento` | Pagamento | Rota privada (`RotaPrivada` + `Navigate`) |
| `/sucesso` | Sucesso | Confirma a compra e limpa o carrinho |
| `/falha` | Falha | "tentativa de golpe" e "Tentar novamente" |
| `*` | NaoEncontrada | Página 404 com link para `/produtos` |

**Cartões para testar** (dados fictícios):

| Número | Resultado |
| --- | --- |
| `4111 1111 1111 1112` | Compra aprovada |
| `1111 1111 1111 1111` | Falha: "tentativa de golpe" |

## Tecnologias e técnicas

| Conteúdo | Onde aparece |
| --- | --- |
| Componentes, JSX, props e **PropTypes** | Todos os componentes com props, ex.: `ProdutoCard`, `ItemCarrinho`, `SeletorQuantidade` |
| Listas com **key** estável e renderização condicional | Grade de produtos, carrinho e mensagens de carregamento/erro/vazio |
| **useState** e **useEffect** | Busca controlada e carregamento dos produtos (`useProdutos`, `useProduto`) |
| **fetch** + **json-server** | `src/services/api.js`, com `try/catch` e verificação de `response.ok` |
| **useRef** | Foca o campo de busca ao abrir `/produtos` |
| **React Hook Form + Zod** | `FormularioPagamento` e `utils/esquemaCartao.js` |
| **Context API** e **custom hooks** | `CarrinhoContext` + `useCarrinho`; `useProdutos`, `useProduto`, `usePagamento` |
| **useMemo** e **useCallback** | Lista filtrada, categorias e totais (`useMemo`); funções do contexto (`useCallback`) |
| **React Router DOM** | Rota de layout com `Outlet`, rota dinâmica, rota privada e 404 |
| **CSS Modules** | `Header`, `Footer`, `ProdutoCard`, `ListaProdutos`, `ItemCarrinho`, `SeletorQuantidade`, `Mensagem`, `CampoBusca`, `DetalheProduto`, `DestaqueCatalogo`, `ChipsCategorias`, `EtapasCompra`, `CartaoPreview` |
| **Material UI** | `Badge`, `Button`, `Chip` (categorias), `TextField` (busca e ordenação), `MenuItem`, `CircularProgress` e tema próprio |
| **Atomic Design** | `atoms`, `molecules`, `organisms`, `templates` e `pages` |
| **Media queries** mobile-first | Grade com 1 coluna no celular, 2 no tablet e 4 no desktop |
| **Vitest** + **React Testing Library** | Testes das regras em `utils/__tests__` e da página `Produtos` |

**Bibliotecas além da lista do enunciado (justificativa):**

- `@emotion/react` e `@emotion/styled`: dependências obrigatórias do Material UI.
- `jsdom`: simula o navegador para o Vitest rodar os testes de componente.
- `@testing-library/dom`: base da React Testing Library (exigida por ela a partir da versão 16).
- `@testing-library/jest-dom` e `@testing-library/user-event`: matchers como `toBeInTheDocument` e simulação de digitação real nos testes.
- `@vitest/coverage-v8`: gera o relatório de cobertura (bônus).

## Arquitetura e estrutura de pastas

As páginas nunca chamam `fetch` diretamente: tudo passa pelo serviço `api.js`. O estado do carrinho existe em um único lugar (o contexto), e as regras de negócio são **funções puras** em `utils`, o que permite testá-las sem interface.

```
lumina-checkout/
├── db.json                  # produtos da API simulada (json-server)
├── netlify.toml             # build e redirect de SPA na Netlify
├── .env / .env.production   # VITE_USAR_API alterna json-server e db.json estático
├── public/
│   ├── _redirects           # rotas funcionam ao recarregar
│   └── imagens/             # imagem reserva (sem-foto.svg)
└── src/
    ├── main.jsx             # ThemeProvider + BrowserRouter + CarrinhoProvider
    ├── App.jsx              # mapa de rotas
    ├── components/
    │   ├── atoms/           # Logo, Preco, ImagemProduto, Mensagem, CampoBusca
    │   ├── molecules/       # ProdutoCard, ItemCarrinho, SeletorQuantidade, FiltrosProdutos, ChipsCategorias, CartaoPreview, EtapasCompra
    │   ├── organisms/       # Header, Footer, DestaqueCatalogo, ListaProdutos, ResumoCompra, FormularioPagamento
    │   └── templates/       # Layout (Header + Outlet + Footer)
    ├── pages/               # Produtos, DetalheProduto, Carrinho, Pagamento, Sucesso, Falha, NaoEncontrada
    │   └── __tests__/       # teste de componente da página Produtos
    ├── routes/              # RotaPrivada
    ├── contexts/            # CarrinhoContext
    ├── hooks/               # useCarrinho, useProdutos, useProduto, usePagamento
    ├── services/            # api.js
    ├── utils/               # moeda, carrinho, busca, pagamento, esquemaCartao, armazenamento
    │   └── __tests__/       # testes unitários das regras de negócio
    └── assets/styles/       # estilos globais e tema do Material UI
```

## Como executar

**Pré-requisitos:** Node.js 18 ou superior e npm.

```bash
# 1. Clonar e instalar
git clone https://github.com/Marcosdev0109/lumina-checkout.git
cd lumina-checkout
npm install

# 2. Em um terminal, subir a API simulada (porta 3001)
npm run api

# 3. Em outro terminal, subir a aplicação (porta 5173)
npm run dev
```

Acesse http://localhost:5173.

| Script | O que faz |
| --- | --- |
| `npm run dev` | Inicia a aplicação com o Vite |
| `npm run api` | Inicia o json-server com o `db.json` na porta 3001 |
| `npm test` | Executa os testes uma vez |
| `npm run test:watch` | Executa os testes em modo observação |
| `npm run test:coverage` | Gera o relatório de cobertura |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente a versão de produção |

## API simulada (json-server)

| Endpoint | Descrição |
| --- | --- |
| `GET /produtos` | Lista todos os produtos |
| `GET /produtos/:id` | Retorna um produto (status 404 se não existir) |

Cada produto tem `id`, `nome`, `descricao`, `preco`, `categoria`, `imagem` e `estoque`.

**Variáveis de ambiente:**

| Variável | Valor | Efeito |
| --- | --- | --- |
| `VITE_USAR_API` | `true` (arquivo `.env`, desenvolvimento) | Usa o json-server em `VITE_URL_API` |
| `VITE_USAR_API` | `false` (arquivo `.env.production`, deploy) | Lê o `db.json` estático e filtra no front-end |
| `VITE_URL_API` | `http://localhost:3001` | Endereço do json-server |

Como o json-server roda só localmente, a versão publicada usa o `db.json` estático, que é copiado automaticamente para `public/` antes do `dev` e do `build`.

## Testes

Os testes usam **Vitest** (mesma API do Jest: `describe`, `it`, `expect`) e **React Testing Library**.

```bash
npm test
```

| Arquivo | O que testa | Caminhos tristes cobertos |
| --- | --- | --- |
| `moeda.test.js` | `formatarMoeda` | valores inválidos |
| `busca.test.js` | `filtrarProdutos`, `normalizarTexto`, filtro e ordenação | termo vazio, nenhum resultado |
| `carrinho.test.js` | `calcularTotal`, `contarItens`, `limitarQuantidade`, adicionar, alterar, remover | estoque esgotado, quantidade abaixo de 1, id inexistente |
| `pagamento.test.js` | `todosDigitosIguais`, máscaras e esquema Zod | cartão incompleto, mês 13, CVV inválido |
| `armazenamento.test.js` | carrinho no `localStorage` | conteúdo corrompido, armazenamento bloqueado |
| `Produtos.test.jsx` | página de produtos | API fora do ar, busca sem resultado |

## Build e deploy

```bash
npm run build
```

A pasta `dist/` é publicada na **Netlify** com as configurações de `netlify.toml`. O arquivo `public/_redirects` garante que rotas como `/produtos/3` funcionem ao recarregar a página.

## Acessibilidade e responsividade

- HTML semântico (`header`, `nav`, `main`, `article`, `footer`) e link "Pular para o conteúdo".
- Todos os campos com `label`; erros do formulário anunciados com `role="alert"`.
- Imagens com texto alternativo; botões de quantidade e remoção com `aria-label` descritivo.
- Foco visível em todos os elementos interativos.
- Layout **mobile-first** com media queries em 600px, 768px, 900px e 1024px (e um ajuste do header abaixo de 380px); testado no DevTools em 375px, 768px e 1280px, sem rolagem horizontal.

## Organização das tarefas e versionamento

O planejamento foi feito no **Trello**, com um card por funcionalidade (veja o link no topo). No GitHub:

- `main`: código final entregue.
- `develop`: concentra os merges durante o desenvolvimento.
- Uma **feature branch** a partir da `develop` para cada tarefa, mantida após o merge:

| Branch | Objetivo |
| --- | --- |
| `feature/estrutura-atomic` | Reorganizar o projeto em Atomic Design, separar utils e adicionar PropTypes |
| `feature/api-json-server` | Criar `db.json`, script `api`, serviço de API e variáveis de ambiente |
| `feature/layout-rotas` | Header, Footer, rota de layout com `Outlet` e página 404 |
| `feature/listagem-produtos` | Hook `useProdutos`, `ProdutoCard`, grade e estados de carregamento/erro/vazio |
| `feature/busca-produtos` | Busca controlada com `filtrarProdutos` e `useMemo` |
| `feature/detalhe-produto` | Rota dinâmica `/produtos/:id` |
| `feature/carrinho-context` | `CarrinhoContext`, `useCarrinho` e regras do carrinho |
| `feature/pagina-carrinho` | Página do carrinho ligada ao contexto e `Badge` no Header |
| `feature/checkout-contexto` | Total do contexto, rota privada e finalização da compra |
| `feature/estilizacao-mui` | Tema e componentes do Material UI, ajustes de estilo |
| `fix/textos-interface` | Acentuação dos textos e "Processando compra..." exato |
| `feature/testes-unitarios` | Vitest e testes das regras de negócio |
| `feature/carrinho-persistente` | Bônus: carrinho no `localStorage` |
| `feature/filtro-ordenacao` | Bônus: filtro por categoria e ordenação por preço |
| `feature/busca-na-url` | Bônus: busca na query string |
| `feature/teste-componente` | Bônus: teste com Testing Library e cobertura |
| `feature/deploy-netlify` | Configuração de deploy e redirect de SPA |
| `fix/ajustes-mobile` | Ajustes de layout no celular |
| `feature/documentacao` | Este README |
| `feature/imagens-reais` | Fotos reais do Unsplash no lugar das ilustrações e imagem reserva |
| `feature/revisao-ui-ux` | Revisão de UI/UX e acessibilidade (áreas de toque de 44px, contraste, auditoria axe) |
| `feature/identidade-visual` | Paleta "luz quente", fontes Inter e Fraunces, novo logo e header |
| `feature/catalogo-moderno` | Faixa de destaque, chips de categoria e rodapé em grafite |
| `feature/checkout-moderno` | Prévia realista do cartão, etapas da compra e refinamento dos cards de produto |

Os commits seguem mensagens curtas no imperativo ("implementa X", "corrige Y"), com poucos arquivos por commit.

## Uso de IA

Usei o Claude como apoio de engenharia: planejamento (PRD), sugestões de código e revisão. Todo o código sugerido foi conferido, testado (`npm test` e testes de fluxo no navegador) e consigo explicar cada parte. As decisões de arquitetura estão descritas neste README.

## Créditos das imagens

As fotos dos produtos são do [Unsplash](https://unsplash.com) e usadas sob a [Licença Unsplash](https://unsplash.com/license), que permite uso gratuito. Se alguma foto não carregar, o componente `ImagemProduto` mostra a imagem reserva local `public/imagens/sem-foto.svg`.

| Produto | Foto original |
| --- | --- |
| Luminária de Mesa Aurora | [Unsplash](https://unsplash.com/photos/VDPauwJ_sHo) |
| Luminária Articulada Órbita | [Unsplash](https://unsplash.com/photos/0WySxD8YeNI) |
| Luminária Lumi Kids | [Unsplash](https://unsplash.com/photos/mNXTZu7AeGA) |
| Pendente Cúpula Nórdica | [Rita Chou / Unsplash](https://unsplash.com/photos/aRcwkYv7870) |
| Pendente Vidro Âmbar | [Ellephant / Unsplash](https://unsplash.com/photos/3CAiUdt1RFs) |
| Pendente Industrial Trio | [Natalia Y. / Unsplash](https://unsplash.com/photos/R-qWnGTaAyU) |
| Lâmpada Filamento Vintage | [Unsplash](https://unsplash.com/photos/incandescent-bulb-on-black-surface-fmTde1Fe23A) |
| Lâmpada LED Inteligente Wi-Fi | [Unsplash](https://unsplash.com/photos/white-bulb-TuAtSs8peoM) |
| Kit 6 Lâmpadas Bulbo LED 9W | [Unsplash](https://unsplash.com/photos/gray-incandescent-lamp-photography-d9yOg5zP-oQ) |
| Fita de LED RGB 5m | [Zishan khan / Unsplash](https://unsplash.com/photos/assorted-colored-led-lights-NHnW3cmrCeo) |
| Barra de LED para Armário | [superlightingled / Unsplash](https://unsplash.com/photos/a-large-group-of-lights-IGPhiyH9t-A) |
| Luz Neon Flex 2m | [Dejan Nasteski / Unsplash](https://unsplash.com/photos/blue-and-white-light-fixture-I3rvOvxvybE) |

## Melhorias futuras

- Tema claro/escuro com um `TemaContext`.
- Hook `useDebounce` para filtrar só quando o usuário parar de digitar.
- Paginação ou carregamento sob demanda quando o catálogo crescer.
- Back-end real com autenticação e histórico de pedidos.
- Testes de ponta a ponta automatizados (ex.: Playwright) no CI.
