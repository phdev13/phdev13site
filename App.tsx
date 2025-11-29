
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { ServiceDetail } from './components/ServiceDetail';
import { ServicePackage, ViewType } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServicePackage | null>(null);

  const handleNavigate = (view: ViewType) => {
    setSelectedService(null); // Close detail view if navigating via menu
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleSelectService = (service: ServicePackage) => {
    setSelectedService(service);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromService = () => {
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen relative font-sans bg-gray-50 flex flex-col">
      {/* Hide header if in detail view to give full focus, or keep it. Keeping it for navigation context. */}
      <Header currentView={currentView} onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* Detail View Overlay logic */}
          {selectedService ? (
             <ServiceDetail 
                key="service-detail"
                service={selectedService} 
                onBack={handleBackFromService}
                onHire={handleOpenChat}
             />
          ) : (
            <>
              {currentView === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Hero onNavigate={handleNavigate} onOpenChat={handleOpenChat} />
                </motion.div>
              )}

              {currentView === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="pt-24 min-h-screen"
                >
                  <About onNavigate={handleNavigate} />
                </motion.div>
              )}

              {currentView === 'services' && (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="pt-24 min-h-screen"
                >
                  <Services onSelectService={handleSelectService} />
                </motion.div>
              )}

              {currentView === 'portfolio' && (
                <motion.div
                  key="portfolio"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="pt-24 min-h-screen"
                >
                  <Portfolio onOpenChat={handleOpenChat} />
                </motion.div>
              )}

              {currentView === 'process' && (
                <motion.div
                  key="process"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="pt-24 min-h-screen"
                >
                  <Process onOpenChat={handleOpenChat} />
                </motion.div>
              )}

              {currentView === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="pt-24 min-h-screen"
                >
                  <Contact />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </main>

      <Footer onNavigate={handleNavigate} />
      <Chatbot 
        isOpen={isChatOpen} 
        setIsOpen={setIsChatOpen} 
        onNavigate={handleNavigate} 
        contextService={selectedService}
      />
    </div>
  );
}

export default App;
