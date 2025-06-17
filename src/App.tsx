import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Sectors } from './pages/Sectors';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ContentProvider } from './context/ContentContext';
import { LegalNotice } from './pages/LegalNotice';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { FAQ } from './pages/FAQ';
import { SectorDetail } from './pages/SectorDetail';
import { ServiceDetail } from './pages/ServiceDetail';
import { NotFound } from './pages/NotFound';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qui-sommes-nous" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:service" element={<ServiceDetail />} />
          <Route path="/secteurs" element={<Sectors />} />
          <Route path="/secteurs/:sector" element={<SectorDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/actualites" element={<Navigate to="/blog" replace />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<LegalNotice />} />
          <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ContentProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Route login sans layout */}
          <Route path="/login" element={<AdminLogin />} />
          {/* Routes admin protégées sans layout */}
          <Route path="/administration" element={<ProtectedRoute />} />
          <Route path="/osmozcom77120" element={<ProtectedRoute />} />
          {/* Toutes les autres routes avec layout */}
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </ContentProvider>
  );
}

export default App;