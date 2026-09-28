import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Login } from './pages/auth/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { AssetList } from './pages/assets/AssetList';
import { AssetPassport } from './pages/assets/AssetPassport';
import { CreateAsset } from './pages/assets/CreateAsset';
import { MapView } from './pages/map/MapView';
import { Maintenance } from './pages/maintenance/Maintenance';
import { Reports } from './pages/reports/Reports';
import { Profile } from './pages/profile/Profile';
import { Projects } from './pages/projects/Projects';
import { Inspections } from './pages/inspections/Inspections';
import { Lifecycle } from './pages/lifecycle/Lifecycle';
import { Notifications } from './pages/notifications/Notifications';
import { Admin } from './pages/admin/Admin';
import { PlaceholderPage } from './components/common';
import { useAuth } from './contexts/AuthContext';

import { Landing } from './pages/public/Landing';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/" element={<Landing />} />
      
      <Route path="/dashboard" element={<ProtectedRoute><AppShell><Dashboard /></AppShell></ProtectedRoute>} />

      <Route path="/assets" element={<ProtectedRoute><AppShell><AssetList /></AppShell></ProtectedRoute>} />
      <Route path="/assets/new" element={<ProtectedRoute><AppShell><CreateAsset /></AppShell></ProtectedRoute>} />
      <Route path="/assets/:id" element={<ProtectedRoute><AppShell><AssetPassport /></AppShell></ProtectedRoute>} />

      <Route path="/map" element={<ProtectedRoute><AppShell><MapView /></AppShell></ProtectedRoute>} />

      <Route path="/projects" element={<ProtectedRoute><AppShell><Projects /></AppShell></ProtectedRoute>} />
      <Route path="/inspections" element={<ProtectedRoute><AppShell><Inspections /></AppShell></ProtectedRoute>} />
      <Route path="/maintenance" element={<ProtectedRoute><AppShell><Maintenance /></AppShell></ProtectedRoute>} />
      <Route path="/lifecycle" element={<ProtectedRoute><AppShell><Lifecycle /></AppShell></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><AppShell><Reports /></AppShell></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><AppShell><Notifications /></AppShell></ProtectedRoute>} />

      {/* Removed InfraAI */}

      <Route path="/profile" element={<ProtectedRoute><AppShell><Profile /></AppShell></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AppShell><Admin /></AppShell></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><AppShell><PlaceholderPage title="Settings" description="Configure system preferences and integrations." /></AppShell></ProtectedRoute>} />

      <Route path="*" element={<ProtectedRoute><AppShell><div className="p-8 text-text-primary">Page not found.</div></AppShell></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
