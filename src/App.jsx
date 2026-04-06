import { Routes, Route, Navigate } from 'react-router-dom'
import { CVProvider } from './store/cvStore.jsx'
import Navbar from './components/Navbar.jsx'
import Landing from './pages/Landing.jsx'
import TemplateSelector from './pages/TemplateSelector.jsx'
import Form from './pages/Form.jsx'
import Generating from './pages/Generating.jsx'
import Editor from './pages/Editor.jsx'

export default function App() {
  return (
    <CVProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/templates" element={<TemplateSelector />} />
        <Route path="/form" element={<Form />} />
        <Route path="/generating" element={<Generating />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CVProvider>
  )
}
