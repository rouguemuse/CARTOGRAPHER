import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Landing from './pages/Landing';
import Stage from './pages/Stage';
import ObjectSelection from './pages/ObjectSelection';
import Result from './pages/Result';
import JourneyController from './pages/JourneyController';
import FieldNotes from './pages/journey/FieldNotes';
import MapsReturned from './pages/journey/MapsReturned';
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

  if (stageId && !journeyConfig.isValidStageId(stageId)) {
    return <Navigate to={`/journey/stage/${journey.currentStage}`} replace />;
  }

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

// Archive Rooms & Detail Components
import ArchivePortal from './pages/archive/ArchivePortal';
import FieldGuideIndex from './pages/archive/FieldGuideIndex';
import FieldGuideDetail from './pages/archive/FieldGuideDetail';
import InventoryIndex from './pages/archive/InventoryIndex';
import InventoryDetail from './pages/archive/InventoryDetail';
import GlossaryIndex from './pages/archive/GlossaryIndex';
import GlossaryDetail from './pages/archive/GlossaryDetail';

// Participatory 3-Tier Submission Systems & Pages
import ThingsIShouldHaveSaid from './pages/ThingsIShouldHaveSaid';
import ThingsUnsaidSubmit from './pages/ThingsUnsaidSubmit';
import DearRed from './pages/DearRed';
import DearRedWrite from './pages/DearRedWrite';
import DearRedDetail from './pages/DearRedDetail';
import SubmitHub from './pages/SubmitHub';
import Workbook from './pages/Workbook';
import Book from './pages/Book';
import About from './pages/About';

// Admin Pages & Submissions Dashboard
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ArticleManager from './pages/admin/ArticleManager';
import WallModeration from './pages/admin/WallModeration';
import DearRedInbox from './pages/admin/DearRedInbox';
import AdminSubmissions from './pages/admin/AdminSubmissions';
import ProtectedRoute from './components/ProtectedRoute';

// Shells & Managers
import ArchiveShell from './components/ArchiveShell';
import JourneyShell from './components/JourneyShell';
import ScrollAndFocusManager from './components/ScrollAndFocusManager';

function App() {
  return (
    <AuthProvider>
      <JourneyProvider>
        <ScrollAndFocusManager />
        <Routes>
          {/* Interactive Journey Routes */}
          <Route path="/" element={<JourneyShell><Landing /></JourneyShell>} />
          <Route path="/journey" element={<JourneyShell><JourneyController /></JourneyShell>} />
          <Route path="/journey/carry" element={<JourneyShell><ObjectSelection /></JourneyShell>} />
          <Route path="/journey/stage/:stageId" element={<JourneyShell><RequireActiveJourney><Stage /></RequireActiveJourney></JourneyShell>} />
          <Route path="/journey/result/:journeyId" element={<JourneyShell><RequireCompletedJourney><Result /></RequireCompletedJourney></JourneyShell>} />
          
          {/* Journey Personal Space Routes */}
          <Route path="/journey/field-notes" element={<JourneyShell><FieldNotes /></JourneyShell>} />
          <Route path="/journey/maps-returned" element={<JourneyShell><MapsReturned /></JourneyShell>} />

          {/* Legacy Journey In-App Redirects */}
          <Route path="/journal" element={<Navigate to="/journey/field-notes" replace />} />
          <Route path="/endings" element={<Navigate to="/journey/maps-returned" replace />} />
          <Route path="/almanac" element={<Navigate to="/archive/field-guide" replace />} />
          <Route path="/stage/object" element={<Navigate to="/journey/carry" replace />} />
          <Route path="/stage/:stageId" element={<Navigate to="/journey/stage/:stageId" replace />} />
          <Route path="/result" element={<Navigate to="/journey" replace />} />
          <Route path="/journey/result" element={<Navigate to="/journey" replace />} />

          {/* Legacy Library In-App Redirects */}
          <Route path="/library" element={<Navigate to="/archive" replace />} />
          <Route path="/library/stories" element={<Navigate to="/archive/field-guide" replace />} />
          <Route path="/library/field-guide" element={<Navigate to="/archive/field-guide" replace />} />
          <Route path="/library/inventory" element={<Navigate to="/archive/inventory" replace />} />
          <Route path="/library/glossary" element={<Navigate to="/archive/glossary" replace />} />
          <Route path="/library/field-guide/:slug" element={<Navigate to="/archive/field-guide/:slug" replace />} />
          <Route path="/library/stories/:slug" element={<Navigate to="/archive/field-guide/:slug" replace />} />
          <Route path="/library/inventory/:slug" element={<Navigate to="/archive/inventory/:slug" replace />} />
          <Route path="/library/glossary/:slug" element={<Navigate to="/archive/glossary/:slug" replace />} />

          {/* Editorial Archive Routes */}
          <Route path="/archive" element={<ArchiveShell><ArchivePortal /></ArchiveShell>} />
          <Route path="/archive/field-guide" element={<ArchiveShell><FieldGuideIndex /></ArchiveShell>} />
          <Route path="/archive/field-guide/:entrySlug" element={<ArchiveShell><FieldGuideDetail /></ArchiveShell>} />
          <Route path="/archive/inventory" element={<ArchiveShell><InventoryIndex /></ArchiveShell>} />
          <Route path="/archive/inventory/:objectSlug" element={<ArchiveShell><InventoryDetail /></ArchiveShell>} />
          <Route path="/archive/glossary" element={<ArchiveShell><GlossaryIndex /></ArchiveShell>} />
          <Route path="/archive/glossary/:termSlug" element={<ArchiveShell><GlossaryDetail /></ArchiveShell>} />
          
          {/* Participatory 3-Tier Submission Systems */}
          <Route path="/dear-red" element={<ArchiveShell><DearRed /></ArchiveShell>} />
          <Route path="/dear-red/write" element={<ArchiveShell><DearRedWrite /></ArchiveShell>} />
          <Route path="/dear-red/:slug" element={<ArchiveShell><DearRedDetail /></ArchiveShell>} />

          <Route path="/things-i-should-have-said" element={<ArchiveShell><ThingsIShouldHaveSaid /></ArchiveShell>} />
          <Route path="/things-unsaid" element={<ArchiveShell><ThingsIShouldHaveSaid /></ArchiveShell>} />
          <Route path="/things-unsaid/submit" element={<ArchiveShell><ThingsUnsaidSubmit /></ArchiveShell>} />

          <Route path="/submit" element={<ArchiveShell><SubmitHub /></ArchiveShell>} />
          <Route path="/submission-received" element={<Navigate to="/submit" replace />} />

          {/* Static Pages */}
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
            path="/admin/submissions" 
            element={
              <ArchiveShell>
                <ProtectedRoute>
                  <AdminSubmissions />
                </ProtectedRoute>
              </ArchiveShell>
            } 
          />
          <Route 
            path="/admin/submissions/:id" 
            element={
              <ArchiveShell>
                <ProtectedRoute>
                  <AdminSubmissions />
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
