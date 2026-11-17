import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Mensagem from '../components/atoms/Mensagem'
import ImagemProduto from '../components/atoms/ImagemProduto'
import Preco from '../components/atoms/Preco'
import { useProdutos } from '../hooks/useProdutos'
import { useCarrinho } from '../hooks/useCarrinho'
import {
  AMBIENTES,
  ESTILOS,
  USOS,
  calcularLumens,
  pontuacaoMaxima,
  recomendar
} from '../utils/recomendacao'
import estilos from './Assistente.module.css'

const ORCAMENTOS = [
  { valor: '', rotulo: 'Sem limite' },
  { valor: '100', rotulo: 'Até R$ 100' },
  { valor: '250', rotulo: 'Até R$ 250' },
  { valor: '400', rotulo: 'Até R$ 400' }
]

/** Grupo de opções em formato de pílula; cada opção é um botão com aria-pressed. */
function Opcoes({ titulo, opcoes, valor, onEscolher, nome }) {
  return (
    <fieldset className={estilos.grupo}>
      <legend className={estilos.pergunta}>{titulo}</legend>
      <div className={estilos.opcoes}>
        {Object.entries(opcoes).map(([chave, rotulo]) => (
          <button
            key={chave || 'vazio'}
            type="button"
            name={nome}
            className={chave === valor ? `${estilos.opcao} ${estilos.ativa}` : estilos.opcao}
            aria-pressed={chave === valor}
            onClick={() => onEscolher(chave === valor ? '' : chave)}
          >
            {rotulo}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

Opcoes.propTypes = {
  titulo: PropTypes.string.isRequired,
  opcoes: PropTypes.objectOf(PropTypes.string).isRequired,
  valor: PropTypes.string.isRequired,
  onEscolher: PropTypes.func.isRequired,
  nome: PropTypes.string
}

/**
 * Assistente de iluminação: o cliente responde 4 perguntas e recebe até 3 produtos,
 * com o motivo de cada recomendação, a quantidade de luz que o cômodo precisa
 * e uma tabela para comparar as opções lado a lado.
 */
function Assistente() {
  const { produtos, carregando, erro, recarregar } = useProdutos()
  const { adicionarItem, podeAdicionarProduto } = useCarrinho()
  const [respostas, setRespostas] = useState({ ambiente: '', area: '', estilo: '', uso: '', orcamento: '' })
  const [aviso, setAviso] = useState('')

  const responder = (campo) => (valor) => setRespostas((atual) => ({ ...atual, [campo]: valor }))
  const respondeuAlgo = Boolean(respostas.ambiente || respostas.estilo || respostas.uso)

  const sugestoes = useMemo(
    () => (respondeuAlgo ? recomendar(produtos, respostas) : []),
    [produtos, respostas, respondeuAlgo]
  )
  const maximo = pontuacaoMaxima(respostas)
  const lumens = calcularLumens(respostas.ambiente, respostas.area)

  function adicionar(produto) {
    adicionarItem(produto)
    setAviso(`${produto.nome} foi para o carrinho.`)
  }

  if (carregando) {
    return (
      <main className="pagina pagina--larga" id="conteudo">
        <Mensagem tipo="carregando" titulo="Carregando o catálogo..." />
      </main>
    )
  }
  if (erro) {
    return (
      <main className="pagina pagina--larga" id="conteudo">
        <Mensagem tipo="erro" titulo="Não conseguimos carregar o catálogo.">
          <button type="button" className="botao" onClick={recarregar}>
            Tentar novamente
          </button>
        </Mensagem>
      </main>
    )
  }

  return (
    <main className="pagina pagina--larga" id="conteudo">
    <section className={estilos.pagina} aria-labelledby="titulo-assistente">
      <header className={estilos.topo}>
        <h1 id="titulo-assistente" className={estilos.titulo}>
          Qual luz combina com o seu cômodo?
        </h1>
        <p className={estilos.subtitulo}>
          Responda em poucos toques. O assistente calcula quanta luz o espaço precisa e escolhe as peças do catálogo
          que mais combinam com você.
        </p>
      </header>

      <div className={estilos.layout}>
        <form className={estilos.perguntas} onSubmit={(e) => e.preventDefault()} aria-label="Perguntas do assistente">
          <Opcoes
            titulo="1. Para qual cômodo?"
            nome="ambiente"
            opcoes={Object.fromEntries(Object.entries(AMBIENTES).map(([k, v]) => [k, v.nome]))}
            valor={respostas.ambiente}
            onEscolher={responder('ambiente')}
          />

          <div className={estilos.grupo}>
            <label className={estilos.pergunta} htmlFor="area">
              2. Tamanho do cômodo (m²)
            </label>
            <input
              id="area"
              className={estilos.area}
              type="number"
              inputMode="decimal"
              min="1"
              max="200"
              step="0.5"
              placeholder="Ex.: 12"
              value={respostas.area}
              onChange={(e) => responder('area')(e.target.value)}
            />
            <p className={estilos.dica}>Não sabe? Um quarto médio tem cerca de 10 m².</p>
          </div>

          <Opcoes titulo="3. O que você quer fazer com a luz?" nome="uso" opcoes={USOS} valor={respostas.uso} onEscolher={responder('uso')} />
          <Opcoes titulo="4. Qual estilo você prefere?" nome="estilo" opcoes={ESTILOS} valor={respostas.estilo} onEscolher={responder('estilo')} />

          <fieldset className={estilos.grupo}>
            <legend className={estilos.pergunta}>Orçamento por peça</legend>
            <div className={estilos.opcoes}>
              {ORCAMENTOS.map((o) => (
                <button
                  key={o.rotulo}
                  type="button"
                  className={o.valor === respostas.orcamento ? `${estilos.opcao} ${estilos.ativa}` : estilos.opcao}
                  aria-pressed={o.valor === respostas.orcamento}
                  onClick={() => responder('orcamento')(o.valor)}
                >
                  {o.rotulo}
                </button>
              ))}
            </div>
          </fieldset>
        </form>

        <div className={estilos.resultado} aria-live="polite">
          {lumens > 0 && (
            <div className={estilos.luz}>
              <span className={estilos.luzNumero}>{lumens.toLocaleString('pt-BR')} lm</span>
              <p>
                É a luz total recomendada para {respostas.area} m² de {AMBIENTES[respostas.ambiente].nome.toLowerCase()} (
                {AMBIENTES[respostas.ambiente].lux} lux por m²). Some os lúmens das lâmpadas para chegar perto desse valor.
              </p>
            </div>
          )}

          {!respondeuAlgo && (
            <div className={estilos.vazio}>
              <p className={estilos.vazioTitulo}>Suas recomendações aparecem aqui.</p>
              <p>Comece escolhendo o cômodo.</p>
            </div>
          )}

          {respondeuAlgo && sugestoes.length === 0 && (
            <div className={estilos.vazio}>
              <p className={estilos.vazioTitulo}>Nenhuma peça atende tudo isso.</p>
              <p>Tente aumentar o orçamento ou trocar o estilo.</p>
            </div>
          )}

          {sugestoes.length > 0 && (
            <>
              <h2 className={estilos.subtitulo2}>Recomendadas para você</h2>
              <ol className={estilos.lista}>
                {sugestoes.map(({ produto, pontos, motivos }, i) => {
                  const pode = podeAdicionarProduto(produto)
                  const match = Math.round((pontos / maximo) * 100)
                  return (
                    <li key={produto.id} className={i === 0 ? `${estilos.card} ${estilos.melhor}` : estilos.card}>
                      <ImagemProduto className={estilos.foto} src={produto.imagem} alt={produto.nome} />
                      <div className={estilos.cardCorpo}>
                        <p className={estilos.match}>
                          {i === 0 ? 'Melhor escolha · ' : ''}
                          {match}% compatível
                        </p>
                        <h3 className={estilos.nome}>
                          <Link to={`/produtos/${produto.id}`}>{produto.nome}</Link>
                        </h3>
                        <ul className={estilos.motivos}>
                          {motivos.map((m) => (
                            <li key={m}>{m}</li>
                          ))}
                        </ul>
                        <div className={estilos.rodapeCard}>
                          <Preco className={estilos.preco} valor={produto.preco} />
                          <Button
                            variant="contained"
                            size="small"
                            disabled={!pode}
                            onClick={() => adicionar(produto)}
                            sx={{ bgcolor: '#44403c', '&:hover': { bgcolor: '#292524' }, minHeight: 40 }}
                          >
                            {pode ? 'Adicionar' : 'Sem estoque'}
                          </Button>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ol>

              {sugestoes.length > 1 && (
                <div className={estilos.tabelaWrap}>
                  <table className={estilos.tabela}>
                    <caption>Compare lado a lado</caption>
                    <thead>
                      <tr>
                        <th scope="col">Produto</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Estoque</th>
                        <th scope="col">Compatível</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sugestoes.map(({ produto, pontos }) => (
                        <tr key={produto.id}>
                          <th scope="row">{produto.nome}</th>
                          <td>
                            <Preco valor={produto.preco} />
                          </td>
                          <td>{produto.categoria}</td>
                          <td>{produto.estoque} un.</td>
                          <td>{Math.round((pontos / maximo) * 100)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
          {aviso && (
            <p className={estilos.aviso} role="status">
              {aviso} <Link to="/carrinho">Ver carrinho</Link>
            </p>
          )}
        </div>
      </div>
    </section>
    </main>
  )
}

export default Assistente
