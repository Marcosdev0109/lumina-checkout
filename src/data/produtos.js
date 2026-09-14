// Carrinho fixo da loja (RF01 / RF02).
// Fonte de dados local: array de objetos com id, nome, preco unitario e quantidade.
// O campo "imagem" indica qual ilustracao o componente ProdutoImagem deve desenhar.
// A estrutura e a mesma que viria de uma API, o que facilita a troca no futuro.
export const produtos = [
  {
    id: 'p-001',
    nome: 'Luminaria de mesa Aurora',
    preco: 189.9,
    quantidade: 1,
    imagem: 'luminaria'
  },
  {
    id: 'p-002',
    nome: 'Fita de LED inteligente 5m',
    preco: 129.5,
    quantidade: 2,
    imagem: 'fita'
  },
  {
    id: 'p-003',
    nome: 'Abajur minimalista Nord',
    preco: 249.0,
    quantidade: 1,
    imagem: 'abajur'
  },
  {
    id: 'p-004',
    nome: 'Lampada filamento vintage',
    preco: 39.9,
    quantidade: 3,
    imagem: 'lampada'
  }
]
