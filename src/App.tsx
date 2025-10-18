import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ParticipantsPage from './pages/ParticipantsPage';
import GroupsPage from './pages/GroupsPage';
import EventsPage from './pages/EventsPage';
import ReportsPage from './pages/ReportsPage';
import AboutPage from './pages/AboutPage';
import OperadoresPage from './pages/OperadoresPage';
import Layout from './components/Layout';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<DashboardPage />} />
              <Route path="participants" element={<ParticipantsPage />} />
              <Route path="groups" element={<GroupsPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="operadores" element={<OperadoresPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="about" element={<AboutPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
