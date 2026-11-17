import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Assistente from '../Assistente'
import { CarrinhoProvider } from '../../contexts/CarrinhoContext'
import { listarProdutos } from '../../services/api'

vi.mock('../../services/api', () => ({
  listarProdutos: vi.fn()
}))

const produtosFalsos = [
  { id: '1', nome: 'Luminária Aurora', categoria: 'Luminárias', preco: 189.9, imagem: '/a.svg', estoque: 2, ambientes: ['escritorio'], estilos: ['moderno'], usos: ['leitura'] },
  { id: '2', nome: 'Pendente Nórdico', categoria: 'Pendentes', preco: 349.9, imagem: '/b.svg', estoque: 3, ambientes: ['sala'], estilos: ['nordico'], usos: ['geral'] }
]

function renderizar() {
  return render(
    <MemoryRouter initialEntries={['/assistente']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CarrinhoProvider>
        <Assistente />
      </CarrinhoProvider>
    </MemoryRouter>
  )
}

describe('pagina Assistente', () => {
  beforeEach(() => {
    localStorage.clear()
    listarProdutos.mockReset()
    listarProdutos.mockResolvedValue(produtosFalsos)
  })

  it('começa sem recomendações e pede para escolher o cômodo', async () => {
    renderizar()
    expect(await screen.findByText('Suas recomendações aparecem aqui.')).toBeInTheDocument()
  })

  it('recomenda o produto do cômodo escolhido e calcula os lúmens', async () => {
    const usuario = userEvent.setup()
    renderizar()
    await usuario.click(await screen.findByRole('button', { name: 'Escritório' }))
    await usuario.type(screen.getByLabelText(/Tamanho do cômodo/), '9')

    expect(screen.getByText('4.500 lm')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Luminária Aurora' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Pendente Nórdico' })).not.toBeInTheDocument()
  })

  it('avisa quando nada cabe no orçamento', async () => {
    const usuario = userEvent.setup()
    renderizar()
    await usuario.click(await screen.findByRole('button', { name: 'Sala' }))
    await usuario.click(screen.getByRole('button', { name: 'Até R$ 100' }))
    expect(screen.getByText('Nenhuma peça atende tudo isso.')).toBeInTheDocument()
  })

  it('adiciona a recomendação ao carrinho', async () => {
    const usuario = userEvent.setup()
    renderizar()
    await usuario.click(await screen.findByRole('button', { name: 'Escritório' }))
    await usuario.click(screen.getByRole('button', { name: 'Adicionar' }))
    expect(screen.getByText(/foi para o carrinho/)).toBeInTheDocument()
  })
})
