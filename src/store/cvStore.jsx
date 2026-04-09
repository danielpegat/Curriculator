import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../supabase.js'

const CVContext = createContext(null)

export function CVProvider({ children }) {
  const [selectedTemplate, setSelectedTemplate] = useState('harvard')
  const [cvData, setCvData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    link: '',
    summary: '',
    skills: '',
    langs: '',
    exps: [{ org: '', role: '', date: '', desc: '' }],
    edus: [{ org: '', role: '', date: '' }],
  })

  // Load draft from Supabase on mount
  useEffect(() => {
    const fetchDraft = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data, error } = await supabase
          .from('cv_drafts')
          .select('template, cv_data')
          .eq('id', session.user.id)
          .single()

        if (!error && data) {
          if (data.template) setSelectedTemplate(data.template)
          if (data.cv_data) setCvData(data.cv_data)
        }
      }
    }
    fetchDraft()
  }, [])

  const updateCvData = (updates) => {
    setCvData(prev => ({ ...prev, ...updates }))
  }

  const updateExp = (index, field, value) => {
    setCvData(prev => {
      const exps = [...prev.exps]
      exps[index] = { ...exps[index], [field]: value }
      return { ...prev, exps }
    })
  }

  const addExp = () => {
    setCvData(prev => ({
      ...prev,
      exps: [...prev.exps, { org: '', role: '', date: '', desc: '' }]
    }))
  }

  const removeExp = (index) => {
    setCvData(prev => ({
      ...prev,
      exps: prev.exps.filter((_, i) => i !== index)
    }))
  }

  const updateEdu = (index, field, value) => {
    setCvData(prev => {
      const edus = [...prev.edus]
      edus[index] = { ...edus[index], [field]: value }
      return { ...prev, edus }
    })
  }

  const addEdu = () => {
    setCvData(prev => ({
      ...prev,
      edus: [...prev.edus, { org: '', role: '', date: '' }]
    }))
  }

  const removeEdu = (index) => {
    setCvData(prev => ({
      ...prev,
      edus: prev.edus.filter((_, i) => i !== index)
    }))
  }

  return (
    <CVContext.Provider value={{
      selectedTemplate, setSelectedTemplate,
      cvData, updateCvData,
      updateExp, addExp, removeExp,
      updateEdu, addEdu, removeEdu,
    }}>
      {children}
    </CVContext.Provider>
  )
}

export function useCVStore() {
  return useContext(CVContext)
}
