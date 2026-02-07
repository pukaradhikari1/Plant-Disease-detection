import React from 'react';
import treatmentsData from "../data/treatments.json";
import type { ViewState, DiseaseResult } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
  result: DiseaseResult | null;
}

const ResultsPage: React.FC<Props> = ({ onNavigate, result }) => {
  // 1. DATA FALLBACK
  // If result is null, we show default data. Otherwise, we use the backend response.
  const data = result || {
    name: "Potato_Late_Blight",
    pathogen: "Phytophthora infestans",
    confidence: 99.2,
    description: "Devastating disease causing large, dark brown blotches with green-gray edges on leaves and stems.",
    image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&q=80&w=800",
    processingTime: "1.20s"
  };

  // 2. TREATMENT LOOKUP LOGIC
  // Your backend sends names like "Tomato_mosaic_virus" which matches the JSON keys.
  const lookupKey = data.name; 
  const treatments = (treatmentsData as Record<string, any>)[lookupKey] || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-background-light dark:bg-[#102216] min-h-screen flex flex-col relative overflow-x-hidden font-display text-white print:bg-white print:text-black">
      {/* Backgrounds - hide during print */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[size:40px_40px] print:hidden" style={{backgroundImage: "linear-gradient(to right, #316843 1px, transparent 1px), linear-gradient(to bottom, #316843 1px, transparent 1px)"}}></div>
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#102216_100%)] print:hidden"></div>

      {/* Header - hide during print */}
      <header className="relative z-20 glass-panel border-b border-white/5 sticky top-0 print:hidden">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-3">
            <div className="text-primary animate-pulse">
              <span className="material-symbols-outlined text-3xl">eco</span>
            </div>
            <div className="text-left">
              <h1 className="text-white text-lg font-bold tracking-wider uppercase">Plant Disease <span className="text-primary font-normal">Detection</span></h1>
              <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase leading-none">Analysis Report</p>
            </div>
          </button>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-400">
              <button onClick={() => onNavigate('dashboard')} className="hover:text-primary transition-colors cursor-pointer uppercase text-xs tracking-widest">New Scan</button>
              <span className="text-white uppercase text-xs tracking-widest">Results</span>
            </nav>
            <div className="h-6 w-px bg-white/10 mx-2"></div>
            <button onClick={handlePrint} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-xl">print</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-[1400px] mx-auto w-full p-6 lg:p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6 print:border-black">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary text-xs tracking-widest uppercase font-bold print:text-black">
              <span className="material-symbols-outlined text-sm">verified</span>
              Analysis Verified
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white print:text-black">Diagnosis Results</h2>
            <p className="text-gray-400 max-w-xl print:text-gray-600">Processed in {data.processingTime}</p>
          </div>
          <div className="flex gap-4 print:hidden">
            <button 
                onClick={() => onNavigate('dashboard')}
                className="text-gray-400 hover:text-white flex items-center gap-2 text-sm uppercase tracking-wide"
            >
              <span className="material-symbols-outlined">arrow_back</span> Back to Dashboard
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Disease Card */}
          <div className="lg:col-span-12 glass-panel rounded-2xl p-6 relative overflow-hidden group border border-white/5 shadow-lg print:border-black print:shadow-none">
            <div className="absolute top-0 right-0 p-4 opacity-50 print:hidden">
              <span className="material-symbols-outlined text-6xl text-white/5">coronavirus</span>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center h-full">
              <div className="relative shrink-0 w-32 h-32 md:w-48 md:h-48 rounded-xl overflow-hidden border-2 border-danger/30 shadow-[0_0_20px_rgba(239,68,68,0.2)] print:border-black print:shadow-none">
                <div 
                  className="w-full h-full bg-cover bg-center print:bg-contain print:bg-no-repeat" 
                  style={{backgroundImage: `url('${data.image}')`}}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent print:hidden"></div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-danger text-white text-[10px] font-bold uppercase rounded print:border print:border-black print:text-black print:bg-white">Pathogen Detected</div>
              </div>
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div>
                  <div className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-1 print:text-gray-600">Detected Disease</div>
                  {/* We replace underscores with spaces for the display name */}
                  <h3 className="text-3xl md:text-4xl font-bold text-danger neon-text-glow print:text-black print:shadow-none">
                    {data.name.replace(/_/g, ' ')}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 italic print:text-gray-800">{data.pathogen}</p>
                </div>
                <p className="text-sm text-gray-400 line-clamp-3 print:text-black">{data.description}</p>
              </div>
              <div className="shrink-0 w-32">
                <div className="relative">
                  <svg className="circular-chart" viewBox="0 0 36 36">
                    <path className="circle-bg print:stroke-black" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                    <path className="circle print:stroke-black" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" strokeDasharray={`${data.confidence}, 100`}></path>
                    <text className="percentage print:fill-black" x="18" y="20.35">{data.confidence}%</text>
                  </svg>
                  <div className="text-center mt-2 text-[10px] text-gray-400 uppercase tracking-wider print:text-black">Confidence</div>
                </div>
              </div>
            </div>
          </div>

          {/* Treatment Protocol */}
          <div className="lg:col-span-12 glass-panel rounded-2xl p-6 md:p-8 border border-white/5 print:border-black print:text-black">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 print:text-black">
              <span className="material-symbols-outlined text-caution print:text-black">medical_services</span>
              Treatment Protocol
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {treatments.length > 0 ? (
                treatments.map((treatment: any, idx: number) => (
                  <TreatmentCard 
                    key={idx}
                    type={treatment.type}
                    color={treatment.color}
                    icon={treatment.icon}
                    title={treatment.title}
                    steps={treatment.steps}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-10 text-gray-500 italic">
                  No specific treatment protocol found for this detection in the database.
                </div>
              )}
            </div>
          </div>
          
          {/* Footer Links - hide during print */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 print:hidden">
             <ExternalLink 
                icon="forest" 
                color="blue" 
                title="Forestry Department Database" 
                desc="Access regional blight reports & guidelines" 
                url="http://www.npponepal.gov.np/en/"
             />
             <ExternalLink 
                icon="biotech" 
                color="purple" 
                title="Agricultural Research Portal" 
                desc="Latest studies on disease resistance" 
                url="https://narc.gov.np/"
             />
          </div>
        </div>
      </main>

      <footer className="relative z-20 border-t border-white/5 bg-[#0d1c12] py-4 px-6 mt-8 print:hidden">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase tracking-wider">
          <div>2026 Plant Disease Detection System.</div>
          <div className="text-primary/50">Secure Analysis Hub</div>
        </div>
      </footer>
    </div>
  );
};

// --- Sub-components ---

const TreatmentCard: React.FC<{type: string, color: string, icon: string, title: string, steps: string[]}> = ({type, color, icon, title, steps}) => {
    // Map colors to actual Tailwind strings so the compiler sees them
    const theme: Record<string, any> = {
        danger: { text: 'text-red-500', border: 'border-red-500/30', bg: 'bg-red-500/10', marker: 'marker:text-red-500' },
        caution: { text: 'text-amber-500', border: 'border-amber-500/30', bg: 'bg-amber-500/10', marker: 'marker:text-amber-500' },
        primary: { text: 'text-emerald-500', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', marker: 'marker:text-emerald-500' },
    };

    const styles = theme[color] || theme.primary;

    return (
        <div className={`bg-surface-dark/50 p-5 rounded-xl border border-white/5 hover:${styles.border} transition-all print:bg-white print:border-black`}>
            <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-lg ${styles.text} ${styles.bg} print:hidden`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                <span className={`text-[10px] border ${styles.border} ${styles.text} px-2 py-0.5 rounded uppercase font-bold print:text-black print:border-black`}>
                    {type}
                </span>
            </div>
            <h4 className="text-white font-bold mb-2 print:text-black">{title}</h4>
            <ul className={`text-sm text-gray-400 space-y-2 list-disc list-inside ${styles.marker} print:text-black`}>
                {steps.map((step, i) => <li key={i}>{step}</li>)}
            </ul>
        </div>
    );
};

const ExternalLink: React.FC<{icon: string, color: string, title: string, desc: string, url: string}> = ({icon, color, title, desc, url}) => {
    const colorMap: Record<string, string> = {
        blue: 'text-blue-400 bg-blue-900/30 border-blue-500/30 group-hover:text-blue-400',
        purple: 'text-purple-400 bg-purple-900/30 border-purple-500/30 group-hover:text-purple-400'
    };

    return (
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="glass-panel rounded-xl p-6 border border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group"
        >
            <div className="flex items-center gap-4">
                <div className={`size-12 rounded-full flex items-center justify-center border ${colorMap[color].split(' ').slice(0, 3).join(' ')}`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
                <div>
                    <h4 className={`text-white font-bold ${colorMap[color].split(' ').slice(3).join(' ')} transition-colors`}>{title}</h4>
                    <p className="text-xs text-gray-500">{desc}</p>
                </div>
            </div>
            <span className="material-symbols-outlined text-gray-600 group-hover:text-white transition-colors">open_in_new</span>
        </a>
    );
}

export default ResultsPage;