import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Produtos from '../Produtos'
import { CarrinhoProvider } from '../../contexts/CarrinhoContext'
import { listarProdutos } from '../../services/api'

// O servico da API e substituido por uma versao falsa: o teste nao depende do json-server.
vi.mock('../../services/api', () => ({
  listarProdutos: vi.fn()
}))

const produtosFalsos = [
  { id: '1', nome: 'Luminária Aurora', categoria: 'Luminárias', preco: 189.9, imagem: '/a.svg', estoque: 2 },
  { id: '2', nome: 'Lâmpada Vintage', categoria: 'Lâmpadas', preco: 39.9, imagem: '/b.svg', estoque: 5 }
]

function renderizarPagina() {
  return render(
    <MemoryRouter
      initialEntries={['/produtos']}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <CarrinhoProvider>
        <Produtos />
      </CarrinhoProvider>
    </MemoryRouter>
  )
}

describe('pagina Produtos', () => {
  beforeEach(() => {
    localStorage.clear()
    listarProdutos.mockReset()
  })

  it('mostra a mensagem de carregamento e depois a lista da API', async () => {
    listarProdutos.mockResolvedValue(produtosFalsos)
    renderizarPagina()

    expect(screen.getByText('Carregando produtos...')).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: 'Luminária Aurora' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Lâmpada Vintage' })).toBeInTheDocument()
  })

  it('filtra a lista enquanto o usuario digita na busca', async () => {
    listarProdutos.mockResolvedValue(produtosFalsos)
    const usuario = userEvent.setup()
    renderizarPagina()
    await screen.findByRole('link', { name: 'Luminária Aurora' })

    await usuario.type(screen.getByLabelText('Buscar produtos'), 'LAMPADA')

    expect(screen.queryByRole('link', { name: 'Luminária Aurora' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Lâmpada Vintage' })).toBeInTheDocument()
  })

  it('avisa quando nenhum produto corresponde e permite limpar a busca', async () => {
    listarProdutos.mockResolvedValue(produtosFalsos)
    const usuario = userEvent.setup()
    renderizarPagina()
    await screen.findByRole('link', { name: 'Luminária Aurora' })

    await usuario.type(screen.getByLabelText('Buscar produtos'), 'geladeira')
    expect(screen.getByText('Nenhum produto encontrado')).toBeInTheDocument()

    await usuario.click(screen.getByRole('button', { name: 'Limpar busca' }))
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })

  it('mostra mensagem amigavel quando a API esta fora do ar', async () => {
    listarProdutos.mockRejectedValue(new Error('Não foi possível carregar os produtos.'))
    renderizarPagina()

    expect(await screen.findByRole('alert')).toHaveTextContent('Não foi possível carregar os produtos.')
  })
})
