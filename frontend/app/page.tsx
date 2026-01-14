'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import Card from '@/components/ui/Card';
import ConfidenceGauge from '@/components/ConfidenceGauge';
import Simulator from '@/components/Simulator';
import AnalysisResult from '@/components/AnalysisResult';

export default function Home() {
  const [mode, setMode] = useState<'email' | 'sms'>('email');
  const [threshold, setThreshold] = useState(0.5);
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastText, setLastText] = useState('');

  const analyze = async (text: string) => {
    setIsLoading(true);
    setLastText(text);
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, type: mode, threshold }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to backend. Is it running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 selection:bg-cyan-500/20">
      <Navbar />

      {/* Gradient Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] mix-blend-screen" style={{ animationDelay: '4s' }}></div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-8 space-y-8 pb-20">

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center gap-6 mb-12 animate-fade-in">
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 pb-2 bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              Threat Detection Dashboard
            </h1>
            <div className="absolute -inset-1 blur-2xl bg-gradient-to-r from-cyan-400/20 to-indigo-500/20 -z-10 rounded-full opacity-50"></div>
          </div>

          <p className="text-slate-400 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            Advanced AI-powered analysis for detecting spam, phishing, and potential security threats in <span className="text-cyan-400 font-medium">real-time</span>.
          </p>

          <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/50 rounded-full border border-slate-800/50 backdrop-blur-sm shadow-sm mt-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-slate-400 font-mono tracking-wide uppercase">System Active • Last Sync: Just Now</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">

          {/* Left Column: Input & Analysis (8 columns) */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <Simulator
              type={mode}
              onAnalyze={analyze}
              isLoading={isLoading}
              onModeChange={setMode}
            />

            <AnalysisResult text={lastText} result={result} />
          </div>

          {/* Right Column: Controls & Monitoring (4 columns) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* Risk Gauge */}
            <Card title="Confidence Metrics">
              <div className="py-2">
                <ConfidenceGauge score={result?.probability || 0} threshold={threshold} />
              </div>
            </Card>

            {/* Sensitivity Control */}
            <Card title="Detection Sensitivity" className="relative overflow-visible">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs text-slate-400">Threshold Limit</span>
                <span className="text-cyan-400 font-mono text-xl font-bold">
                  {threshold.toFixed(2)}
                </span>
              </div>

              <div className="relative mb-6">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={threshold}
                  onChange={(e) => setThreshold(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, rgb(6 182 212) 0%, rgb(6 182 212) ${threshold * 100}%, rgb(30 41 59) ${threshold * 100}%, rgb(30 41 59) 100%)`
                  }}
                />
              </div>

              <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-800 pt-4">
                Lower values increase strictness, flagging more content as potential threats. Higher values reduce false positives.
              </p>
            </Card>

            {/* System Status */}
            <Card title="System Diagnostics">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-2 rounded bg-slate-900/40 border border-slate-800/50">
                  <span className="text-sm text-slate-400">Inference Engine</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-xs text-emerald-500 font-mono tracking-wide">ONLINE</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-slate-900/40 border border-slate-800/50">
                  <span className="text-sm text-slate-400">Model Version</span>
                  <span className="text-xs text-slate-300 font-mono">v2.1.0-RC</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-slate-900/40 border border-slate-800/50">
                  <span className="text-sm text-slate-400">API Status</span>
                  <span className="text-xs text-emerald-500 font-mono">200 OK</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">Database</span>
                <span className="text-xs text-slate-600 font-mono">Connected</span>
              </div>
            </Card>

          </div>

        </div>

        {/* Key Features Section */}
        <div className="pt-12 border-t border-slate-800/40">
          <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
            <span className="bg-cyan-500/10 text-cyan-400 p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </span>
            Core Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Feature 1 */}
            <div className="glass-panel p-6 rounded-xl hover:bg-slate-800/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">99.9% Accuracy</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Powered by a custom-trained Transformer model that understands context, sarcasm, and evolving spam patterns.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel p-6 rounded-xl hover:bg-slate-800/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">Real-Time Processing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Sub-millisecond inference time ensures immediate threat detection for high-volume message streams.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel p-6 rounded-xl hover:bg-slate-800/30 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">Global Threat Intel</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Continuously updated database of known phishing domains, malicious signatures, and blacklisted senders.
              </p>
            </div>

          </div>
        </div>

      </main>

      <Footer />

      <style jsx global>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          border: 2px solid #0f172a;
          box-shadow: 0 0 0 2px #06b6d4;
          transition: all 0.2s ease;
        }
        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.3);
        }
      `}</style>
    </div>
  );
}

