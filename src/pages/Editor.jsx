import { useState } from 'react'
import { useCVStore } from '../store/cvStore.jsx'
import CVPreview from '../components/CVPreview.jsx'
import AIChat from '../components/AIChat.jsx'
import styles from './Editor.module.css'

const TEMPLATES = ['harvard', 'modern', 'executive']

function Notif({ message }) {
  return message ? <div className={styles.notif}>{message}</div> : null
}

export default function Editor() {
  const { selectedTemplate, setSelectedTemplate, cvData, updateCvData, updateExp, addExp, removeExp } = useCVStore()
  const [notif, setNotif] = useState('')

  const showNotif = (msg) => {
    setNotif(msg)
    setTimeout(() => setNotif(''), 3000)
  }

  const contact = [cvData.email, cvData.phone, cvData.location, cvData.link].filter(Boolean).join(' · ')

  return (
    <div className={styles.wrapper}>
      <Notif message={notif} />

      {/* EDITOR NAV */}
      <div className={styles.editorNav}>
        <div className={styles.editorNavLeft}>
          <span className={styles.editorNavTitle}>Your Narrative is Ready.</span>
          <span className={styles.editorNavSub}>
            Active: <em>{selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)}</em>
          </span>
        </div>
        <div className={styles.editorNavActions}>
          <button className={styles.btnOutline} onClick={() => showNotif('Draft saved!')}>Save Draft</button>
          <button className={styles.btnPrimary} onClick={() => showNotif('PDF downloaded! (connect a PDF library for production)')}>Download PDF</button>
        </div>
      </div>

      {/* SPLIT LAYOUT */}
      <div className={styles.splitLayout}>
        {/* LEFT: EDITOR PANEL */}
        <section className={styles.editorPanel}>
          <h3 className={styles.panelTitle}>Editor</h3>

          {/* Template switcher */}
          <div className={styles.editorSection}>
            <div className={styles.editorSectionTitle}>Template</div>
            <div className={styles.tplSwitcher}>
              {TEMPLATES.map(t => (
                <button
                  key={t}
                  className={`${styles.tplSw} ${selectedTemplate === t ? styles.tplSwActive : ''}`}
                  onClick={() => setSelectedTemplate(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Identity */}
          <div className={styles.editorSection}>
            <div className={styles.editorSectionTitle}>Identity &amp; Contact</div>
            <EditorField label="Name" value={cvData.name} onChange={v => updateCvData({ name: v })} />
            <EditorField label="Title" value={cvData.title} onChange={v => updateCvData({ title: v })} />
            <EditorField label="Contact line" value={contact} onChange={v => updateCvData({ email: v })} placeholder="email · phone · location" />
          </div>

          {/* Summary */}
          <div className={styles.editorSection}>
            <div className={styles.editorSectionTitle}>Executive Statement</div>
            <EditorField label="Summary" textarea value={cvData.summary} onChange={v => updateCvData({ summary: v })} />
          </div>

          {/* Experience */}
          <div className={styles.editorSection}>
            <div className={styles.editorSectionTitleRow}>
              <span>Experience</span>
              <button className={styles.addSmallBtn} onClick={addExp}>+ Add</button>
            </div>
            {cvData.exps.map((exp, i) => (
              <div key={i} className={styles.editorEntry}>
                <div className={styles.editorEntryHead}>
                  <span>{exp.role || 'Title'} @ {exp.org || 'Organization'}</span>
                  <button className={styles.delBtn} onClick={() => removeExp(i)}>✕</button>
                </div>
                <EditorField label="Organization" value={exp.org} onChange={v => updateExp(i, 'org', v)} />
                <EditorField label="Title" value={exp.role} onChange={v => updateExp(i, 'role', v)} />
                <EditorField label="Period" value={exp.date} onChange={v => updateExp(i, 'date', v)} />
                <EditorField label="Description" textarea value={exp.desc} onChange={v => updateExp(i, 'desc', v)} />
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className={styles.editorSection}>
            <div className={styles.editorSectionTitle}>Curated Skills</div>
            <EditorField label="Skills (comma-separated)" textarea value={cvData.skills} onChange={v => updateCvData({ skills: v })} />
          </div>

          <button className={styles.actionRegen} onClick={() => {}}>✦ Improve with AI</button>
          <button className={styles.actionDownload} onClick={() => showNotif('PDF downloaded!')}>↓ Download as PDF</button>

          <AIChat />
        </section>

        {/* RIGHT: CV PREVIEW */}
        <section className={styles.cvPanel}>
          <CVPreview cvData={cvData} template={selectedTemplate} />
        </section>
      </div>
    </div>
  )
}

function EditorField({ label, value, onChange, textarea, placeholder }) {
  return (
    <div className={styles.editorField}>
      <label className={styles.editorFieldLabel}>{label}</label>
      {textarea ? (
        <textarea
          className={styles.editorInput}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          rows={3}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={styles.editorInput}
          type="text"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  )
}
