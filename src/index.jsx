import ReactDOM from 'react-dom/client'
import { RootCmp } from './RootCmp.jsx'
import { HashRouter as Router } from 'react-router-dom'

import './assets/styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <RootCmp />
  </Router>
)
