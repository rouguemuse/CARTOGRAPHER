import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Stage from './pages/Stage';
import ObjectSelection from './pages/ObjectSelection';
import Result from './pages/Result';
import Journal from './pages/Journal';
import JourneyController from './pages/JourneyController';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/journey" element={<JourneyController />} />
        
        {/* Existing Interactive Journey Routes */}
        <Route path="/stage/object" element={<ObjectSelection />} />
        <Route path="/stage/:stageId" element={<Stage />} />
        <Route path="/result" element={<Result />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
