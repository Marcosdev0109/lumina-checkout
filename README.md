# Lumina Checkout

Aplicação de finalização de compra (checkout) desenvolvida em **React + Vite**, como Mini-Projeto Avaliativo do Módulo 2 — Semana 07 do curso Front-End React (SC Tech / SENAI-SC).

> **Autor:** João Marcos Rodrigues Barbosa
> **Repositório:** https://github.com/Marcosdev0109/lumina-checkout

---

## Sumário

- [O problema que o sistema resolve](#o-problema-que-o-sistema-resolve)
- [Demonstração](#demonstração)
- [Fluxo da aplicação](#fluxo-da-aplicação)
- [Regra da compra simulada](#regra-da-compra-simulada)
- [Tecnologias e técnicas utilizadas](#tecnologias-e-técnicas-utilizadas)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Como executar](#como-executar)
- [Acessibilidade e responsividade](#acessibilidade-e-responsividade)
- [Investigação com o debugger](#investigação-com-o-debugger)
- [Uso de IA](#uso-de-ia)
- [Organização das tarefas e versionamento](#organização-das-tarefas-e-versionamento)
- [Melhorias futuras](#melhorias-futuras)

---

## O problema que o sistema resolve

Uma loja virtual de iluminação precisava de uma interface de checkout na qual o cliente pudesse conferir os produtos escolhidos, informar os dados do cartão e receber uma resposta imediata sobre a compra, sem travamentos e sem recarregar a página.

O **Lumina Checkout** resolve isso com uma SPA (Single Page Application) em React: o carrinho é fixo, o pagamento é uma simulação executada inteiramente no navegador e o usuário é levado a uma tela de sucesso ou de falha conforme o resultado. Não há back-end nem integração com operadora de pagamento — nenhum dado do cartão é enviado, persistido ou armazenado.

## Demonstração

**Vídeo de apresentação (até 7 min):** _(inserir o link do Google Drive aqui)_

**Quadro de tarefas no Trello:** https://trello.com/b/56o2RaMZ/lumina-checkout-mini-projeto-m2s07

## Fluxo da aplicação

1. O usuário abre `/` e confere os produtos do carrinho, com preço unitário, quantidade, subtotal de cada item e o total da compra em reais.
2. Aciona **Finalizar compra** e navega para `/pagamento`, onde o total exibido é exatamente o mesmo do carrinho.
3. Preenche os dados fictícios do cartão. Erros de formato aparecem abaixo de cada campo e mantêm o usuário no formulário.
4. Ao enviar, a aplicação exibe **"Processando compra…"** e desabilita o botão, impedindo envios duplicados enquanto a operação assíncrona acontece.
5. Concluída a simulação, o usuário é encaminhado para `/sucesso` ou para `/falha`.

| Rota | Tela | Descrição |
| --- | --- | --- |
| `/` | Carrinho | Produtos, subtotais e total da compra |
| `/pagamento` | Pagamento | Formulário do cartão com validação de formato |
| `/sucesso` | Sucesso | Confirmação da compra aprovada |
| `/falha` | Falha | Mensagem `tentativa de golpe` |

## Regra da compra simulada

A validação acontece em duas etapas independentes:

**1. Validação de formato** (React Hook Form + Zod) — o usuário só sai do formulário se todos os campos estiverem corretos:

| Campo | Regra |
| --- | --- |
| Titular | Preenchido, mínimo de 3 caracteres |
| Número do cartão | Exatamente 16 dígitos. **Espaços e hífens são desconsiderados** |
| Validade | Formato `MM/AA`, com mês entre `01` e `12` |
| CVV | Exatamente 3 dígitos |

Não há validação de bandeira, algoritmo de Luhn ou data de vencimento — o enunciado dispensa esses casos.

Enquanto o usuário digita, uma **prévia do cartão** ao lado do formulário vai sendo preenchida em tempo real com o número, o titular e a validade. Ela usa o `watch()` do React Hook Form, que devolve o valor atual dos campos a cada tecla. O bloco é decorativo e recebe `aria-hidden`, para que leitores de tela não leiam a mesma informação duas vezes.

Os três campos numéricos têm **máscara de digitação**: o número do cartão é agrupado de quatro em quatro automaticamente, a validade recebe a barra sozinha e o CVV aceita apenas três dígitos. As máscaras apenas formatam o que aparece na tela — quem valida continua sendo o schema do Zod, que remove espaços e hífens antes de contar os dígitos.

**2. Regra de negócio** (`src/utils/pagamento.js`) — depois que o formato é aprovado, a aplicação verifica se **os 16 dígitos do cartão são todos iguais**:

- Todos iguais (ex.: `5555 5555 5555 5555`) → navega para `/falha` e exibe a mensagem exata **`tentativa de golpe`**.
- Qualquer outro número com formato válido (ex.: `4111 1111 1111 1111`) → navega para `/sucesso`.

A verificação considera **apenas o número do cartão**, não a repetição entre campos nem entre compras diferentes.

## Tecnologias e técnicas utilizadas

| Conteúdo do semestre | Onde está demonstrado |
| --- | --- |
| React, componentes funcionais e JSX | Todas as páginas em `src/pages/` |
| Props e composição | `ItemCarrinho`, `ResumoCompra`, `CartaoPreview` e `ProdutoImagem` recebem dados exclusivamente por props |
| Listas e `key` | `produtos.map()` em `Carrinho.jsx`, com `key={produto.id}` (id estável, não índice) |
| Objetos, arrays e métodos | `map`, `reduce` e `filter` em `src/utils/pagamento.js` e `Carrinho.jsx` |
| `useState` | Estado `processando` dentro do custom hook |
| Eventos e renderização condicional | Envio do formulário, mensagens de erro, máscaras de digitação e texto do botão |
| React Hook Form + Zod | `Pagamento.jsx` com `zodResolver`, o schema `esquemaCartao` e `watch()` alimentando a prévia do cartão |
| Custom hook | `usePagamento` concentra o processamento e a navegação pós-compra |
| React Router | Quatro rotas em `App.jsx`, `<Link>` para navegação e `useNavigate()` programático |
| Promises e `async/await` | `processarCompra` aguarda uma `Promise` com `setTimeout` simulando a operadora |
| CSS e responsividade | `index.css` mobile-first, com breakpoints em `600px` e `900px` (checkout em duas colunas) |
| Semântica e acessibilidade | `main`, `header`, `section`, `dl`, rótulos associados, `role="alert"`, foco visível |
| npm, `package.json` e Vite | Scripts `dev`, `build` e `preview` |
| Git e GitHub | Branch `develop`, feature branches e commits descritivos mesclados na `main` |
| Módulos ES | `import` / `export` separando páginas, componentes, hooks, dados e regras |

**Não foram utilizados:** Context API, biblioteca global de estado, TypeScript, axios, manipulação manual do DOM, back-end ou gateway de pagamento real.

## Estrutura de pastas

```
lumina-checkout/
├── package.json            # dependências e scripts do Vite
├── vite.config.js          # configuração do Vite
├── index.html              # HTML base da SPA
├── README.md               # esta documentação
└── src/
    ├── main.jsx            # ponto de entrada, BrowserRouter
    ├── App.jsx             # configuração das quatro rotas
    ├── pages/
    │   ├── Carrinho.jsx    # produtos, subtotais e total da compra
    │   ├── Pagamento.jsx   # formulário com React Hook Form e Zod
    │   ├── Sucesso.jsx     # confirmação da compra
    │   └── Falha.jsx       # mensagem "tentativa de golpe"
    ├── components/
    │   ├── ItemCarrinho.jsx   # exibição de um produto via props
    │   ├── ResumoCompra.jsx   # resumo dos valores da compra
    │   ├── CartaoPreview.jsx  # prévia do cartão preenchida em tempo real
    │   └── ProdutoImagem.jsx  # ilustração SVG de cada produto
    ├── hooks/
    │   └── usePagamento.js   # estado e processamento da compra simulada
    ├── utils/
    │   └── pagamento.js      # regras: dígitos iguais, subtotais, total, moeda
    ├── data/
    │   └── produtos.js       # array fixo de produtos
    └── assets/
        └── styles/index.css   # estilos e responsividade
```

## Como executar

**Pré-requisitos:** Node.js 18 ou superior e npm.

```bash
# 1. Clonar o repositório
git clone https://github.com/Marcosdev0109/lumina-checkout.git
cd lumina-checkout

# 2. Instalar as dependências
npm install

# 3. Rodar em modo de desenvolvimento
npm run dev
```

A aplicação abre em `http://localhost:5173`.

Para gerar e conferir a versão de produção:

```bash
npm run build     # gera a pasta dist/
npm run preview   # serve a build em http://localhost:4173
```

### Cartões para teste

| Número | Resultado esperado |
| --- | --- |
| `4111 1111 1111 1111` | Compra aprovada → `/sucesso` |
| `4111-1111-1111-1111` | Compra aprovada (hífens ignorados) |
| `5555 5555 5555 5555` | `tentativa de golpe` → `/falha` |
| `0000000000000000` | `tentativa de golpe` → `/falha` |
| `4111 1111 1111 111` | Erro de formato, permanece no formulário |

Para os testes, use validade `12/29` e CVV `123`.

## Acessibilidade e responsividade

- HTML semântico em JSX: `header`, `main`, `section`, `footer`, listas `ul`/`li` e `dl` para os valores.
- As ilustrações dos produtos e a prévia do cartão são decorativas e usam `aria-hidden`, já que a informação equivalente está no texto e nos campos do formulário.
- Todo campo tem `<label htmlFor>` associado ao `id` do input.
- Mensagens de erro usam `role="alert"` e são ligadas ao campo por `aria-describedby`, com `aria-invalid` no input.
- O status do processamento usa `role="status"` com `aria-live="polite"`, para ser anunciado por leitores de tela.
- Link **"Pular para o conteúdo"** no topo, visível apenas ao receber foco.
- Foco sempre visível via `:focus-visible`, com contorno de 3px.
- Alvos de toque com no mínimo 44px de altura.
- Layout mobile-first, testado no DevTools em 360px, 390px e 1280px — sem rolagem horizontal em nenhuma largura.
- Respeito a `prefers-reduced-motion`.

## Investigação com o debugger

Durante o desenvolvimento, cartões digitados com espaços (`4111 1111 1111 1111`) eram recusados pela validação de formato, mesmo tendo 16 dígitos.

**Como investiguei:** coloquei um breakpoint na função `todosDigitosIguais`, em `src/utils/pagamento.js`, pelo painel **Sources** do DevTools, e inspecionei o valor de `numeroCartao` no painel **Scope**. O valor chegava como `"4111 1111 1111 1111"`, com 19 caracteres — ou seja, a limpeza dos espaços não estava sendo aplicada antes da contagem.

**Causa:** a normalização estava sendo feita apenas dentro da regra de negócio, depois da validação do Zod. O schema contava o comprimento da string bruta.

**Correção:** movi a limpeza para dentro do próprio schema, com `.transform((valor) => valor.replace(/[\s-]/g, ''))` antes do `.refine()`, e mantive `normalizarCartao()` também em `todosDigitosIguais`, para que a regra continue correta mesmo se for chamada de outro lugar. Com o breakpoint novamente ativo, confirmei no Scope que o valor passou a chegar com 16 caracteres.

## Uso de IA

Utilizei IA como apoio em pontos específicos, sempre revisando e validando o resultado:

- Rascunho da expressão regular que identifica 16 dígitos iguais (`/^(\d)\1{15}$/`), que testei manualmente com números repetidos e não repetidos antes de aceitar.
- Sugestões de atributos de acessibilidade (`aria-invalid`, `aria-describedby`, `role="status"`), que conferi na documentação da MDN.

Todo o código foi lido linha a linha e eu consigo explicar cada trecho. Nenhuma sugestão que trouxesse Context API, TypeScript, axios ou back-end foi aceita — essas eram as bandeiras vermelhas definidas no enunciado.

## Organização das tarefas e versionamento

O trabalho foi quebrado em tarefas pequenas, cada uma em sua própria feature branch criada a partir de `develop`:

| Branch | Objetivo |
| --- | --- |
| `feature/estrutura-inicial` | Configuração do Vite, `package.json` e `index.html` |
| `feature/estilos-base` | CSS mobile-first e ajustes de acessibilidade |
| `feature/dados-produtos` | Array fixo de produtos e regras de cálculo |
| `feature/componentes-carrinho` | Componentes `ItemCarrinho` e `ResumoCompra` |
| `feature/pagina-carrinho` | Tela do carrinho com `map` e `key` estável |
| `feature/regra-pagamento` | Custom hook `usePagamento` e processamento assíncrono |
| `feature/formulario-pagamento` | Formulário com React Hook Form e Zod |
| `feature/telas-resultado` | Telas de sucesso e de falha |
| `feature/rotas` | React Router e as quatro rotas da SPA |
| `feature/documentacao` | README do projeto |

Cada feature branch foi mesclada em `develop` com `--no-ff`, preservando o histórico, e ao final `develop` foi mesclada na `main`. As branches não foram excluídas após os merges.

## Melhorias futuras

- Carregar os produtos de uma API real com `fetch` e `useEffect`, tratando os estados de carregamento, lista vazia e erro.
- Permitir alterar quantidades e remover itens do carrinho.
- Adicionar testes automatizados das regras de negócio com Vitest.
- Implementar a rota dinâmica de resultado (`/resultado/:status`), unificando as telas de sucesso e falha — o bônus sugerido no enunciado.
- Incluir tema escuro respeitando `prefers-color-scheme`.
- Substituir as ilustrações SVG por fotos reais dos produtos, vindas da API.

---

Projeto acadêmico. Todos os dados de pagamento são fictícios e nenhuma transação real é realizada.
