import { useNavigate } from 'react-router-dom'
import { useCVStore } from '../store/cvStore.jsx'
import styles from './Form.module.css'

const STEPS = ['Plantilla', 'Información', 'Experiencia', 'Habilidades', 'Finalizar']

function StepBar() {
  return (
    <div className={styles.stepBar}>
      {STEPS.map((s, i) => (
        <div key={s} className={`${styles.stepItem} ${i === 0 ? styles.done : ''} ${i === 1 ? styles.active : ''}`}>
          <div className={styles.stepDot}>
            {i === 0 ? '✓' : `0${i + 1}`}
          </div>
          <span className={styles.stepLabel}>{s}</span>
        </div>
      ))}
    </div>
  )
}

export default function Form() {
  const navigate = useNavigate()
  const { cvData, updateCvData, updateExp, addExp, removeExp, updateEdu, addEdu, removeEdu } = useCVStore()

  const filledCount = ['name', 'title', 'email', 'summary', 'skills'].filter(k => cvData[k]?.trim()).length
  const progress = 20 + filledCount * 15

  const handleGenerate = () => {
    navigate('/generating')
  }

  return (
    <>
      <StepBar />
      <div className={styles.layout}>
        {/* MAIN FORM */}
        <main className={styles.formMain}>
          <h2 className={styles.formTitle}>Craft your narrative.</h2>
          <p className={styles.formSub}>Complete your profile to generate an executive-grade CV tailored to your career goals.</p>

          <div className={styles.progressWrap}>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <div className={styles.progressLabel}>Step 02 of 05 — Personal Information</div>
          </div>

          {/* IDENTITY */}
          <div className={styles.block}>
            <div className={styles.blockTitle}>Identity &amp; Contact</div>
            <div className={styles.row2}>
              <Field label="Full Name *" placeholder="e.g. Eleanor Thorne" value={cvData.name} onChange={v => updateCvData({ name: v })} />
              <Field label="Professional Title *" placeholder="e.g. Executive Creative Director" value={cvData.title} onChange={v => updateCvData({ title: v })} />
            </div>
            <div className={styles.row2}>
              <Field label="Email *" type="email" placeholder="e.thorne@email.com" value={cvData.email} onChange={v => updateCvData({ email: v })} />
              <Field label="Phone" placeholder="+44 7700 900000" value={cvData.phone} onChange={v => updateCvData({ phone: v })} />
            </div>
            <div className={styles.row2}>
              <Field label="Location" placeholder="London, United Kingdom" value={cvData.location} onChange={v => updateCvData({ location: v })} />
              <Field label="Portfolio / LinkedIn" placeholder="portfolio.thorne.design" value={cvData.link} onChange={v => updateCvData({ link: v })} />
            </div>
          </div>

          {/* SUMMARY */}
          <div className={styles.block}>
            <div className={styles.blockTitle}>Executive Statement</div>
            <Field
              label="Professional Summary *"
              textarea
              placeholder="Strategic visionary with over 12 years of experience in shaping global brand identities..."
              value={cvData.summary}
              onChange={v => updateCvData({ summary: v })}
              hint='Pro-tip: Focus on the magnitude of your work, not just duration. 2–4 sentences.'
            />
          </div>

          {/* EXPERIENCE */}
          <div className={styles.block}>
            <div className={styles.blockTitle}>Work Experience</div>
            {cvData.exps.map((exp, i) => (
              <div key={i} className={styles.expEntry}>
                {i > 0 && (
                  <div className={styles.entryHeader}>
                    <span className={styles.entryLabel}>Additional Role</span>
                    <button className={styles.removeBtn} onClick={() => removeExp(i)}>✕</button>
                  </div>
                )}
                <div className={styles.row2}>
                  <Field label="Organization" placeholder="Global Media Conglomerate" value={exp.org} onChange={v => updateExp(i, 'org', v)} />
                  <Field label="Professional Title" placeholder="Principal Design Lead" value={exp.role} onChange={v => updateExp(i, 'role', v)} />
                </div>
                <div className={styles.row2}>
                  <Field label="Period" placeholder="2019 — Present" value={exp.date} onChange={v => updateExp(i, 'date', v)} />
                  <Field label="Location" placeholder="London, UK" value={exp.loc} onChange={v => updateExp(i, 'loc', v)} />
                </div>
                <Field
                  label="Impact & Responsibilities"
                  textarea
                  placeholder="Pioneered a unified design system adopted by 14 markets, resulting in a 40% increase in engagement."
                  value={exp.desc}
                  onChange={v => updateExp(i, 'desc', v)}
                  hint='Focus on quantifiable results like "Increased revenue by 20%"'
                />
              </div>
            ))}
            <button className={styles.addBtn} onClick={addExp}>+ Add Previous Role</button>
          </div>

          {/* EDUCATION */}
          <div className={styles.block}>
            <div className={styles.blockTitle}>Education</div>
            {cvData.edus.map((edu, i) => (
              <div key={i} className={styles.expEntry}>
                {i > 0 && (
                  <div className={styles.entryHeader}>
                    <span className={styles.entryLabel}>Additional Credential</span>
                    <button className={styles.removeBtn} onClick={() => removeEdu(i)}>✕</button>
                  </div>
                )}
                <div className={styles.row2}>
                  <Field label="Institution" placeholder="Royal College of Art" value={edu.org} onChange={v => updateEdu(i, 'org', v)} />
                  <Field label="Degree / Program" placeholder="MA Communication Design" value={edu.role} onChange={v => updateEdu(i, 'role', v)} />
                </div>
                <Field label="Graduation Year" placeholder="2015" value={edu.date} onChange={v => updateEdu(i, 'date', v)} />
              </div>
            ))}
            <button className={styles.addBtn} onClick={addEdu}>+ Add Another Credential</button>
          </div>

          {/* SKILLS */}
          <div className={styles.block}>
            <div className={styles.blockTitle}>Curated Skills</div>
            <Field
              label="Skills & Competencies *"
              textarea
              placeholder="Brand Strategy, UX Direction, Typographic Arts, Creative Operations, Team Leadership..."
              value={cvData.skills}
              onChange={v => updateCvData({ skills: v })}
              hint="Separate with commas. The AI will organize and enrich your list."
            />
            <div style={{ marginTop: '1rem' }}>
              <Field label="Languages" placeholder="English (native), Spanish (B2)" value={cvData.langs} onChange={v => updateCvData({ langs: v })} />
            </div>
          </div>

          <div className={styles.formNav}>
            <button className={styles.btnBack} onClick={() => navigate('/templates')}>← Back</button>
            <button className={styles.btnGenerate} onClick={handleGenerate}>Generate my CV with AI →</button>
          </div>
        </main>

        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSticky}>
            <div className={styles.previewCard}>
              <div className={styles.previewMock}>
                <div className={styles.pcvName}>{cvData.name || 'Your Name'}</div>
                <div className={styles.pcvTitle}>{cvData.title || 'Professional Title'}</div>
                <div className={styles.pcvLine}></div>
                <div className={styles.pcvSection}>
                  <div className={styles.pcvSectionLabel}>Experience</div>
                  <div className={styles.pcvLine} style={{ width: '90%', marginBottom: '0.2rem' }}></div>
                  <div className={styles.pcvLine} style={{ width: '70%' }}></div>
                </div>
                <div className={styles.pcvSection}>
                  <div className={styles.pcvSectionLabel}>Education</div>
                  <div className={styles.pcvLine} style={{ width: '80%' }}></div>
                </div>
                <div className={styles.pcvSection}>
                  <div className={styles.pcvSectionLabel}>Skills</div>
                  <div className={styles.pcvLine} style={{ width: '65%', marginBottom: '0.2rem' }}></div>
                  <div className={styles.pcvLine} style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
            <div className={styles.tipCard}>
              <div className={styles.tipHead}>
                <span>✦</span> Executive Advice
              </div>
              <p className={styles.tipBody}>
                "Modern portfolios favor clarity over volume. Highlight the <em>magnitude</em> of your projects rather than just the duration."
              </p>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

function Field({ label, placeholder, value, onChange, textarea, hint, type = 'text' }) {
  return (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel}>{label}</label>
      {textarea ? (
        <textarea
          className={styles.fieldInput}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={4}
        />
      ) : (
        <input
          className={styles.fieldInput}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}
      {hint && <div className={styles.fieldHint}>{hint}</div>}
    </div>
  )
}
