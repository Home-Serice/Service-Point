import Home from './pages/home' 
import BottomNavbar from './components/bottom_navbar'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Home />
      </div>
    </Router>
  )
}

export default App