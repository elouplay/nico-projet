import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterForm({ onRegister, error }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dailyGoal: 2000,
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(formData);
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="text-emerald-200 text-sm mb-1 block">Nom</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400"
                    placeholder="Votre nom"
                />
            </div>
            <div>
                <label className="text-emerald-200 text-sm mb-1 block">Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400"
                    placeholder="votre@email.com"
                />
            </div>
            <div>
                <label className="text-emerald-200 text-sm mb-1 block">Mot de passe</label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 pr-12"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>
            <div>
                <label className="text-emerald-200 text-sm mb-1 block">
                    Objectif quotidien (kcal)
                </label>
                <input
                    type="number"
                    value={formData.dailyGoal}
                    onChange={(e) =>
                        setFormData({ ...formData, dailyGoal: parseInt(e.target.value) || 2000 })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400"
                />
            </div>
            <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition"
            >
                S'inscrire
            </button>
        </div>
    );
}
