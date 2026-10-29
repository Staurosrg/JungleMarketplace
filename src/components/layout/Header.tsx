import "./Header.css";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__container">
        <a className="site-header__logo" href="/" aria-label="Kurio — início">
          KURIO
        </a>

        <nav className="site-header__nav" aria-label="Navegação principal">
          <a className="site-header__link is-active" href="/" aria-current="page">
            Início
          </a>
          <a className="site-header__link" href="#mercado">
            Mercado
          </a>
          <a className="site-header__link" href="#criadores">
            Criadores
          </a>
          <a className="site-header__link" href="#aprenda">
            Aprenda
          </a>
        </nav>

        <div className="site-header__actions">
          <button
            className="site-header__icon-button"
            type="button"
            aria-label="Buscar NFTs"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="10.5" cy="10.5" r="7.5" />
              <path d="m16 16 5 5" />
            </svg>
          </button>

          <button
            className="site-header__icon-button"
            type="button"
            aria-label="Carrinho, 6 itens"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 3h3l3 13h11l3-9H6" />
              <circle cx="9" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
            </svg>

            <span className="site-header__badge">6</span>
          </button>

          <button className="site-header__login" type="button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5" />
              <path d="M8 12h13m-5-5 5 5-5 5" />
            </svg>
            Entrar
          </button>
        </div>
      </div>
    </header>
  );
}