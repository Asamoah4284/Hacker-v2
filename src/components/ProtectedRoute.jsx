import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const authToken = localStorage.getItem('authToken');

  // If not logged in or no auth token, redirect to login
  if (!isLoggedIn || !authToken) {
    return <Navigate to='/login' replace />;
  }

  // If logged in, render the protected component
  return children;
}
