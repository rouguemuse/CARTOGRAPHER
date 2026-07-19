import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Stage from './pages/Stage';
import ObjectSelection from './pages/ObjectSelection';
import Result from './pages/Result';
import Journal from './pages/Journal';
import Almanac from './pages/Almanac';
import Endings from './pages/Endings';
import JourneyController from './pages/JourneyController';
import { AuthProvider } from './contexts/AuthContext';

// Archive Pages
import Archive from './pages/Archive';
import Library from './pages/Library';
import Stories from './pages/library/Stories';
import FieldGuide from './pages/library/FieldGuide';
import Inventory from './pages/library/Inventory';
import Glossary from './pages/library/Glossary';
import ArticleView from './pages/library/ArticleView';
import ThingsIShouldHaveSaid from './pages/ThingsIShouldHaveSaid';
import DearRed from './pages/DearRed';
import Workbook from './pages/Workbook';
import Book from './pages/Book';
import About from './pages/About';
import AtlasIntro from './pages/AtlasIntro';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ArticleManager from './pages/admin/ArticleManager';
import WallModeration from './pages/admin/WallModeration';
import DearRedInbox from './pages/admin/DearRedInbox';
import ProtectedRoute from './components/ProtectedRoute';
import ArchiveShell from './components/ArchiveShell';
import JourneyShell from './components/JourneyShell';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Applebanana / Interactive Journey Routes */}
        <Route path="/" element={<JourneyShell><Landing /></JourneyShell>} />
        <Route path="/journey" element={<JourneyShell><JourneyController /></JourneyShell>} />
        <Route path="/journey/carry" element={<JourneyShell><ObjectSelection /></JourneyShell>} />
        <Route path="/journey/stage/:stageId" element={<JourneyShell><Stage /></JourneyShell>} />
        <Route path="/journey/result" element={<JourneyShell><Result /></JourneyShell>} />
        
        {/* User Data Routes */}
        <Route path="/journal" element={<JourneyShell><Journal /></JourneyShell>} />
        <Route path="/almanac" element={<ArchiveShell><Almanac /></ArchiveShell>} />
        <Route path="/endings" element={<JourneyShell><Endings /></JourneyShell>} />

        {/* Compatibility Redirects */}
        <Route path="/stage/object" element={<Navigate to="/journey/carry" replace />} />
        <Route path="/stage/:stageId" element={<Navigate to="/journey/stage/:stageId" replace />} />
        <Route path="/result" element={<Navigate to="/journey/result" replace />} />

        {/* Editorial Archive Routes */}
        <Route path="/archive" element={<ArchiveShell><Archive /></ArchiveShell>} />
        <Route path="/atlas/explore" element={<ArchiveShell><AtlasIntro /></ArchiveShell>} />
        
        {/* Library Routes */}
        <Route path="/library" element={<ArchiveShell><Library /></ArchiveShell>} />
        <Route path="/library/stories" element={<ArchiveShell><Stories /></ArchiveShell>} />
        <Route path="/library/field-guide" element={<ArchiveShell><FieldGuide /></ArchiveShell>} />
        <Route path="/library/inventory" element={<ArchiveShell><Inventory /></ArchiveShell>} />
        <Route path="/library/glossary" element={<ArchiveShell><Glossary /></ArchiveShell>} />
        <Route path="/library/:collection/:slug" element={<ArchiveShell><ArticleView /></ArchiveShell>} />
        
        {/* Forms & Content */}
        <Route path="/things-i-should-have-said" element={<ArchiveShell><ThingsIShouldHaveSaid /></ArchiveShell>} />
        <Route path="/dear-red" element={<ArchiveShell><DearRed /></ArchiveShell>} />
        
        {/* Static Content */}
        <Route path="/workbook" element={<ArchiveShell><Workbook /></ArchiveShell>} />
        <Route path="/book" element={<ArchiveShell><Book /></ArchiveShell>} />
        <Route path="/about" element={<ArchiveShell><About /></ArchiveShell>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<ArchiveShell><AdminLogin /></ArchiveShell>} />
        <Route 
          path="/admin" 
          element={
            <ArchiveShell>
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            </ArchiveShell>
          } 
        />
        <Route 
          path="/admin/articles" 
          element={
            <ArchiveShell>
              <ProtectedRoute>
                <ArticleManager />
              </ProtectedRoute>
            </ArchiveShell>
          } 
        />
        <Route 
          path="/admin/wall" 
          element={
            <ArchiveShell>
              <ProtectedRoute>
                <WallModeration />
              </ProtectedRoute>
            </ArchiveShell>
          } 
        />
        <Route 
          path="/admin/dear-red" 
          element={
            <ArchiveShell>
              <ProtectedRoute>
                <DearRedInbox />
              </ProtectedRoute>
            </ArchiveShell>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
