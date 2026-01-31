import React, { useState } from 'react';
import type { ViewState } from "../App";


interface NavBarProps {
  onNavigate: (view: ViewState) => void;
  activeView: ViewState;
}

export const NavBar: React.FC<NavBarProps> = ({ onNavigate, activeView }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav h-20 flex items-center transition-all duration-300">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="size-8 text-primary transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-[32px] icon-glow">local_florist</span>
          </div>
          <h2 className="text-white text-lg lg:text-xl font-bold tracking-tight group-hover:text-primary transition-colors">Plant Disease Detection</h2>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => onNavigate('landing')} 
            className={`${activeView === 'landing' ? 'text-primary' : 'text-gray-300 hover:text-primary'} text-sm font-medium transition-colors`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('about')} 
            className={`${activeView === 'about' ? 'text-primary' : 'text-gray-300 hover:text-primary'} text-sm font-medium transition-colors`}
          >
            About Us
          </button>
          <button 
            onClick={() => onNavigate('workflow')} 
            className={`${activeView === 'workflow' ? 'text-primary' : 'text-gray-300 hover:text-primary'} text-sm font-medium transition-colors`}
          >
            Technology
          </button>
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center justify-center rounded-lg h-10 px-6 bg-primary hover:bg-primary-hover text-background-dark text-sm font-bold shadow-[0_0_15px_rgba(13,242,89,0.2)] hover:shadow-[0_0_25px_rgba(13,242,89,0.4)] transition-all transform hover:-translate-y-0.5"
          >
            Launch App
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-background-dark border-b border-white/10 p-6 md:hidden flex flex-col gap-4 shadow-2xl">
           <button 
            onClick={() => { onNavigate('landing'); setMobileMenuOpen(false); }} 
            className="text-left text-gray-300 hover:text-primary py-2"
          >
            Home
          </button>
          <button 
            onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} 
            className="text-left text-gray-300 hover:text-primary py-2"
          >
            About Us
          </button>
          <button 
            onClick={() => { onNavigate('workflow'); setMobileMenuOpen(false); }} 
            className="text-left text-gray-300 hover:text-primary py-2"
          >
            Technology
          </button>
          <button 
            onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
            className="bg-primary text-background-dark font-bold py-3 rounded-lg"
          >
            Launch App
          </button>
        </div>
      )}
    </nav>
  );
};