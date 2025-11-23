import { Flame, LogOut } from 'lucide-react';

export default function Header({ user, onLogout }) {
    return (
        <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
                    <Flame className="text-white" size={20} />
                </div>
                <div>
                    <h1 className="text-white font-bold">CalorieVision</h1>
                    <p className="text-emerald-200 text-sm">Bonjour, {user?.name}</p>
                </div>
            </div>
            <button
                onClick={onLogout}
                className="p-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition"
            >
                <LogOut size={20} />
            </button>
        </header>
    );
}
