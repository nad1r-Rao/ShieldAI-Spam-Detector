import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    action?: React.ReactNode;
    style?: React.CSSProperties;
}

export default function Card({ children, className = '', title, action, style }: CardProps) {
    return (
        <div className={`glass-panel rounded-xl overflow-hidden ${className}`} style={style}>
            {(title || action) && (
                <div className="px-6 py-4 border-b border-slate-800/50 flex justify-between items-center bg-slate-900/30">
                    {title && (
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono">
                            {title}
                        </h3>
                    )}
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
}
