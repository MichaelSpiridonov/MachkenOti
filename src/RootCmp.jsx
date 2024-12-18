import { Routes, Route } from 'react-router'
import { LandingPage } from './pages/LandingPage.jsx'
import { Form } from './pages/Form.jsx'
import { Goodbye } from './pages/Goodbye.jsx'
import { Chatbot } from './pages/Chatbot.jsx'

export function RootCmp() {
  return (
    <div >
      <main className='main-container'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/form' element={<Form />} />
          <Route path='/goodbye' element={<Goodbye />} />
          <Route path='/chat' element={<Chatbot />} />
        </Routes>
      </main>
    </div>
  )
}

