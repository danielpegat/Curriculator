import { useNavigate } from 'react-router-dom'
import styles from './Landing.module.css'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <main>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <div className={styles.eyebrow}>The Executive Choice</div>
            <h1 className={styles.h1}>
              Create your professional <em>CV in minutes.</em>
            </h1>
            <p className={styles.heroP}>
              Leverage automated intelligence to transform your career history
              into a prestigious narrative. Designed for the executive standard.
            </p>
            <div className={styles.heroBtns}>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => navigate('/templates')}>
                Start Building <span>→</span>
              </button>
              <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => navigate('/templates')}>
                View Examples
              </button>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.cvCardsGrid}>
              <div className={styles.cvMiniCard}>
                <div className={styles.cvMiniInner}>
                  <div className={styles.hbar}></div>
                  <div className={`${styles.line} ${styles.w80}`}></div>
                  <div className={styles.miniSection}>
                    <div className={styles.miniSectionLabel}></div>
                    <div className={`${styles.line} ${styles.w80}`}></div>
                    <div className={`${styles.line} ${styles.w60}`}></div>
                  </div>
                  <div className={styles.miniSection}>
                    <div className={styles.miniSectionLabel}></div>
                    <div className={`${styles.line} ${styles.w60}`}></div>
                    <div className={`${styles.line} ${styles.w40}`}></div>
                  </div>
                </div>
              </div>
              <div className={`${styles.cvMiniCard} ${styles.featured}`}>
                <div className={styles.featuredHead}>
                  <div className={styles.featuredAvatar}></div>
                  <div className={styles.featuredLine}></div>
                </div>
                <div className={styles.cvMiniInner}>
                  <div className={`${styles.line} ${styles.w80}`}></div>
                  <div className={`${styles.line} ${styles.w60}`}></div>
                  <div className={styles.miniSection}>
                    <div className={styles.miniSectionLabel}></div>
                    <div className={`${styles.line} ${styles.w80}`}></div>
                    <div className={`${styles.line} ${styles.w40}`}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.aiBadge}>
              <div className={styles.aiDot}></div>
              AI optimization active
            </div>
          </div>
        </div>
      </section>

      {/* TEMPLATES PREVIEW */}
      <section className={styles.templatesSection}>
        <div className={styles.sectionHead}>
          <div className={styles.eyebrow}>Templates</div>
          <h2 className={styles.h2}>Signature Templates</h2>
          <p className={styles.sectionSub}>
            Curated to pass the 6-second glance test. Each layout engineered for maximum narrative impact.
          </p>
        </div>
        <div className={styles.templatesGrid}>
          {[
            { name: 'Harvard', desc: 'Classic Serif · Academic Prestige', badge: 'Formal', badgeClass: styles.badgeFormal },
            { name: 'Modern', desc: 'Clean Sans-Serif · Design Forward', badge: 'Popular', badgeClass: styles.badgePopular },
            { name: 'Ejecutivo', desc: 'Stark & Effective · Premium', badge: 'Creative', badgeClass: styles.badgeCreative },
          ].map(tpl => (
            <div key={tpl.name} className={styles.tplCard} onClick={() => navigate('/templates')}>
              <div className={styles.tplThumb}>
                <div className={styles.tplMockLines}>
                  <div className={styles.mockTitle}>{tpl.name.toUpperCase()}</div>
                  <div className={`${styles.mockLine} ${styles.w90}`}></div>
                  <div className={`${styles.mockLine} ${styles.w70}`}></div>
                  <div className={`${styles.mockLine} ${styles.w80}`}></div>
                </div>
              </div>
              <div className={styles.tplInfo}>
                <div>
                  <div className={styles.tplName}>{tpl.name}</div>
                  <div className={styles.tplDesc}>{tpl.desc}</div>
                </div>
                <span className={`${styles.badge} ${tpl.badgeClass}`}>{tpl.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BENTO */}
      <section className={styles.bento}>
        <div className={styles.bentoInner}>
          <div className={styles.eyebrow}>Features</div>
          <h2 className={styles.h2} style={{ textAlign: 'left', marginBottom: '2rem' }}>Intelligence meets craftsmanship.</h2>
          <div className={styles.bentoGrid}>
            <div className={styles.bentoCard}>
              <div className={styles.bentoIcon}>◈</div>
              <div className={styles.bentoH}>AI-Powered Content Generation</div>
              <p className={styles.bentoP}>Our algorithm analyzes your industry and suggests powerful, action-oriented bullet points that capture recruiter attention.</p>
              <div className={styles.bentoDemo}>
                <div className={styles.bentoDemoLabel}>AI suggestion</div>
                <div className={styles.bentoDemoText}>"Led cross-functional team of 12 resulting in <strong>40% increase</strong> in delivery efficiency"</div>
              </div>
            </div>
            <div className={styles.bentoRight}>
              <div className={`${styles.bentoCard} ${styles.bentoDark}`}>
                <div className={styles.bentoH} style={{ color: '#fff' }}>Export to Anything</div>
                <p className={styles.bentoP} style={{ color: 'rgba(245,248,255,.75)' }}>PDF, DOCX, or a private web-link for instant sharing.</p>
              </div>
              <div className={`${styles.bentoCard} ${styles.bentoWarm}`}>
                <div className={styles.bentoH} style={{ color: 'var(--on-ter-cont)' }}>Live Preview</div>
                <p className={styles.bentoP} style={{ color: 'var(--on-ter-cont)' }}>Side-by-side view. Changes appear in real-time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaH}>Ready to elevate your profile?</h2>
          <p className={styles.ctaP}>Join over 50,000 professionals who have landed their dream roles using Curriculator's executive templates.</p>
          <button className={styles.ctaBtn} onClick={() => navigate('/templates')}>Start For Free</button>
          <div className={styles.ctaNote}>No credit card required · 100+ templates included</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div>
          <div className={styles.footerLogo}>Curriculator</div>
          <div className={styles.footerCopy}>© 2024 Curriculator. The Executive Choice.</div>
        </div>
        <div className={styles.footerLinks}>
          <a href="#" onClick={e => e.preventDefault()}>Privacy Policy</a>
          <a href="#" onClick={e => e.preventDefault()}>Terms</a>
          <a href="#" onClick={e => e.preventDefault()}>Help Center</a>
          <a href="#" onClick={e => e.preventDefault()}>Contact</a>
        </div>
      </footer>
    </main>
  )
}
