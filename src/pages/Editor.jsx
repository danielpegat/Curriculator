import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCVStore } from '../store/cvStore.jsx'
import CVPreview from '../components/CVPreview.jsx'
import AIChat from '../components/AIChat.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../supabase.js'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import styles from './Editor.module.css'

const TEMPLATES = ['harvard', 'modern', 'executive']

function Notif({ message }) {
  return message ? <div className={styles.notif}>{message}</div> : null
}

export default function Editor() {
  const { selectedTemplate, setSelectedTemplate, cvData, updateCvData, updateExp, addExp, removeExp, updateEdu, addEdu, removeEdu } = useCVStore()
  const [notif, setNotif] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()
  const cvContainerRef = useRef(null)

  const showNotif = (msg) => {
    setNotif(msg)
    setTimeout(() => setNotif(''), 3000)
  }

  const handleSaveDraft = async () => {
    if (!user) {
      navigate('/auth')
      return
    }
    showNotif('Saving draft...')
    const { error } = await supabase.from('cv_drafts').upsert({
      id: user.id,
      template: selectedTemplate,
      cv_data: cvData,
      updated_at: new Date().toISOString()
    })

    if (error) {
      showNotif('Error saving draft.')
      console.error(error)
    } else {
      showNotif('Draft saved successfully!')
    }
  }

  const handleDownloadPDF = async () => {
    if (!cvContainerRef.current) return
    showNotif('Generating PDF, please wait...')

    try {
      const element = cvContainerRef.current
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      })

      const imgData = canvas.toDataURL('image/jpeg', 0.95)
      // A4 format: 210x297 mm
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)
      pdf.save('Curriculator_CV.pdf')
      
      showNotif('PDF downloaded successfully!')
    } catch (err) {
      console.error('Error generating PDF:', err)
      showNotif('Error generating PDF.')
    }
  }

  useEffect(() => {
    const onSave = () => handleSaveDraft()
    const onDownload = () => handleDownloadPDF()
    window.addEventListener('trigger-save-draft', onSave)
    window.addEventListener('trigger-download-pdf', onDownload)
    return () => {
      window.removeEventListener('trigger-save-draft', onSave)
      window.removeEventListener('trigger-download-pdf', onDownload)
    }
  }, [user, selectedTemplate, cvData])

  const handleAIScroll = () => {
    const chatEl = document.getElementById('ai-chat-section')
    if (chatEl) {
      chatEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
          <button className={styles.btnOutline} onClick={handleSaveDraft}>Save Draft</button>
          <button className={styles.btnPrimary} onClick={handleDownloadPDF}>Download PDF</button>
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
            <EditorField label="Email" value={cvData.email} onChange={v => updateCvData({ email: v })} />
            <EditorField label="Phone" value={cvData.phone} onChange={v => updateCvData({ phone: v })} />
            <EditorField label="Location" value={cvData.location} onChange={v => updateCvData({ location: v })} />
            <EditorField label="Portfolio Link" value={cvData.link} onChange={v => updateCvData({ link: v })} />
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

          {/* Education */}
          <div className={styles.editorSection}>
            <div className={styles.editorSectionTitleRow}>
              <span>Education</span>
              <button className={styles.addSmallBtn} onClick={addEdu}>+ Add</button>
            </div>
            {cvData.edus?.map((edu, i) => (
              <div key={i} className={styles.editorEntry}>
                <div className={styles.editorEntryHead}>
                  <span>{edu.role || 'Degree'} @ {edu.org || 'Institution'}</span>
                  <button className={styles.delBtn} onClick={() => removeEdu(i)}>✕</button>
                </div>
                <EditorField label="Institution" value={edu.org} onChange={v => updateEdu(i, 'org', v)} />
                <EditorField label="Degree" value={edu.role} onChange={v => updateEdu(i, 'role', v)} />
                <EditorField label="Year" value={edu.date} onChange={v => updateEdu(i, 'date', v)} />
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className={styles.editorSection}>
            <div className={styles.editorSectionTitle}>Curated Skills</div>
            <EditorField label="Skills (comma-separated)" textarea value={cvData.skills} onChange={v => updateCvData({ skills: v })} />
          </div>

          {/* Languages */}
          <div className={styles.editorSection}>
            <div className={styles.editorSectionTitle}>Languages</div>
            <EditorField label="Languages (comma-separated)" textarea value={cvData.langs} onChange={v => updateCvData({ langs: v })} />
          </div>

          <button className={styles.actionRegen} onClick={handleAIScroll}>✦ Improve with AI</button>
          <button className={styles.actionDownload} onClick={handleDownloadPDF}>↓ Download as PDF</button>

          <div id="ai-chat-section">
            <AIChat />
          </div>
        </section>

        {/* RIGHT: CV PREVIEW */}
        <section className={styles.cvPanel}>
          <div ref={cvContainerRef} style={{ width: '100%', height: '100%', padding: '20px' }}>
            <CVPreview cvData={cvData} template={selectedTemplate} />
          </div>
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
