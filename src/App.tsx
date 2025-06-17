import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Sectors } from './pages/Sectors';
import { Portfolio } from './pages/Portfolio';
import { News } from './pages/News';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';
import { ContentProvider } from './context/ContentContext';

function App() {
  return (
    <ContentProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            <Route path="/ozc123" element={<AdminDashboard />} />
            <Route path="/*" element={
              <>
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/qui-sommes-nous" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/secteurs" element={<Sectors />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/actualites" element={<News />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </ContentProvider>
  );
}

export default App;