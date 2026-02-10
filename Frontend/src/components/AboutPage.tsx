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
            <InfoCard
              icon="flag"
              title="Our Mission"
              description="To democratize access to advanced agricultural diagnostics. We aim to provide farmers worldwide with instant, accurate, and actionable insights into crop health using everyday devices, reducing crop loss and pesticide usage."
              bgIcon="agriculture"
            />
            <InfoCard
              icon="visibility"
              title="Our Vision"
              description="A future where technology bridges the gap between traditional farming and precision agriculture. We envision a sustainable ecosystem where AI serves as a proactive guardian for global biodiversity and food supply chains."
              bgIcon="psychology"
            />
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-background-dark/50"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Strategic <span className="text-primary">Focus</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FocusCard
              icon="smart_toy"
              title="Artificial Intelligence"
              text="Developing lightweight, high-accuracy Convolutional Neural Networks (CNNs) optimized for edge deployment on mobile devices."
            />
            <FocusCard
              icon="eco"
              title="Sustainability"
              text="Promoting targeted treatment plans that minimize chemical runoff and preserve soil health for future generations."
            />
            <FocusCard
              icon="science"
              title="Precision Research"
              text="Collaborating with agricultural institutes to gather labeled datasets specifically for regional plant pathologies."
            />
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <span className="text-primary text-sm font-bold uppercase tracking-widest mb-2 block">
              The Creators
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Meet the Team</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Undergraduate Computer Engineering students at Kathmandu University
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember name="Aryan Thagunna" image="/team/aryan_thagunna.jpg" />
            <TeamMember name="Aryan Mahato" image="/team/aryan_mahato.jpg" />
            <TeamMember name="Sakar Maharjan" image="/team/sakar_maharjan.jpg" />
            <TeamMember name="Pukar Adhikari" image="/team/pukar_adhikari.jpg" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

const TeamMember: React.FC<{ name: string; image: string }> = ({ name, image }) => (
  <div className="glass-panel rounded-2xl p-6 text-center group hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 border-primary/10">
    <div className="w-32 h-32 mx-auto rounded-full p-1 bg-gradient-to-br from-primary/50 to-transparent mb-6">
      <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
    </div>
    <h4 className="text-lg font-bold text-white mb-1">{name}</h4>
  </div>
);

const InfoCard = ({ icon, title, description, bgIcon }: any) => (
  <div className="glass-panel p-10 rounded-3xl relative overflow-hidden">
    <div className="absolute top-0 right-0 p-8 opacity-20">
      <span className="material-symbols-outlined text-[120px] text-primary">{bgIcon}</span>
    </div>
    <div className="relative z-10">
      <div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 text-primary">
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-lg">{description}</p>
    </div>
  </div>
);

const FocusCard = ({ icon, title, text }: any) => (
  <div className="glass-panel p-8 rounded-2xl h-full border-t border-white/10">
    <span className="material-symbols-outlined text-4xl text-primary mb-6">
      {icon}
    </span>
    <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
    <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
  </div>
);

export default AboutPage;
