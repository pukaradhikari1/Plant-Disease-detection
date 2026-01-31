import React from 'react';
import { NavBar } from './NavBar';
import type { ViewState } from '../App';

interface Props {
  onNavigate: (view: ViewState) => void;
}

const WorkflowPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="bg-background-light dark:bg-[#050b07] min-h-screen flex flex-col font-display text-white">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern bg-[size:40px_40px] z-0"></div>
      {/* Decorative Green Glows */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar onNavigate={onNavigate} activeView="workflow" />

        {/* Page Heading */}
        <section className="pt-32 pb-10 px-6 text-center relative">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              System Architecture
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              Technical Workflow
            </h1>
            <p className="text-lg text-white/60 max-w-2xl font-light">
              Deep Learning Pipeline for Precision Agriculture. From raw image acquisition to real-time disease diagnosis using advanced CNN architectures.
            </p>
          </div>
        </section>

        {/* Vertical Timeline Section */}
        <section className="py-12 px-6 flex-grow">
          <div className="max-w-6xl mx-auto relative">
            {/* Central Glowing Line (Desktop) */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-ml-[0.5px] bg-gradient-to-b from-transparent via-primary/50 to-transparent h-full z-0 hidden md:block"></div>
            {/* Line for Mobile */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent h-full z-0 md:hidden"></div>

            {/* Step 1: Image Acquisition */}
            <div className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-24 group">
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050b07] border-2 border-primary shadow-[0_0_15px_rgba(13,242,89,0.4)] z-10 flex items-center justify-center text-xs font-bold text-primary">01</div>
              <div className="pl-16 md:pl-0 md:text-right md:pr-10 order-1">
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center md:justify-end gap-2">
                  Image Acquisition
                  <span className="material-symbols-outlined text-primary">database</span>
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  We source high-resolution imagery from the PlantVillage dataset, comprising over 50,000 labeled images across 38 distinct plant-disease classes. This diverse dataset ensures robust model generalization.
                </p>
                <div className="flex md:justify-end gap-3">
                  <span className="px-3 py-1 rounded bg-surface-dark border border-surface-border text-xs text-primary/80">~20,000 Images</span>
                  <span className="px-3 py-1 rounded bg-surface-dark border border-surface-border text-xs text-primary/80">3 Classes</span>
                </div>
              </div>
              <div className="pl-16 md:pl-10 order-2">
                <div className="bg-surface-dark/60 backdrop-blur-md border border-surface-border rounded-xl p-5 hover:border-primary/50 transition-colors shadow-lg">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">dataset</span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">PlantVillage Dataset</div>
                        <div className="text-xs text-white/50">Version 2.0 • Public Access</div>
                      </div>
                    </div>
                    <div className="text-primary text-xs font-mono">STATUS: CONNECTED</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                     <ImageThumb url="https://images.pexels.com/photos/86397/leaf-individually-linde-lipovina-86397.jpeg" />
                     <ImageThumb url="https://images.pexels.com/photos/34908608/pexels-photo-34908608.jpeg?cs=srgb&dl=pexels-f-2154796291-34908608.jpg&fm=jpg" />
                     <ImageThumb url="https://t4.ftcdn.net/jpg/16/41/65/95/360_F_1641659561_G574C5v5cUn04ihqMdoL8mAwmw3jnxa2.jpg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Preprocessing */}
            <div className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-24 group">
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050b07] border-2 border-primary shadow-[0_0_15px_rgba(13,242,89,0.4)] z-10 flex items-center justify-center text-xs font-bold text-primary">02</div>
              <div className="pl-16 md:pl-0 md:pr-10 order-2 md:order-1">
                <div className="bg-surface-dark/60 backdrop-blur-md border border-surface-border rounded-xl p-6 hover:border-primary/50 transition-colors shadow-lg relative overflow-hidden">
                   <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                   <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="p-2 bg-primary/20 rounded text-primary"><span className="material-symbols-outlined">aspect_ratio</span></div>
                        <div><h4 className="text-sm font-bold text-white">Resizing</h4><p className="text-xs text-white/50 mt-1">Input images standardized to 256x256 pixels.</p></div>
                      </div>
                      <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="p-2 bg-primary/20 rounded text-primary"><span className="material-symbols-outlined">query_stats</span></div>
                        <div><h4 className="text-sm font-bold text-white">Normalization</h4><p className="text-xs text-white/50 mt-1">Z-score standardization applied to pixel intensity values.</p></div>
                      </div>
                      <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="p-2 bg-primary/20 rounded text-primary"><span className="material-symbols-outlined">control_camera</span></div>
                        <div><h4 className="text-sm font-bold text-white">Augmentation</h4><p className="text-xs text-white/50 mt-1">Random rotation, horizontal flip, and shear transformations.</p></div>
                      </div>
                   </div>
                </div>
              </div>
              <div className="pl-16 md:pl-10 order-1 md:order-2">
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">memory</span>
                  Preprocessing
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  Raw images undergo rigorous transformation pipelines to maximize model convergence. We handle varying lighting conditions and orientations through data augmentation techniques, effectively tripling our training dataset size.
                </p>
                <div className="w-full bg-surface-dark border border-white/10 rounded-full h-2 mt-4 overflow-hidden">
                  <div className="h-full bg-primary w-3/4 shadow-[0_0_10px_#0df259]"></div>
                </div>
                <div className="flex justify-between text-xs text-primary mt-1 font-mono">
                  <span>Processing Pipeline</span>
                  <span>READY</span>
                </div>
              </div>
            </div>

            {/* Step 3: Model Selection */}
            <div className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-start mb-24 group">
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050b07] border-2 border-primary shadow-[0_0_15px_rgba(13,242,89,0.4)] z-10 flex items-center justify-center text-xs font-bold text-primary">03</div>
              <div className="pl-16 md:pl-0 md:text-right md:pr-10 order-1 pt-4">
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center md:justify-end gap-2">
                  Model Selection
                  <span className="material-symbols-outlined text-primary">hub</span>
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  We evaluated multiple state-of-the-art CNN architectures. EfficientNet-B0 was selected for deployment due to its superior balance of accuracy (99.2%) and inference speed on edge devices.
                </p>
                <div className="inline-flex flex-col gap-2 md:items-end">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <span className="w-3 h-3 rounded-sm bg-primary/20 border border-primary"></span> Selected Architecture
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <span className="w-3 h-3 rounded-sm bg-white/5 border border-white/20"></span> Benchmarked
                  </div>
                </div>
              </div>
              <div className="pl-16 md:pl-10 order-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ModelCard name="ResNet50" acc="96.4%" width="96%" />
                  <ModelCard name="EfficientNet" acc="99.2%" width="99%" selected />
                  <ModelCard name="DenseNet121" acc="97.1%" width="97%" />
                  <ModelCard name="MobileNetV2" acc="94.8%" width="94%" />
                </div>
              </div>
            </div>

            {/* Step 4: AI Inference */}
            <div className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-center mb-24 group">
               <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050b07] border-2 border-primary shadow-[0_0_15px_rgba(13,242,89,0.4)] z-10 flex items-center justify-center text-xs font-bold text-primary">04</div>
               <div className="pl-16 md:pl-0 md:pr-10 order-2 md:order-1">
                  <div className="relative rounded-xl overflow-hidden border border-primary/30 shadow-[0_0_30px_rgba(13,242,89,0.15)] aspect-video group/scan">
                    <img alt="Scanning" className="w-full h-full object-cover opacity-80" src="https://vegpath.plantpath.wisc.edu/wp-content/uploads/sites/210/2023/11/potato-early-blight-leaves.jpg" />
                    <div className="absolute inset-0 bg-background-dark/30"></div>
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-primary shadow-[0_0_20px_#0df259,0_0_10px_#0df259] z-20 opacity-80"></div>
                    <div className="absolute top-1/2 left-0 w-full h-24 -translate-y-full bg-gradient-to-t from-primary/20 to-transparent z-10"></div>
                    <div className="absolute top-4 left-4 flex flex-col gap-1">
                       <span className="text-[10px] font-mono text-primary bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm border border-primary/30">CONFIDENCE: CALCULATING...</span>
                       <span className="text-[10px] font-mono text-white/70 bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm">R-REGION: [234, 45, 112, 88]</span>
                    </div>
                    <div className="absolute top-[30%] left-[40%] w-[30%] h-[40%] border border-primary/80 border-dashed rounded bg-primary/5 flex items-end justify-end p-1">
                       <div className="w-1.5 h-1.5 bg-primary"></div>
                    </div>
                  </div>
               </div>
               <div className="pl-16 md:pl-10 order-1 md:order-2">
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">qr_code_scanner</span>
                    AI Inference
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    The trained model analyzes the leaf's surface texture and coloration patterns. It segments regions of interest and extracts feature vectors to map against known disease profiles in milliseconds.
                  </p>
                  <div className="flex gap-4 mt-2">
                    <div className="flex flex-col"><span className="text-2xl font-bold text-white">45ms</span><span className="text-xs text-white/40 uppercase">Latency</span></div>
                    <div className="w-px bg-white/10"></div>
                    <div className="flex flex-col"><span className="text-2xl font-bold text-white">Local</span><span className="text-xs text-white/40 uppercase">Processing</span></div>
                  </div>
               </div>
            </div>

            {/* Step 5: Diagnosis Output */}
            <div className="relative flex flex-col items-center group pb-24">
               <div className="absolute left-6 md:left-1/2 -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-primary border-4 border-[#050b07] shadow-[0_0_25px_rgba(13,242,89,0.8)] z-10 flex items-center justify-center text-[#050b07]">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
               </div>
               <div className="mt-12 w-full max-w-2xl px-6 md:px-0">
                  <div className="bg-surface-dark/80 backdrop-blur-xl border border-primary/30 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(13,242,89,0.05)] relative overflow-hidden">
                     <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 blur-[60px] rounded-full pointer-events-none"></div>
                     <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <div className="relative w-32 h-32 flex-shrink-0">
                           <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                              <path className="text-surface-dark border-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"></path>
                              <path className="text-primary drop-shadow-[0_0_5px_rgba(13,242,89,0.8)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="98, 100" strokeWidth="2"></path>
                           </svg>
                           <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                              <span className="text-2xl font-bold text-white">98%</span>
                              <span className="text-[10px] text-white/50 uppercase tracking-wide">Confidence</span>
                           </div>
                        </div>
                        <div className="flex-grow w-full">
                           <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-bold text-white">Early Blight Detected</h3>
                              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider">Attention Needed</span>
                           </div>
                           <p className="text-white/60 text-sm mb-6 border-b border-white/10 pb-4">
                              Fungal infection caused by <em>Alternaria solani</em>. Common in tomato and potato crops under high humidity conditions.
                           </p>
                           <div>
                              <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                                 <span className="material-symbols-outlined text-sm">medical_services</span> Recommended Treatment
                              </h4>
                              <ul className="space-y-2">
                                 <li className="flex items-start gap-3 text-sm text-white/80 bg-white/5 p-2 rounded">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span> Apply copper-based fungicides or Chlorothalonil immediately.
                                 </li>
                                 <li className="flex items-start gap-3 text-sm text-white/80 bg-white/5 p-2 rounded">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span> Remove and destroy infected lower leaves to improve airflow.
                                 </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </section>
        
        <footer className="border-t border-white/5 bg-[#050b07] py-10 px-6 mt-10">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 text-white/50">
                 <span className="material-symbols-outlined">eco</span>
                 <span className="font-bold text-sm tracking-wide">PLANT DISEASE DETECTION AI</span>
              </div>
              <div className="text-xs text-white/30">
                 Powered by TensorFlow & PlantVillage.
              </div>
           </div>
        </footer>
      </div>
    </div>
  );
};

