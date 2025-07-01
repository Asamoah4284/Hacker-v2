import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AboutPage from './Pages/AboutPage';
import EntrepreneurPage from './Pages/Entrepreneur';
import './index.css'


function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path='/' element={<Home />} />

        <Route path='/about' element={<AboutPage />} />
        
        {/* Entrepreneur Route */}
        <Route path='/entrepreneur' element={<EntrepreneurPage />} />

        {/* Marketplace Route */}
        {/* <Route path='/marketplace' element={<Marketplace />} /> */}

        {/* <Route path='/dashboard' element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
