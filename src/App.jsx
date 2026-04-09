import { Routes, Route, Navigate } from 'react-router-dom'
import { CVProvider } from './store/cvStore.jsx'
import Navbar from './components/Navbar.jsx'
import Landing from './pages/Landing.jsx'
import TemplateSelector from './pages/TemplateSelector.jsx'
import Form from './pages/Form.jsx'
import Generating from './pages/Generating.jsx'
import Editor from './pages/Editor.jsx'
import Auth from './pages/Auth.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

export default function App() {
  return (
    <AuthProvider>
      <CVProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/templates" element={<TemplateSelector />} />
          <Route path="/form" element={<Form />} />
          <Route path="/generating" element={<Generating />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CVProvider>
    </AuthProvider>
  )
}
