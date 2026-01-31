import React, { useState, useRef } from 'react';
import type { ViewState, DiseaseResult } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
  onAnalysisComplete: (result: DiseaseResult) => void;
}

// Database of Diseases requested
const DISEASE_DB: DiseaseResult[] = [
  // --- CAULIFLOWER ---
  {
    name: "Cauliflower Bacterial Spot Rot",
    pathogen: "Pseudomonas fluorescens",
    severity: "High",
    confidence: 97.4,
    description: "A bacterial disease causing dark, water-soaked spots on curds and leaves, leading to soft rot.",
    treatments: [
      { type: "Immediate", color: "danger", icon: "science", title: "Bactericide", steps: ["Apply copper-based bactericides.", "Remove infected curds immediately."] },
      { type: "Cultural", color: "caution", icon: "eco", title: "Management", steps: ["Avoid overhead irrigation.", "Maintain field hygiene."] },
      { type: "Prevention", color: "primary", icon: "shield", title: "Future", steps: ["Use disease-free seeds.", "Rotate with non-cruciferous crops."] }
    ]
  },
  {
    name: "Cauliflower Downy Mildew",
    pathogen: "Hyaloperonospora brassicae",
    severity: "Medium",
    confidence: 94.2,
    description: "Fungal infection appearing as yellow patches on leaf surfaces with white fluffy growth on undersides.",
    treatments: [
      { type: "Immediate", color: "danger", icon: "science", title: "Fungicide", steps: ["Apply Metalaxyl or Mancozeb.", "Spray every 10-14 days."] },
      { type: "Organic", color: "caution", icon: "eco", title: "Control", steps: ["Neem oil application.", "Remove weed hosts."] },
      { type: "Prevention", color: "primary", icon: "shield", title: "Future", steps: ["Plant resistant varieties.", "Ensure good air circulation."] }
    ]
  },
  {
    name: "Cauliflower Black Rot",
    pathogen: "Xanthomonas campestris",
    severity: "Critical",
    confidence: 98.1,
    description: "Systemic bacterial infection causing V-shaped yellow lesions on leaf margins and blackened veins.",
    treatments: [
      { type: "Immediate", color: "danger", icon: "science", title: "Chemical", steps: ["Copper hydroxide sprays.", "No cure for infected plants; remove them."] },
      { type: "Cultural", color: "caution", icon: "eco", title: "Sanitation", steps: ["Sanitize all tools.", "Deep plow crop debris."] },
      { type: "Prevention", color: "primary", icon: "shield", title: "Future", steps: ["Hot water seed treatment.", "3-year crop rotation."] }
    ]
  },

  // --- POTATO ---
  {
    name: "Potato Late Blight",
    pathogen: "Phytophthora infestans",
    severity: "Critical",
    confidence: 99.2,
    description: "Devastating disease causing large, dark brown blotches with green-gray edges on leaves and stems.",
    treatments: [
      { type: "Immediate", color: "danger", icon: "science", title: "Fungicide", steps: ["Apply Chlorothalonil or Mancozeb.", "Spray immediately upon detection."] },
      { type: "Cultural", color: "caution", icon: "eco", title: "Management", steps: ["Destroy cull piles.", "Kill vines 2 weeks before harvest."] },
      { type: "Prevention", color: "primary", icon: "shield", title: "Future", steps: ["Plant resistant varieties.", "Use certified seed potatoes."] }
    ]
  },

  // --- TOMATO ---
  {
    name: "Tomato Bacterial Spot",
    pathogen: "Xanthomonas spp.",
    severity: "High",
    confidence: 95.5,
    description: "Small, dark, water-soaked spots on leaves and fruit. Leaves may turn yellow and drop.",
    treatments: [
      { type: "Immediate", color: "danger", icon: "science", title: "Treatment", steps: ["Copper + Mancozeb mix.", "Apply at first sign of spotting."] },
      { type: "Cultural", color: "caution", icon: "eco", title: "Care", steps: ["Avoid working when wet.", "Stake plants to improve airflow."] },
      { type: "Prevention", color: "primary", icon: "shield", title: "Future", steps: ["Seed treatment with bleach.", "Rotate crops annually."] }
    ]
  },
  {
    name: "Tomato Early Blight",
    pathogen: "Alternaria solani",
    severity: "Medium",
    confidence: 96.8,
    description: "Concentric ring patterns (bullseye) in brown spots on lower leaves, causing yellowing.",
    treatments: [
      { type: "Immediate", color: "danger", icon: "science", title: "Fungicide", steps: ["Apply Azoxystrobin or Copper.", "Focus on lower leaves."] },
      { type: "Cultural", color: "caution", icon: "eco", title: "Pruning", steps: ["Remove lower branches.", "Mulch to prevent soil splash."] },
      { type: "Prevention", color: "primary", icon: "shield", title: "Future", steps: ["Drip irrigation.", "Provide ample nitrogen."] }
    ]
  },
  {
    name: "Tomato Mosaic Virus",
    pathogen: "Tobamovirus",
    severity: "High",
    confidence: 98.5,
    description: "Mottled light and dark green pattern on leaves. Leaves may be stunted or fern-like.",
    treatments: [
      { type: "Action", color: "danger", icon: "science", title: "Removal", steps: ["No chemical cure.", "Remove and burn infected plants."] },
      { type: "Hygiene", color: "caution", icon: "eco", title: "Sanitation", steps: ["Wash hands with milk/soap.", "Sterilize tools."] },
      { type: "Prevention", color: "primary", icon: "shield", title: "Future", steps: ["Resistant varieties.", "Control aphids (vectors)."] }
    ]
  },
  {
    name: "Tomato Septoria Leaf Spot",
    pathogen: "Septoria lycopersici",
    severity: "Medium",
    confidence: 93.9,
    description: "Circular spots with dark margins and gray centers appearing on lower leaves first.",
    treatments: [
      { type: "Immediate", color: "danger", icon: "science", title: "Fungicide", steps: ["Chlorothalonil spray.", "Repeat every 7-10 days."] },
      { type: "Cultural", color: "caution", icon: "eco", title: "Clean up", steps: ["Remove fallen leaves.", "Water at base only."] },
      { type: "Prevention", color: "primary", icon: "shield", title: "Future", steps: ["2-year rotation.", "Remove crop debris in winter."] }
    ]
  },
  {
    name: "Tomato Spider Mites",
    pathogen: "Tetranychus urticae",
    severity: "Low",
    confidence: 91.2,
    description: "Tiny pests causing stippling (yellow specks) on leaves. Fine webbing may be visible.",
    treatments: [
      { type: "Immediate", color: "danger", icon: "science", title: "Miticide", steps: ["Insecticidal soap.", "Neem oil application."] },
      { type: "Biological", color: "caution", icon: "eco", title: "Predators", steps: ["Release predatory mites.", "Spray with water jet."] },
      { type: "Prevention", color: "primary", icon: "shield", title: "Future", steps: ["Keep plants watered (mites like dry).", "Weed control."] }
    ]
  },
  {
    name: "Tomato Yellow Leaf Curl",
    pathogen: "Begomovirus",
    severity: "High",
    confidence: 97.7,
    description: "Leaves curl upward, turn yellow, and are crinkled. Plants become stunted.",
    treatments: [
      { type: "Vector", color: "danger", icon: "science", title: "Whitefly Control", steps: ["Imidacloprid (systemic).", "Reflective mulches."] },
      { type: "Physical", color: "caution", icon: "eco", title: "Barriers", steps: ["Fine mesh row covers.", "Yellow sticky traps."] },
      { type: "Prevention", color: "primary", icon: "shield", title: "Future", steps: ["Virus-free transplants.", "Weed management."] }
    ]
  }
];

