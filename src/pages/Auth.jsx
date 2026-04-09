import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../supabase'
import { useAuth } from '../context/AuthContext'
import styles from './Auth.module.css'

export default function Auth() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/editor')
    }
  }, [user, navigate])

  return (
    <div className={styles.wrapper}>
      <div className={styles.authContainer}>
        <div className={styles.brand}>
          <h2>Curriculator</h2>
          <p>Login to craft and save your executive narrative.</p>
        </div>
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#000000',
                  brandAccent: '#333333',
                }
              }
            }
          }}
          providers={['google']}
        />
      </div>
    </div>
  )
}
