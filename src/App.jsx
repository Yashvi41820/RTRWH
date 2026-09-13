import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import WizardApp from './pages/WizardApp';
import AuthModal from './components/AuthModal';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'wizard'
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleOpenAuth = () => {
    setIsAuthOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthOpen(false);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
    setView('wizard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white selection:bg-sky-500 selection:text-slate-950 font-sans">
      {view === 'landing' ? (
        <LandingPage
          onOpenAuth={handleOpenAuth}
          onStartWizard={(target) => {
            if (target === 'wizard') {
              setIsAuthOpen(true);
            } else {
              setView(target);
            }
          }}
          user={user}
          onLogout={handleLogout}
        />
      ) : (
        <WizardApp
          onOpenAuth={handleOpenAuth}
          onGoLanding={() => setView('landing')}
          user={user}
          onLogout={handleLogout}
        />
      )}

      {/* Auth Modal Screen */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={handleCloseAuth}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
