import { createContext, useContext, useState } from 'react'

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
