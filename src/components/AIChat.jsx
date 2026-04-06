import { useState } from 'react'
import { useCVStore } from '../store/cvStore.jsx'
import styles from './AIChat.module.css'

const SUGGESTIONS = [
  'Make the summary more impactful',
  'Add action verbs to bullet points',
  'Make it more concise',
  'Optimise for ATS systems',
]

export default function AIChat() {
  const { cvData } = useCVStore()
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const sendAI = async (msg) => {
    const message = msg || input.trim()
    if (!message) return
    setInput('')
    setLoading(true)
    setResponse('Processing...')

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

    if (!apiKey || apiKey.includes('xxxxxxxx')) {
      setTimeout(() => {
        setResponse('✦ Add your VITE_ANTHROPIC_API_KEY in the .env file to enable AI suggestions. For now, try editing the fields manually in the editor panel.')
        setLoading(false)
      }, 800)
      return
    }

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are an expert CV writer for executives and professionals. Help improve the user's CV concisely.
CV data: Name: ${cvData.name}, Title: ${cvData.title}, Summary: ${cvData.summary}, Skills: ${cvData.skills}, Experience: ${JSON.stringify(cvData.exps)}
Reply in the same language as the user's message. Be brief (3-4 lines max). If asked to rewrite something, provide the improved version directly.`,
          messages: [{ role: 'user', content: message }],
        }),
      })
      const data = await res.json()
      const text = data.content?.map(c => c.text || '').join('') || 'No response received.'
      setResponse('✦ ' + text)
    } catch {
      setResponse('✦ Could not reach the AI. Check your API key and internet connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.aiSection}>
      <h4 className={styles.aiTitle}>✦ AI Assistant</h4>
      <div className={styles.chips}>
        {SUGGESTIONS.map(s => (
          <button key={s} className={styles.chip} onClick={() => sendAI(s)}>
            {s}
          </button>
        ))}
      </div>
      <div className={styles.inputRow}>
        <input
          type="text"
          value={input}
          placeholder="Request changes or improvements..."
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendAI()}
          className={styles.input}
        />
        <button className={styles.sendBtn} onClick={() => sendAI()}>↑</button>
      </div>
      {response && (
        <div className={`${styles.response} ${loading ? styles.loading : ''}`}>
          {response}
        </div>
      )}
    </div>
  )
}
