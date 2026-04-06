import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Generating.module.css'

const STEPS = [
  'Analysing your professional profile',
  'Optimising language and achievements',
  'Applying selected template',
  'Reviewing format and coherence',
  'CV ready for review',
]

export default function Generating() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const delays = [200, 900, 1700, 2500, 3200]
    const timers = delays.map((d, i) =>
      setTimeout(() => setCurrentStep(i + 1), d)
    )
    const finalTimer = setTimeout(() => navigate('/editor'), 4200)
    return () => { timers.forEach(clearTimeout); clearTimeout(finalTimer) }
  }, [navigate])

  return (
    <main className={styles.main}>
      <div className={styles.spinner}></div>
      <h2 className={styles.h2}>Generating your CV...</h2>
      <p className={styles.p}>Our AI is meticulously curating your professional narrative.</p>
      <ul className={styles.steps}>
        {STEPS.map((step, i) => {
          const isDone = currentStep > i + 1
          const isActive = currentStep === i + 1
          return (
            <li key={i} className={`${styles.step} ${isDone ? styles.done : ''} ${isActive ? styles.active : ''}`}>
              <span className={styles.dot}></span>
              {step}
            </li>
          )
        })}
      </ul>
    </main>
  )
}
