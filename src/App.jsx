import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ArticleManager from './pages/admin/ArticleManager';
import WallModeration from './pages/admin/WallModeration';
import DearRedInbox from './pages/admin/DearRedInbox';
import ProtectedRoute from './components/ProtectedRoute';

// Authentication Provider
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Archive />} />
        
        {/* Library Routes */}
        <Route path="/library" element={<Library />} />
        <Route path="/library/stories" element={<Stories />} />
        <Route path="/library/field-guide" element={<FieldGuide />} />
        <Route path="/library/inventory" element={<Inventory />} />
        <Route path="/library/glossary" element={<Glossary />} />
        <Route path="/library/:collection/:slug" element={<ArticleView />} />
        
        {/* Forms & Content */}
        <Route path="/things-i-should-have-said" element={<ThingsIShouldHaveSaid />} />
        <Route path="/dear-red" element={<DearRed />} />
        
        {/* Static Content */}
        <Route path="/workbook" element={<Workbook />} />
        <Route path="/book" element={<Book />} />
        <Route path="/about" element={<About />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/articles" 
          element={
            <ProtectedRoute>
              <ArticleManager />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/wall" 
          element={
            <ProtectedRoute>
              <WallModeration />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/dear-red" 
          element={
            <ProtectedRoute>
              <DearRedInbox />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
