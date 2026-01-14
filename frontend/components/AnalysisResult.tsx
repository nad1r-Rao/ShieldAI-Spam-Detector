import React from 'react';
import Card from './ui/Card';

interface AnalysisResultProps {
    text: string;
    result: any;
}

export default function AnalysisResult({ text, result }: AnalysisResultProps) {
    if (!result) return null;

    const { analysis, prediction, is_above_threshold } = result;
    const isSpam = is_above_threshold;

    // Highlighting logic for detected keywords
    const highlightText = (content: string, keywords: string[]) => {
        if (!keywords || keywords.length === 0) return content;

        const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
        const parts = content.split(regex);

        return parts.map((part, i) =>
            keywords.some(k => k.toLowerCase() === part.toLowerCase()) ? (
                <span
                    key={i}
                    className="bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded border border-red-500/40 font-semibold"
                >
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <Card
            className={`transition-all duration-500`}
            style={{
                boxShadow: isSpam
                    ? '0 0 50px rgba(239, 68, 68, 0.2), inset 0 0 0 1px rgba(239, 68, 68, 0.3)'
                    : '0 0 30px rgba(16, 185, 129, 0.1), inset 0 0 0 1px rgba(16, 185, 129, 0.3)',
                marginBottom: '2rem', // Ensure space below
            }}
        >

            {/* Header with Badge */}
            <div className={`px-6 py-4 border-b flex items-center justify-between ${isSpam ? 'bg-red-500/5 border-red-500/20' : 'bg-emerald-500/5 border-emerald-500/20'
                }`}>
                <div className="flex items-center gap-3">
                    {/* Icon */}
                    {isSpam ? (
                        <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center border border-red-500/30">
                            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                    ) : (
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/30">
                            <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    )}

                    <div>
                        <h3 className={`text-lg font-bold uppercase tracking-wider ${isSpam ? 'text-red-400' : 'text-emerald-400'
                            }`}>
                            {prediction} DETECTED
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">
                            {analysis?.message || 'Analysis complete'}
                        </p>
                    </div>
                </div>

                {/* Risk Badge */}
                <div className={`px-4 py-1.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider ${isSpam
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                    {analysis?.risk_level || (isSpam ? 'HIGH' : 'LOW')} RISK
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/50">
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-mono mb-1">
                            Processing Time
                        </div>
                        <div className="text-lg font-mono text-cyan-400">
                            {result.processing_time || 'N/A'}
                        </div>
                    </div>

                    <div className="bg-slate-900/40 rounded-lg p-4 border border-slate-700/50">
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-mono mb-1">
                            Confidence
                        </div>
                        <div className="text-lg font-mono text-cyan-400">
                            {((result.probability || 0) * 100).toFixed(1)}%
                        </div>
                    </div>
                </div>

                {/* Detected Keywords */}
                {analysis?.highlighted_words && analysis.highlighted_words.length > 0 && (
                    <div>
                        <h4 className="text-xs uppercase text-slate-400 mb-3 tracking-wider font-mono">
                            Detected Keywords
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {analysis.highlighted_words.map((keyword: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-red-500/10 text-red-300 rounded-md text-sm font-mono border border-red-500/30"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Message Preview with Highlights */}
                <div>
                    <h4 className="text-xs uppercase text-slate-400 mb-3 tracking-wider font-mono">
                        Message Analysis
                    </h4>
                    <div className="bg-slate-950/80 rounded-lg p-4 border border-slate-800">
                        <div className="text-sm text-slate-300 font-mono leading-relaxed whitespace-pre-wrap break-words">
                            {highlightText(text, analysis?.highlighted_words || [])}
                        </div>
                    </div>
                </div>

            </div>
        </Card>
    );
}

