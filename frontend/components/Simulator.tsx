import React, { useState } from 'react';
import Card from './ui/Card';

interface SimulatorProps {
    type: 'email' | 'sms';
    onAnalyze: (text: string) => void;
    isLoading: boolean;
    onModeChange?: (mode: 'email' | 'sms') => void;
}

export default function Simulator({ type, onAnalyze, isLoading, onModeChange }: SimulatorProps) {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [smsText, setSmsText] = useState('');

    const handleAnalyze = () => {
        const text = type === 'email' ? `${subject} ${body}` : smsText;
        if (!text.trim()) return;
        onAnalyze(text);
    };

    const handleTabChange = (newMode: 'email' | 'sms') => {
        if (onModeChange) {
            onModeChange(newMode);
        }
    };

    return (
        <Card className="flex flex-col" title="Threat Simulation Console">

            {/* Mode Switcher */}
            <div className="flex bg-slate-950/50 p-1 rounded-lg border border-slate-800/50 mb-6">
                <button
                    onClick={() => handleTabChange('email')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-all ${type === 'email'
                        ? 'bg-slate-800 text-cyan-400 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Analysis
                </button>
                <button
                    onClick={() => handleTabChange('sms')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-all ${type === 'sms'
                        ? 'bg-slate-800 text-cyan-400 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                        }`}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    SMS Analysis
                </button>
            </div>

            {/* Input Area */}
            <div className="space-y-4 flex-1">
                {type === 'email' ? (
                    <>
                        <div>
                            <label className="block text-xs font-semibold uppercase text-slate-500 mb-2 tracking-wider">
                                Subject Line
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Urgent Request: Update Password"
                                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase text-slate-500 mb-2 tracking-wider">
                                Email Body
                            </label>
                            <textarea
                                placeholder="Paste the email content here for analysis..."
                                className="w-full h-48 bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all resize-none font-mono leading-relaxed"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                        </div>
                    </>
                ) : (
                    <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 mb-2 tracking-wider">
                            SMS Content
                        </label>
                        <textarea
                            placeholder="Paste the SMS message here..."
                            className="w-full h-64 bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all resize-none font-mono leading-relaxed"
                            value={smsText}
                            onChange={(e) => setSmsText(e.target.value)}
                        />
                    </div>
                )}
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-6 border-t border-slate-800/50 flex justify-between items-center">
                <div className="text-xs text-slate-500">
                    <span className="block">Analysis Engine: <span className="text-emerald-500">Ready</span></span>
                    <span className="block mt-1">Latency: <span className="text-slate-400">~24ms</span></span>
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="relative group overflow-hidden pl-6 pr-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-lg transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                PROCESSING...
                            </>
                        ) : (
                            <>
                                <span>RUN ANALYSIS</span>
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </>
                        )}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
            </div>
        </Card>
    );
}

