import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const location = useLocation()
  const isEditor = location.pathname === '/editor'

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>Curriculator</Link>

      <div className={styles.links}>
        <Link to="/" className={styles.link}>Features</Link>
        <Link to="/templates" className={styles.link}>Templates</Link>
        <Link to="/" className={styles.link}>Pricing</Link>
      </div>

      <div className={styles.actions}>
        {isEditor ? (
          <>
            <button className={styles.btnOutline}>Save Draft</button>
            <button className={styles.btnPrimary}>Download PDF</button>
          </>
        ) : (
          <>
            <button className={styles.btnGhost}>Login</button>
            <Link to="/form">
              <button className={styles.btnPrimary}>Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
