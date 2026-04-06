import { useNavigate } from 'react-router-dom'
import { useCVStore } from '../store/cvStore.jsx'
import styles from './TemplateSelector.module.css'

const TEMPLATES = [
  { id: 'harvard', name: 'Harvard', desc: 'Classic Serif · Academic Prestige', badge: 'Formal' },
  { id: 'modern', name: 'Modern', desc: 'Clean Sans-Serif · Design Forward', badge: 'Popular' },
  { id: 'executive', name: 'Ejecutivo', desc: 'Stark & Effective · Premium', badge: 'Creative' },
]

export default function TemplateSelector() {
  const navigate = useNavigate()
  const { selectedTemplate, setSelectedTemplate } = useCVStore()

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.h1}>Select Your Narrative</h1>
        <p className={styles.sub}>
          Choose a foundation for your professional history. Our templates are crafted for authority, legibility, and architectural elegance.
        </p>
      </div>

      <div className={styles.grid}>
        {TEMPLATES.map(tpl => (
          <div
            key={tpl.id}
            className={`${styles.card} ${selectedTemplate === tpl.id ? styles.selected : ''}`}
            onClick={() => setSelectedTemplate(tpl.id)}
          >
            <div className={styles.thumb}>
              <div className={styles.mock}>
                <div className={styles.mockHead}>
                  <div className={styles.mockName}>{tpl.name.toUpperCase()}</div>
                  {tpl.id === 'modern' && <div className={styles.mockBar}></div>}
                </div>
                <div className={styles.mockBody}>
                  <div className={`${styles.ml} ${styles.pr}`}></div>
                  <div className={`${styles.ml} ${styles.w90}`}></div>
                  <div className={`${styles.ml} ${styles.w70}`}></div>
                  <div className={`${styles.ml} ${styles.pr}`} style={{ marginTop: '0.5rem' }}></div>
                  <div className={`${styles.ml} ${styles.w80}`}></div>
                  <div className={`${styles.ml} ${styles.w60}`}></div>
                </div>
              </div>
            </div>
            <div className={styles.info}>
              <div>
                <div className={styles.tplName}>{tpl.name}</div>
                <div className={styles.tplDesc}>{tpl.desc}</div>
              </div>
              <button
                className={styles.selectBtn}
                onClick={(e) => { e.stopPropagation(); setSelectedTemplate(tpl.id); navigate('/form') }}
              >
                Select →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerCard}>
          <div className={styles.footerStat}>
            <div className={styles.statNum}>99%</div>
            <div className={styles.statLabel}>ATS Approval</div>
          </div>
          <div className={styles.footerFeature}>
            <span style={{ fontSize: '1.5rem' }}>◈</span>
            <div>
              <div className={styles.featureTitle}>Precision Formatting</div>
              <div className={styles.featureDesc}>Our engine handles margins, orphans, and widows automatically.</div>
            </div>
          </div>
          <div className={styles.footerFeature}>
            <span style={{ fontSize: '1.5rem' }}>✦</span>
            <div>
              <div className={styles.featureTitle}>Custom Serif Fonts</div>
              <div className={styles.featureDesc}>Executive-grade typography included.</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
