import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import EntrepreneurDashboard from './Pages/EntrepreneurDashboard';
import './index.css';

const Home = lazy(() => import('./Pages/Home'));
const AboutPage = lazy(() => import('./Pages/AboutPage'));
const EntrepreneurPage = lazy(() => import('./Pages/Entrepreneur'));
const SignupPage = lazy(() => import('./Pages/Signup'));
const Marketplace = lazy(() => import('./Pages/Marketplace'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const LoginPage = lazy(() => import('./Pages/Login'));
const OrdersPage = lazy(() => import('./Pages/Orders'));
const CartsPage = lazy(() => import('./Pages/Carts'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className='min-h-screen flex items-center justify-center bg-[#18181b]'>
            <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4845b]'></div>
            <span className='ml-4 text-[#a1a1aa] text-lg'>Loading...</span>
          </div>
        }
      >
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
      </Suspense>
    </Router>
  );
}

export default App;
