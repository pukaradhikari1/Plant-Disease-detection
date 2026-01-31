import React from 'react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import type { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const AboutPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <>
      <NavBar onNavigate={onNavigate} activeView="about" />
      
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none opacity-60"></div>
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-20 pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
            <span>The Minds Behind The AI</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-8 text-white max-w-5xl mx-auto">
            Empowering Agriculture <br />
            Through <span className="text-primary text-glow">Intelligence</span>
          </h1>
          <p className="text-gray-400 text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-2xl mx-auto">
            We are a team of Computer Engineering undergraduates dedicated to solving global food security challenges through advanced deep learning and computer vision.
          </p>
        </div>
      </section>

      <section className="py-12 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-panel p-10 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <span className="material-symbols-outlined text-[120px] text-primary">agriculture</span>
              </div>
              <div className="relative z-10">
                <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 text-primary">
                  <span className="material-symbols-outlined text-2xl">flag</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  To democratize access to advanced agricultural diagnostics. We aim to provide farmers worldwide with instant, accurate, and actionable insights into crop health using everyday devices, reducing crop loss and pesticide usage.
                </p>
              </div>
            </div>

            <div className="glass-panel p-10 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <span className="material-symbols-outlined text-[120px] text-primary">psychology</span>
              </div>
              <div className="relative z-10">
                <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 text-primary">
                  <span className="material-symbols-outlined text-2xl">visibility</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  A future where technology bridges the gap between traditional farming and precision agriculture. We envision a sustainable ecosystem where AI serves as a proactive guardian for global biodiversity and food supply chains.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-background-dark/50"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Strategic <span className="text-primary">Focus</span></h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full shadow-[0_0_10px_rgba(13,242,89,0.5)]"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100"></div>
              <div className="glass-panel p-8 rounded-2xl h-full border-t border-white/10 relative">
                <span className="material-symbols-outlined text-4xl text-primary mb-6 icon-glow">smart_toy</span>
                <h4 className="text-xl font-bold text-white mb-3">Artificial Intelligence</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Developing lightweight, high-accuracy Convolutional Neural Networks (CNNs) optimized for edge deployment on mobile devices.
                </p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100"></div>
              <div className="glass-panel p-8 rounded-2xl h-full border-t border-white/10 relative">
                <span className="material-symbols-outlined text-4xl text-primary mb-6 icon-glow">eco</span>
                <h4 className="text-xl font-bold text-white mb-3">Sustainability</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Promoting targeted treatment plans that minimize chemical runoff and preserve soil health for future generations.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100"></div>
              <div className="glass-panel p-8 rounded-2xl h-full border-t border-white/10 relative">
                <span className="material-symbols-outlined text-4xl text-primary mb-6 icon-glow">science</span>
                <h4 className="text-xl font-bold text-white mb-3">Precision Research</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Collaborating with agricultural institutes to gather labeled datasets specifically for regional plant pathologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">The Creators</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Meet the Team</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Undergraduate Computer Engineering students at Kathmandu University
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember 
              name="Aryan Thagunna" 
              icon="person"
            />
            <TeamMember 
              name="Aryan Mahato" 
              icon="person_2"
            />
            <TeamMember 
              name="Sakar Maharjan" 
              icon="person_3"
            />
            <TeamMember 
              name="Pukar Adhikari" 
              icon="person_4"
            />
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

const TeamMember: React.FC<{name: string, icon: string}> = ({name, icon}) => (
  <div className="glass-panel rounded-2xl p-6 text-center group hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 border-primary/10">
    <div className="w-32 h-32 mx-auto rounded-full p-1 bg-gradient-to-br from-primary/50 to-transparent mb-6">
      <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden relative flex items-center justify-center">
        <span className="material-symbols-outlined text-5xl text-gray-600">{icon}</span>
      </div>
    </div>
    <h4 className="text-lg font-bold text-white mb-1">{name}</h4>
   
  </div>
);

export default AboutPage;