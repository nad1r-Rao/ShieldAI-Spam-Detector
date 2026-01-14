export default function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-950/80 backdrop-blur-md py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} ShieldAI Defense Systems. All rights reserved.
                </div>
                <div className="flex items-center gap-6">
                    <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">Privacy Policy</a>
                    <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">Terms of Service</a>
                    <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">Support</a>
                </div>
            </div>
        </footer>
    );
}
