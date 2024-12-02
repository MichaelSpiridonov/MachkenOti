import { Routes, Route } from 'react-router'
import { LandingPage } from './pages/LandingPage.jsx'
import { Form } from './pages/Form.jsx'

export function RootCmp() {
  return (
    <div >
      <main className='main-container'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/form' element={<Form />} />
        </Routes>
      </main>
    </div>
  )
}

