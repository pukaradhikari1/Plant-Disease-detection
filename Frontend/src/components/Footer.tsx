import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-10 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">local_florist</span>
            <span className="text-xl font-bold text-white">Plant Disease Detection</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-md text-center md:text-right">
            Empowering farmers and gardeners with enterprise-grade AI diagnostics.
          </p>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm text-center">
            &copy; 2026 Plant Disease Detection. All rights reserved.
            <a href="https://github.com/pukaradhikari1/Plant-Disease-detection" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};