const ImageThumb: React.FC<{url: string}> = ({url}) => (
  <div 
    className="aspect-square rounded bg-cover bg-center relative group/img overflow-hidden cursor-pointer" 
    style={{backgroundImage: `url('${url}')`}}
  >
    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
      <span className="material-symbols-outlined text-white">check_circle</span>
    </div>
  </div>
);

const ModelCard: React.FC<{name: string, acc: string, width: string, selected?: boolean}> = ({name, acc, width, selected}) => (
  <div className={`${selected ? 'bg-primary/10 border border-primary/50 shadow-[0_0_20px_rgba(13,242,89,0.1)]' : 'bg-surface-dark/40 border border-white/10 hover:bg-surface-dark/60'} rounded-lg p-4 relative overflow-hidden transition-colors`}>
    {selected && (
      <div className="absolute top-0 right-0 p-1 bg-primary text-[#050b07]">
        <span className="material-symbols-outlined text-[14px]">check</span>
      </div>
    )}
    <div className={`text-xs font-mono ${selected ? 'text-primary' : 'text-white/40'} mb-1`}>{selected ? 'ARCH-02' : 'ARCH-XX'}</div>
    <div className="text-lg font-bold text-white mb-2">{name}</div>
    <div className="flex justify-between items-end">
      <div className="text-xs text-white/50">Accuracy</div>
      <div className={`text-sm font-bold ${selected ? 'text-primary' : 'text-white'}`}>{acc}</div>
    </div>
    <div className="w-full bg-white/10 h-1 mt-1 rounded-full">
      <div className={`h-full rounded-full ${selected ? 'bg-primary shadow-[0_0_10px_#0df259]' : 'bg-white/40'}`} style={{width: width}}></div>
    </div>
  </div>
);

export default WorkflowPage;