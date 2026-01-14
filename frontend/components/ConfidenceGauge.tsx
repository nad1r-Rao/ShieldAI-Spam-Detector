import React from 'react';

interface ConfidenceGaugeProps {
    score: number; // 0 to 1
    threshold: number;
}

export default function ConfidenceGauge({ score, threshold }: ConfidenceGaugeProps) {
    const radius = 70;
    const stroke = 12;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (score * circumference);

    // Determine risk level and color
    let color = 'text-emerald-400';
    let glowColor = 'rgba(52, 211, 153, 0.4)';
    let riskLevel = 'LOW';

    if (score >= threshold) {
        color = 'text-red-400';
        glowColor = 'rgba(248, 113, 113, 0.4)';
        riskLevel = 'HIGH';
    } else if (score >= threshold * 0.6) {
        color = 'text-yellow-400';
        glowColor = 'rgba(250, 204, 21, 0.4)';
        riskLevel = 'MEDIUM';
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {/* SVG Gauge */}
            <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    {/* Background Ring */}
                    <circle
                        className="text-slate-800"
                        strokeWidth={stroke}
                        stroke="currentColor"
                        fill="transparent"
                        r={normalizedRadius}
                        cx="80"
                        cy="80"
                    />

                    {/* Progress Ring with Glow */}
                    <circle
                        className={`${color} transition-all duration-1000 ease-out`}
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={normalizedRadius}
                        cx="80"
                        cy="80"
                        style={{
                            filter: `drop-shadow(0 0 8px ${glowColor})`
                        }}
                    />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className={`text-5xl font-bold font-mono ${color} mb-1`}>
                        {(score * 100).toFixed(1)}
                        <span className="text-2xl">%</span>
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-mono">
                        Risk Score
                    </div>
                </div>
            </div>

            {/* Risk Level Badge */}
            <div className="mt-6 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${color.replace('text-', 'bg-')} animate-pulse`}></div>
                <span className={`text-sm font-semibold uppercase tracking-wider font-mono ${color}`}>
                    {riskLevel} RISK
                </span>
            </div>

            {/* Threshold Indicator */}
            <div className="mt-4 w-full">
                <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                    <span>Threshold</span>
                    <span className="font-mono text-cyan-400">{(threshold * 100).toFixed(0)}%</span>
                </div>
                <div className="relative h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="absolute left-0 top-0 h-full bg-cyan-500/30"
                        style={{ width: `${threshold * 100}%` }}
                    ></div>
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3 bg-cyan-400"
                        style={{ left: `${threshold * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
