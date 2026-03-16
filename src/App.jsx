import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import store from './redux/store';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NgoRegister from './pages/NgoRegister';
import Search from './pages/Search';
import Requirements from './pages/Requirements';
import Messages from './pages/Messages';
import AdminDashboard from './pages/AdminDashboard';
import PendingNgos from './pages/Pendingngos';
import NgoDashboard from './pages/NgoDashboard';
import NgoRequirementsManage from './pages/NgoRequirementsManage';
import AdminPendingRequirements from './pages/AdminPendingRequirements';
import ProfilePage from './pages/ProfilePage';
import AboutUs from './pages/AboutUs'; // New page
import NgoContact from './pages/NgoContact';


// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/ngo-register" element={<NgoRegister />} />
                <Route path="/search" element={<Search />} />
                <Route path="/requirements" element={<Requirements />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/ngo-contact" element={<NgoContact />} />

                {/* Protected Routes */}
                <Route 
                  path="/messages" 
                  element={
                    <ProtectedRoute requireAuth={true}>
                      <Messages />
                    </ProtectedRoute>
                  } 
                />

                {/* NGO Routes */}
                <Route
                  path="/ngo-dashboard"
                  element={
                    <ProtectedRoute requireAuth={true} requireNgo={true}>
                      <NgoDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/ngo/requirements"
                  element={
                    <ProtectedRoute requireAuth={true} requireNgo={true}>
                      <NgoRequirementsManage />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requireAuth={true} requireAdmin={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/pending-ngos" 
                  element={
                    <ProtectedRoute requireAuth={true} requireAdmin={true}>
                      <PendingNgos />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/pending-requirements" 
                  element={
                    <ProtectedRoute requireAuth={true} requireAdmin={true}>
                      <AdminPendingRequirements />
                    </ProtectedRoute>
                  } 
                />
                //ProfilePage
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute requireAuth={true}>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />

                {/* Catch all route - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