// --- SEPARATED API CALL PLACEHOLDERS ---
const apiCalls = {
  // Model 1: ResNet-50
  analyzeWithResNet50: async (imageBlob: string): Promise<DiseaseResult> => {
    console.log("Connecting to ResNet-50 API Node...");
    // TODO: Replace with actual fetch call
    // const formData = new FormData();
    // formData.append('file', imageFile);
    // const response = await fetch('https://api.yoursite.com/model/resnet', { method: 'POST', body: formData });
    
    // Simulating Network Latency (~1.5s)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DISEASE_DB[Math.floor(Math.random() * DISEASE_DB.length)]);
      }, 1500);
    });
  },

  // Model 2: EfficientNet-B0
  analyzeWithEfficientNet: async (imageBlob: string): Promise<DiseaseResult> => {
    console.log("Connecting to EfficientNet-B0 API Node...");
    // Simulating Faster Latency (~800ms)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DISEASE_DB[Math.floor(Math.random() * DISEASE_DB.length)]);
      }, 800);
    });
  },

  // Model 3: DenseNet-121
  analyzeWithDenseNet: async (imageBlob: string): Promise<DiseaseResult> => {
    console.log("Connecting to DenseNet-121 API Node...");
    // Simulating Slower Latency (~2.2s)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DISEASE_DB[Math.floor(Math.random() * DISEASE_DB.length)]);
      }, 2200);
    });
  },

  // Model 4: Basic CNN
  analyzeWithCNN: async (imageBlob: string): Promise<DiseaseResult> => {
    console.log("Connecting to Basic CNN API Node...");
    // Simulating Fastest Latency (~400ms)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(DISEASE_DB[Math.floor(Math.random() * DISEASE_DB.length)]);
      }, 400);
    });
  }
};

