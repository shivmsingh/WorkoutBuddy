import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Navbar from './components/Navbar'
import AllWorkouts from './pages/AllWorkouts'
import PartPage from './pages/PartPage';
import Home from './pages/Home';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
          <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/allworkouts" 
              element={<AllWorkouts />} 
            />
            <Route 
              path="/part/:part" 
              element={<PartPage />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

