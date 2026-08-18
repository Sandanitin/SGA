import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AppRoutes } from './routes/AppRoutes';
import ScrollToTop from './components/ScrollToTop';

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#ffffff' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
