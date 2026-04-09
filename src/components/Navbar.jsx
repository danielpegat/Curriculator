import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../supabase.js'
import styles from './Navbar.module.css'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const isEditor = location.pathname === '/editor'

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

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
            <button className={styles.btnOutline} onClick={() => window.dispatchEvent(new Event('trigger-save-draft'))}>Save Draft</button>
            <button className={styles.btnPrimary} onClick={() => window.dispatchEvent(new Event('trigger-download-pdf'))}>Download PDF</button>
          </>
        ) : user ? (
          <>
            <button className={styles.btnGhost} onClick={handleLogout}>Logout</button>
            <Link to="/form">
              <button className={styles.btnPrimary}>Go to Studio</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/auth">
              <button className={styles.btnGhost}>Login</button>
            </Link>
            <Link to="/auth">
              <button className={styles.btnPrimary}>Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
