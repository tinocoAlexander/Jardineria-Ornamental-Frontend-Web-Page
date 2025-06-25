import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';
import AdminConfig from './pages/AdminConfig';
//import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { AppStateProvider } from './contexts/AppStateContext';

function App() {
  return (
    <AuthProvider>
      <AppStateProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route 
                path="/admin" 
                element={
                  <AdminPanel />
                } 
              />
              <Route 
                path="/admin/config" 
                element={
                  //<ProtectedRoute>
                    <AdminConfig />
                  //</ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </AppStateProvider>
    </AuthProvider>
  );
}

export default App;