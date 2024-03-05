import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Hotels from './pages/Hotels';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useEffect } from 'react';

function App() {
  const isAuthenticated = true;

  const navigate = useNavigate()

  useEffect(() => {
    isAuthenticated && navigate("/")
  }, [])
  return (
    <div className="App font-[raleway]">
      {!isAuthenticated ?
        (<Routes>
          <Route path='/login' element={<Login />} />
        </Routes>) :
        (<>
          <Navbar />
          <Routes>
            <Route path='/' element={<Hotels />} />
            <Route path='/booking' element={<Booking />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
          <Footer />
        </>)}
    </div>
  );
}

export default App;
