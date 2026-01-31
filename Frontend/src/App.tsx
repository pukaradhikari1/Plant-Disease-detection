import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import WorkflowPage from './components/WorkflowPage';
import DashboardPage from './components/DashboardPage';
import ResultsPage from './components/ResultsPage';

export type ViewState = 'landing' | 'about' | 'workflow' | 'dashboard' | 'results';

// Define the shape of our disease data
export interface DiseaseResult {
  name: string;
  pathogen: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  confidence: number;
  description: string;
  treatments: {
    type: string;
    title: string;
    icon: string;
    color: string;
    steps: string[];
  }[];
  image?: string; // To carry the uploaded image to results
  processingTime?: string; // Actual time taken for analysis
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [analysisResult, setAnalysisResult] = useState<DiseaseResult | null>(null);

  const handleAnalysisComplete = (result: DiseaseResult) => {
    setAnalysisResult(result);
    setCurrentView('results');
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentView} />;
      case 'about':
        return <AboutPage onNavigate={setCurrentView} />;
      case 'workflow':
        return <WorkflowPage onNavigate={setCurrentView} />;
      case 'dashboard':
        return <DashboardPage onNavigate={setCurrentView} onAnalysisComplete={handleAnalysisComplete} />;
      case 'results':
        return <ResultsPage onNavigate={setCurrentView} result={analysisResult} />;
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
    </div>
  );
};

export default App;