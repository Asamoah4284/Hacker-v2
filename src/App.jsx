import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Entrepreneur from './pages/Entrepreneur';
import Marketplace from './pages/Marketplace';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path='/' element={<Home />} />

        {/* Entrepreneur Route */}
        <Route path='/entrepreneur' element={<Entrepreneur />} />

        {/* Marketplace Route */}
        <Route path='/marketplace' element={<Marketplace />} />

        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
