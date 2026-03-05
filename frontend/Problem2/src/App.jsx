import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- IMPORT COMPONENTS ---
import Sidebar from './components/Sidebar';

// --- IMPORT PAGES ---
import Dashboard from './pages/Dashboard'; // This is your TV Screen UI!
import LegacyDashboardPage from './pages/LegacyDashboardPage'; // This is the old UI!
import HeatmapPage from './pages/HeatmapPage'; 
import ClusterPage from './pages/ClusterPage';
import CareerPath from './pages/CareerPath';
import ControlRoom from './pages/ControlRoom';

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#0B1120' }}>
        
        <Sidebar />
        
        <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          <Routes>
            {/* COMMAND CENTER loads your TV Screen layout */}
            <Route path="/" element={<Dashboard />} />
            
            {/* LEGACY DASHBOARD loads the older charts layout */}
            <Route path="/legacy" element={<LegacyDashboardPage />} />

            {/* OTHER PAGES */}
            <Route path="/heatmap" element={<HeatmapPage />} />
            <Route path="/clusters" element={<ClusterPage />} />
            <Route path="/career" element={<CareerPath />} />
            <Route path="/control" element={<ControlRoom />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css'; // Make sure any global resets are here

// // --- IMPORT COMPONENTS ---
// import Sidebar from './components/Sidebar';

// // --- IMPORT PAGES ---
// import Dashboard from './pages/Dashboard';
// import HeatmapPage from './pages/HeatmapPage'; // <-- The new page
// import ClusterPage from './pages/ClusterPage';
// import CareerPath from './pages/CareerPath';
// import ControlRoom from './pages/ControlRoom';

// function App() {
//   return (
//     <Router>
//       {/* FULL SCREEN FLEX CONTAINER: 
//         Keeps Sidebar fixed on left, content scrolls on the right 
//       */}
//       <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#0a0e17' }}>
        
//         {/* LEFT SIDEBAR */}
//         <Sidebar />
        
//         {/* MAIN CONTENT AREA (Scrollable) */}
//         <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/heatmap" element={<HeatmapPage />} />
//             <Route path="/clusters" element={<ClusterPage />} />
//             <Route path="/career" element={<CareerPath />} />
//             <Route path="/control" element={<ControlRoom />} />
//           </Routes>
//         </div>

//       </div>
//     </Router>
//   );
// }

// export default App;