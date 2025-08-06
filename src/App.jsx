import Home from './pages/home' 
import ProviderInfo from './pages/provider_info'  // Add this import
import BottomNavbar from './components/bottom_navbar'
import ProviderLoginPage from './pages/provider_login_page'
import ProviderProfile from "./pages/provider_profile" 
import ProviderAvailability from "./pages/provider_availability"
import ProviderEditProfile from "./pages/provider_edit_profile.jsx";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/provider_info/:id" element={<ProviderInfo />} />
          <Route path="/profile" element={<ProviderInfo />} />
          <Route path="/search" element={<Home />} />
          <Route path="/bookings" element={<Home />} />
          <Route path="/provider/login" element={<ProviderLoginPage />} />
          <Route path="/provider/profile" element={<ProviderProfile />} />
          <Route path="/provider/profile/availability" element={<ProviderAvailability />}/>
          <Route path="/provider/profile/profile_edit" element={<ProviderEditProfile />} />
        </Routes>
        <BottomNavbar />
      </div>
    </Router>
  );
}

export default App;