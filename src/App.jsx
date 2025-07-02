import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AboutPage from './Pages/AboutPage';
import EntrepreneurPage from './Pages/Entrepreneur';
import SignupPage from './Pages/Signup';
import './index.css';
import Marketplace from './Pages/Marketplace';
import Dashboard from './Pages/Dashboard';
import LoginPage from './Pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import OrdersPage from './Pages/Orders';
import CartsPage from './Pages/Carts';
import ScrollToTop from './components/ScrollToTop';
import EntrepreneurDashboard from './Pages/EntrepreneurDashboard';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Home Route */}
        <Route path='/' element={<Home />} />

        <Route path='/about' element={<AboutPage />} />

        {/* Entrepreneur Route */}
        <Route
          path='/entrepreneur'
          element={
            <ProtectedRoute>
              <EntrepreneurPage />
            </ProtectedRoute>
          }
        />

        <Route
          path='/entrepreneur/:id'
          element={
            <ProtectedRoute>
              <EntrepreneurDashboard />
            </ProtectedRoute>
          }
        />

        {/* Signup Route */}
        <Route path='/signup' element={<SignupPage />} />

        {/* Marketplace Route */}
        <Route
          path='/marketplace'
          element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          }
        />

        <Route path='/login' element={<LoginPage />} />

        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path='/orders'
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path='/cart'
          element={
            <ProtectedRoute>
              <CartsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
