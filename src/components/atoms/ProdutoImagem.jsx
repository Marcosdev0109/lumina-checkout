/**
 * Ilustracao de cada produto (RF12).
 *
 * Os desenhos sao SVG escritos direto no JSX, sem arquivos de imagem e sem
 * depender de internet. O componente recebe por props qual ilustracao usar
 * e devolve o desenho correspondente.
 *
 * E decorativo: quem descreve o produto e o texto ao lado, entao o bloco
 * recebe aria-hidden para nao poluir a leitura por leitores de tela.
 */

const desenhos = {
  luminaria: (
    <>
      <path d="M20 44h24l-6-18H26l-6 18z" fill="currentColor" />
      <path d="M32 44v14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 60h20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="20" r="4" fill="currentColor" opacity="0.55" />
    </>
  ),
  fita: (
    <>
      <path
        d="M10 40c8-12 16 12 24 0s14-12 20 0"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="16" cy="36" r="2.5" fill="currentColor" opacity="0.55" />
      <circle cx="32" cy="40" r="2.5" fill="currentColor" opacity="0.55" />
      <circle cx="48" cy="36" r="2.5" fill="currentColor" opacity="0.55" />
    </>
  ),
  abajur: (
    <>
      <path d="M18 38h28l-5-16H23l-5 16z" fill="currentColor" />
      <path d="M32 38v12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="32" cy="52" rx="12" ry="4" fill="currentColor" opacity="0.55" />
    </>
  ),
  lampada: (
    <>
      <path
        d="M32 12c-7 0-12 5-12 12 0 5 3 8 4 11h16c1-3 4-6 4-11 0-7-5-12-12-12z"
        fill="currentColor"
      />
      <path d="M26 41h12M27 46h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M29 51h6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
    </>
  )
}

function ProdutoImagem({ tipo }) {
  return (
    <div className="produto-imagem" aria-hidden="true">
      <svg viewBox="0 0 64 64" width="56" height="56" focusable="false">
        {desenhos[tipo] ?? desenhos.lampada}
      </svg>
    </div>
  )
}

export default ProdutoImagem
