import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="glass-panel border-b-0 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <svg className="w-5 h-5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white">
                        Shield<span className="text-cyan-400">AI</span>
                    </span>
                </div>

                {/* Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="#" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Dashboard</Link>
                    <Link href="#" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Analysis History</Link>
                    <Link href="#" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Settings</Link>
                </div>

                {/* User Profile / Status */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-medium text-emerald-500 uppercase tracking-wide">System Online</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                        <span className="text-xs font-bold">JD</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
