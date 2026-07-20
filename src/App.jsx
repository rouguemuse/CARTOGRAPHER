import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Landing from './pages/Landing';
import Stage from './pages/Stage';
import ObjectSelection from './pages/ObjectSelection';
import Result from './pages/Result';
import Journal from './pages/Journal';
import Almanac from './pages/Almanac';
import Endings from './pages/Endings';
import JourneyController from './pages/JourneyController';
import { AuthProvider } from './contexts/AuthContext';
import { JourneyProvider } from './context/JourneyProvider';
import { useJourneyState } from './hooks/useJourneyState';
import { journeyConfig } from './data/journeyConfig';

function RequireActiveJourney({ children }) {
  const { stageId } = useParams();
  const { getActiveJourney } = useJourneyState();
  const journey = getActiveJourney();
  
  if (!journey || journey.status === 'completed' || !journey.carriedObject) {
    return <Navigate to="/journey/carry" replace />;
  }

  // Ensure stageId is valid
  if (stageId && !journeyConfig.isValidStageId(stageId)) {
    return <Navigate to={`/journey/stage/${journey.currentStage}`} replace />;
  }

  // Prevent skipping ahead
  const requestedIndex = journeyConfig.getStageIndex(stageId);
  const currentIndex = journeyConfig.getStageIndex(journey.currentStage);
  
  if (requestedIndex > currentIndex) {
    return <Navigate to={`/journey/stage/${journey.currentStage}`} replace />;
  }
  
  return children;
}

function RequireCompletedJourney({ children }) {
  const { journeyId } = useParams();
  const { getJourney } = useJourneyState();
  const journey = getJourney(journeyId);

  if (!journey || journey.status !== 'completed' || !journey.resultSnapshot) {
    return <Navigate to="/journey" replace />;
  }

  return children;
}

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
import ScrollAndFocusManager from './components/ScrollAndFocusManager';

function App() {
  return (
    <AuthProvider>
      <JourneyProvider>
        <ScrollAndFocusManager />
        <Routes>
          {/* Applebanana / Interactive Journey Routes */}
          <Route path="/" element={<JourneyShell><Landing /></JourneyShell>} />
          <Route path="/journey" element={<JourneyShell><JourneyController /></JourneyShell>} />
          <Route path="/journey/carry" element={<JourneyShell><ObjectSelection /></JourneyShell>} />
          <Route path="/journey/stage/:stageId" element={<JourneyShell><RequireActiveJourney><Stage /></RequireActiveJourney></JourneyShell>} />
          <Route path="/journey/result/:journeyId" element={<JourneyShell><RequireCompletedJourney><Result /></RequireCompletedJourney></JourneyShell>} />
          
          {/* User Data Routes */}
          <Route path="/journal" element={<JourneyShell><Journal /></JourneyShell>} />
          <Route path="/almanac" element={<ArchiveShell><Almanac /></ArchiveShell>} />
          <Route path="/endings" element={<JourneyShell><Endings /></JourneyShell>} />

          {/* Compatibility Redirects */}
          <Route path="/stage/object" element={<Navigate to="/journey/carry" replace />} />
          <Route path="/stage/:stageId" element={<Navigate to="/journey/stage/:stageId" replace />} />
          <Route path="/result" element={<Navigate to="/journey" replace />} />
          <Route path="/journey/result" element={<Navigate to="/journey" replace />} />

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
      </JourneyProvider>
    </AuthProvider>
  );
}

export default App;
