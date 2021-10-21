import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h1>
              <span>Fabian's</span>
              <span>Recipes</span>
            </h1>
            <h2>Share the joy</h2>
          </a>
        </Link>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2021 - Fabian's recipes :)</p>
      </footer>
    </div>
  )
}