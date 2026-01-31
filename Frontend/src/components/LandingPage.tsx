import React from 'react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import type { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const LandingPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <>
      <NavBar onNavigate={onNavigate} activeView="landing" />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Active
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 text-white">
                Detect Plant Diseases <br />
                with <span className="text-primary text-glow">AI Precision</span>
              </h1>
              <p className="text-gray-400 text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                Leverage state-of-the-art neural networks to instantly identify pathogens and receive treatment plans for tomato, potato and cauliflower in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center justify-center rounded-lg h-14 px-8 bg-primary text-background-dark text-base font-bold shadow-[0_0_20px_rgba(13,242,89,0.3)] hover:shadow-[0_0_30px_rgba(13,242,89,0.5)] transition-all hover:-translate-y-1"
                >
                  <span className="material-symbols-outlined mr-2">add_a_photo</span>
                  Analyze Leaf
                </button>
                <button 
                  onClick={() => onNavigate('workflow')}
                  className="flex items-center justify-center rounded-lg h-14 px-8 border border-white/20 bg-white/5 text-white text-base font-bold hover:bg-white/10 hover:border-primary/50 transition-all backdrop-blur-sm"
                >
                  Learn How It Works
                </button>
              </div>
              
              {/* Stats */}
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 border-t border-white/10 pt-8">
                <div>
                  <p className="text-3xl font-bold text-white">99.8%</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Accuracy</p>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div>
                  <p className="text-3xl font-bold text-white">3</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Species</p>
                </div>
                <div className="w-px h-12 bg-white/10"></div>
                <div>
                  <p className="text-3xl font-bold text-white">2s</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">Analysis Time</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="flex-1 w-full max-w-[600px] relative group perspective-1000">
              {/* Decorative scanning frame */}
              <div className="absolute inset-0 border-2 border-primary/30 rounded-2xl z-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -mt-0.5 -ml-0.5"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary -mt-0.5 -mr-0.5"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -mb-0.5 -ml-0.5"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary -mb-0.5 -mr-0.5"></div>
                {/* Scanning Line Animation */}
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_15px_rgba(13,242,89,0.8)] animate-[scan_3s_ease-in-out_infinite]"></div>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden glass-panel p-2 shadow-2xl transform transition-transform duration-700 hover:rotate-y-12">
                <img 
                  src="https://images.pexels.com/photos/7231140/pexels-photo-7231140.jpeg" 
                  alt="Macro shot of a green plant leaf" 
                  className="w-full h-auto rounded-xl grayscale-[20%] contrast-125 hover:grayscale-0 transition-all duration-500"
                />
                
                {/* UI Overlay on image */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-primary font-mono uppercase">Detected Issue</span>
                    <span className="text-xs text-white font-mono bg-red-500/20 text-red-400 px-2 py-0.5 rounded">High Severity</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-400">warning</span>
                    <div>
                      <p className="text-sm font-bold text-white">Early Blight</p>
                      <p className="text-xs text-gray-400">Alternaria solani</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative bg-[#0d0d10]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose Our <span className="text-primary">AI Diagnostic?</span></h2>
            <p className="text-gray-400">Experience the power of advanced botanical diagnostics powered by cutting-edge computer vision.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-3xl icon-glow">center_focus_strong</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Accuracy</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                99.8% detection rate powered by Vision Transformers trained on over 10 million plant images.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-3xl icon-glow">dataset</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Multiple Models</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Cross-referenced against a global database of botanic pathology for enhanced reliability.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-colors group">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-3xl icon-glow">bolt</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Results</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Real-time diagnosis in under 2 seconds, allowing for immediate field action and treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative overflow-hidden">
        {/* Background decorative line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden lg:block"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">Workflow</span>
            <h2 className="text-3xl lg:text-4xl font-bold">How It Works</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-background-card border border-primary/30 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(13,242,89,0.15)] group-hover:bg-primary group-hover:text-background-dark transition-all duration-300">
                <span className="material-symbols-outlined text-2xl">cloud_upload</span>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-bold text-white mb-2">Upload</h4>
                <p className="text-sm text-gray-400">Snap a clear photo of the affected leaf or plant area.</p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="absolute -top-12 left-1/2 w-px h-12 bg-primary/30 lg:hidden"></div>
              <div className="w-16 h-16 rounded-full bg-background-card border border-primary/30 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(13,242,89,0.15)] group-hover:bg-primary group-hover:text-background-dark transition-all duration-300">
                <span className="material-symbols-outlined text-2xl">bubble_chart</span>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-bold text-white mb-2">Analyze</h4>
                <p className="text-sm text-gray-400">Our AI scans cellular patterns and discolorations.</p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="absolute -top-12 left-1/2 w-px h-12 bg-primary/30 lg:hidden"></div>
              <div className="w-16 h-16 rounded-full bg-background-card border border-primary/30 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(13,242,89,0.15)] group-hover:bg-primary group-hover:text-background-dark transition-all duration-300">
                <span className="material-symbols-outlined text-2xl">biotech</span>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-bold text-white mb-2">Diagnose</h4>
                <p className="text-sm text-gray-400">Identify the specific disease with high confidence.</p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="relative flex flex-col items-center text-center group">
              <div className="absolute -top-12 left-1/2 w-px h-12 bg-primary/30 lg:hidden"></div>
              <div className="w-16 h-16 rounded-full bg-background-card border border-primary/30 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(13,242,89,0.15)] group-hover:bg-primary group-hover:text-background-dark transition-all duration-300">
                <span className="material-symbols-outlined text-2xl">healing</span>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-bold text-white mb-2">Treat</h4>
                <p className="text-sm text-gray-400">Receive actionable steps to recover plant health.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="glass-panel rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 border-primary/20">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/10 rounded-full blur-[80px]"></div>
            
            <div className="flex-1 text-center lg:text-left z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to save your crops?</h2>
              <p className="text-gray-300 mb-8 max-w-md mx-auto lg:mx-0">Try the demo version now. No sign-up required for your first 3 scans.</p>
              <button 
                onClick={() => onNavigate('dashboard')}
                className="inline-flex items-center justify-center rounded-lg h-12 px-8 bg-primary text-background-dark font-bold hover:bg-white transition-colors"
              >
                Start Free Scan
              </button>
            </div>
            
            {/* Fake Dropzone */}
            <div className="flex-1 w-full max-w-md z-10">
              <div 
                onClick={() => onNavigate('dashboard')}
                className="border-2 border-dashed border-white/20 rounded-xl bg-black/20 p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group h-64"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-primary">upload_file</span>
                </div>
                <p className="text-white font-medium mb-1">Drop your leaf image here</p>
                <p className="text-xs text-gray-500">Supports JPG, PNG, HEIC</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default LandingPage;