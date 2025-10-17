import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { VideoDetail } from './pages/VideoDetail';
import { NotFound } from './pages/NotFound';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

const queryClient = new QueryClient();

function AppInner() {
  const location = useLocation();
  const isDetail = location.pathname.startsWith('/video/');

  React.useEffect(() => {
    const prev = document.body.style.backgroundColor;
    if (isDetail) {
      document.body.style.backgroundColor = '#1f1f1f';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.backgroundColor = prev || '';
      document.body.style.color = '';
    }
    return () => {
      document.body.style.backgroundColor = prev || '';
      document.body.style.color = '';
    };
  }, [isDetail]);

  return (
    <div className={`min-h-screen flex flex-col ${isDetail ? 'bg-[#1f1f1f]' : 'bg-gray-100'}`}>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:slug" element={<VideoDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isDetail && <Footer />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppInner />
      </Router>
    </QueryClientProvider>
  );
}

export default App;