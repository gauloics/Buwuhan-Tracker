import { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Sidebar, { MobileNav } from './components/Layout/Sidebar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import BukuTamu from './pages/BukuTamu.jsx';
import DetailOrang from './pages/DetailOrang.jsx';
import Acara from './pages/Acara.jsx';
import DetailAcara from './pages/DetailAcara.jsx';
import CatatSumbangan from './pages/CatatSumbangan.jsx';
import Pengaturan from './pages/Pengaturan.jsx';
import Landing from './pages/Landing.jsx';

import { GoogleDriveProvider } from './context/GoogleDriveContext.jsx';
import { ManagedCloudProvider } from './context/ManagedCloudProvider.jsx';
import { useCloud } from './context/CloudContext.jsx';
import { useApp } from './context/AppContext.jsx';
import { useEffect, useRef } from 'react';

export default function App() {
  return (
    <BrowserRouter>
      <CloudProvider>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app/*" element={<AppLayout />} />
            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppProvider>
      </CloudProvider>
    </BrowserRouter>
  );
}

function AppLayout() {
  return (
    <>
      <SyncMediator />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tamu" element={<BukuTamu />} />
            <Route path="/tamu/:id" element={<DetailOrang />} />
            <Route path="/acara" element={<Acara />} />
            <Route path="/acara/:id" element={<DetailAcara />} />
            <Route path="/catat" element={<CatatSumbangan />} />
            <Route path="/pengaturan" element={<Pengaturan />} />
          </Routes>
        </main>
        <MobileNav />
      </div>
    </>
  );
}

/**
 * CloudProvider: Wrapper dinamis untuk memilih layanan cloud.
 */
function CloudProvider({ children }) {
  const [useManaged] = useState(false); 

  if (useManaged) {
    return <ManagedCloudProvider>{children}</ManagedCloudProvider>;
  }
  return <GoogleDriveProvider>{children}</GoogleDriveProvider>;
}

/**
 * SyncMediator: Menghubungkan CloudContext dan AppContext secara langsung.
 */
function SyncMediator() {
  const { scheduleSync, onDataLoaded } = useCloud();
  const { data, loadFromExternal } = useApp();
  const lastCloudDataRef = useRef(null);

  useEffect(() => {
    if (data && scheduleSync) {
      scheduleSync(data);
    }
  }, [data, scheduleSync]);

  useEffect(() => {
    if (onDataLoaded) {
      return onDataLoaded((cloudData) => {
        if (JSON.stringify(cloudData) !== JSON.stringify(lastCloudDataRef.current)) {
          lastCloudDataRef.current = cloudData;
          loadFromExternal(cloudData);
        }
      });
    }
  }, [onDataLoaded, loadFromExternal]);

  return null;
}