type ModelType = 'resnet' | 'efficientnet' | 'densenet' | 'cnn';

const DashboardPage: React.FC<Props> = ({ onNavigate, onAnalysisComplete }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelType>('resnet');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFileSelected(true);
    }
  };

  const handleAnalyze = async () => {
    if (!fileSelected || !previewUrl) return; 
    setAnalyzing(true);
    
    // Start Performance Timer
    const startTime = performance.now();
    
    let result: DiseaseResult;

    try {
        // Route to the specific API based on selection
        switch (selectedModel) {
            case 'resnet':
                result = await apiCalls.analyzeWithResNet50(previewUrl);
                break;
            case 'efficientnet':
                result = await apiCalls.analyzeWithEfficientNet(previewUrl);
                break;
            case 'densenet':
                result = await apiCalls.analyzeWithDenseNet(previewUrl);
                break;
            case 'cnn':
                result = await apiCalls.analyzeWithCNN(previewUrl);
                break;
            default:
                result = await apiCalls.analyzeWithResNet50(previewUrl);
        }

        // End Performance Timer
        const endTime = performance.now();
        const durationInSeconds = ((endTime - startTime) / 1000).toFixed(2); // Calculate actual time taken

        // Add the uploaded image and actual time to the result
        const resultWithMeta = {
          ...result,
          image: previewUrl,
          processingTime: `${durationInSeconds}s`
        };
        
        onAnalysisComplete(resultWithMeta);

    } catch (error) {
        console.error("Analysis failed", error);
        setAnalyzing(false);
    }
  };

  return (
    <div className="bg-[#102216] min-h-screen flex flex-col relative overflow-x-hidden font-display text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[size:40px_40px]" style={{backgroundImage: "linear-gradient(to right, #316843 1px, transparent 1px), linear-gradient(to bottom, #316843 1px, transparent 1px)"}}></div>
      {/* Vignette */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#102216_100%)]"></div>

      {/* Header */}
      <header className="relative z-20 glass-panel border-b border-white/5 sticky top-0">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-3">
            <div className="text-primary animate-pulse">
              <span className="material-symbols-outlined text-3xl">eco</span>
            </div>
            <div className="text-left">
              <h1 className="text-white text-lg font-bold tracking-wider uppercase">Plant Disease <span className="text-primary font-normal">Detection</span></h1>
              <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase leading-none"> v1.0</p>
            </div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-[1400px] mx-auto w-full p-6 lg:p-8 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary text-xs tracking-widest uppercase font-bold">
              <span className="material-symbols-outlined text-sm">terminal</span>
              Diagnostic Protocol
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Analyze Specimen</h2>
            <p className="text-gray-400 max-w-xl">Upload high-resolution leaf imagery for real-time pathogen detection using our ensemble of neural networks.</p>
          </div>
          <div className="flex gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-gray-500 uppercase tracking-wider">GPU Status</p>
              <div className="flex items-center justify-end gap-2 text-primary text-sm font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                ONLINE / 98% IDLE
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 flex-1">
          {/* Left Column: Upload */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            
            <div 
                className={`flex-1 glass-panel rounded-2xl p-1 relative overflow-hidden group border border-primary/30 shadow-[0_0_30px_rgba(13,242,89,0.05)] cursor-pointer`}
                onClick={handleFileClick}
            >
              <div className="relative h-full w-full rounded-xl border-2 border-dashed border-primary/40 bg-black/20 flex flex-col items-center justify-center p-8 transition-all duration-300 hover:border-primary/80 hover:bg-black/30">
                {!fileSelected || !previewUrl ? (
                    <>
                        <div className="text-center space-y-6 z-10">
                        <div className="relative mx-auto size-24 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-5xl text-primary drop-shadow-[0_0_10px_rgba(13,242,89,0.5)]">add_a_photo</span>
                            <div className="absolute inset-0 rounded-full border border-primary/30 border-t-transparent animate-spin" style={{animationDuration: '3s'}}></div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">Select Leaf Image</h3>
                            <p className="text-gray-400 text-sm">Supported formats: JPG, PNG, TIFF (Max 25MB)</p>
                        </div>
                        <button className="bg-surface-dark hover:bg-primary hover:text-[#102216] text-white border border-primary/30 px-6 py-3 rounded-lg font-medium tracking-wide transition-all duration-300 flex items-center gap-2 mx-auto group/btn">
                            <span className="material-symbols-outlined group-hover/btn:animate-bounce">folder_open</span>
                            BROWSE DEVICE
                        </button>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 blur-[2px] animate-[scan_4s_ease-in-out_infinite]"></div>
                    </>
                ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                         <img src={previewUrl} className="max-h-full max-w-full rounded-lg shadow-2xl object-contain" alt="Selected leaf" />
                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="text-primary font-mono text-xl bg-black/80 px-4 py-2 rounded">
                                {analyzing ? 'PROCESSING...' : 'READY FOR ANALYSIS'}
                            </div>
                         </div>
                    </div>
                )}
              </div>
            </div>

            {/* Queue Item */}
            {fileSelected && (
                <div className="glass-panel rounded-xl p-4 border border-white/5 animate-in slide-in-from-bottom fade-in duration-500">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm uppercase tracking-wider text-gray-400 font-bold">Analysis Queue</h4>
                    <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">1 Item Ready</span>
                </div>
                <div className="flex items-center gap-4 bg-surface-dark/50 p-3 rounded-lg border border-white/5 hover:border-primary/30 transition-colors group">
                    <div className="size-16 rounded-md bg-cover bg-center relative overflow-hidden" style={{backgroundImage: `url('${previewUrl}')`}}>
                    <div className="absolute inset-0 bg-primary/20 hidden group-hover:flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-lg">zoom_in</span>
                    </div>
                    </div>
                    <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">Selected Specimen</p>
                    <p className="text-xs text-gray-500">Ready for upload</p>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setFileSelected(false);
                        setPreviewUrl(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }} 
                      className="text-gray-500 hover:text-red-400 p-2 transition-colors" 
                      title="Remove"
                    >
                    <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                </div>
            )}
          </div>

          {/* Right Column: Models */}
          <div className="lg:col-span-4 flex flex-col gap-6 h-full">
            <div className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col h-full">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">psychology</span>
                Select Neural Network
              </h3>
              <div className="flex flex-col gap-4 flex-1">
                <ModelOption 
                    name="ResNet-50" acc="98.5%" lat="45ms" icon="grid_view" 
                    selected={selectedModel === 'resnet'} 
                    onClick={() => setSelectedModel('resnet')} 
                />
                <ModelOption 
                    name="EfficientNet-B0" acc="96.2%" lat="12ms" icon="speed" 
                    selected={selectedModel === 'efficientnet'} 
                    onClick={() => setSelectedModel('efficientnet')} 
                />
                <ModelOption 
                    name="DenseNet-121" acc="97.8%" lat="68ms" icon="layers" 
                    selected={selectedModel === 'densenet'} 
                    onClick={() => setSelectedModel('densenet')} 
                />
                <ModelOption 
                    name="CNN Basic" acc="89.4%" lat="15ms" icon="view_in_ar" lowConf 
                    selected={selectedModel === 'cnn'} 
                    onClick={() => setSelectedModel('cnn')} 
                />
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <button 
                  onClick={handleAnalyze}
                  disabled={analyzing || !fileSelected}
                  className={`w-full relative overflow-hidden group bg-primary hover:bg-[#0be050] text-[#102216] font-black uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(13,242,89,0.4)] transition-all duration-300 transform active:scale-[0.98] ${(!fileSelected || analyzing) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {!analyzing ? (
                        <>
                             <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                            <span className="relative flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">network_intelligence</span>
                                Analyze Image
                            </span>
                        </>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined animate-spin">refresh</span>
                            Processing...
                        </span>
                    )}
                </button>
                <p className="text-center text-xs text-gray-500 mt-3 font-mono">
                    Estimated time: {
                        selectedModel === 'resnet' ? '~1.5s' :
                        selectedModel === 'efficientnet' ? '~0.8s' :
                        selectedModel === 'densenet' ? '~2.2s' : '~0.4s'
                    }
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Status */}
      <footer className="relative z-20 border-t border-white/5 bg-[#0d1c12] py-2 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center text-[10px] sm:text-xs text-gray-500 font-mono uppercase tracking-wider">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary"></span>
              Database: Connected
            </span>
          </div>
          <div> 2026 Plant Disease Detection. </div>
        </div>
      </footer>
    </div>
  );
};

const ModelOption: React.FC<{name: string, acc: string, lat: string, icon: string, selected: boolean, onClick: () => void, lowConf?: boolean}> = ({name, acc, lat, icon, selected, onClick, lowConf}) => (
  <label className="cursor-pointer group relative" onClick={onClick}>
    <input type="radio" name="model" className="peer sr-only" checked={selected} readOnly />
    <div className={`p-4 rounded-xl bg-surface-dark border ${selected ? 'border-primary bg-primary/5 shadow-[0_0_15px_rgba(13,242,89,0.1)]' : 'border-white/10'} transition-all duration-300 hover:border-white/20`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className={`material-symbols-outlined ${selected ? 'text-primary' : 'text-gray-400'} group-hover:text-white`}>{icon}</span>
          <span className={`font-bold ${selected ? 'text-white' : 'text-white'} group-hover:text-primary transition-colors`}>{name}</span>
        </div>
        <span className={`size-3 rounded-full border ${selected ? 'bg-primary border-primary shadow-[0_0_8px_#0df259]' : 'border-gray-600'}`}></span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs font-mono mt-3">
        <div className="text-gray-500">ACCURACY</div>
        <div className={`text-right font-bold ${lowConf ? 'text-yellow-500' : 'text-primary'}`}>{acc}</div>
        <div className="text-gray-500">LATENCY</div>
        <div className="text-right text-white">{lat}</div>
      </div>
    </div>
  </label>
);

export default DashboardPage;