import { useState, useEffect } from 'react';
import { Trash2, Coffee, Sun, Moon, Apple, Upload, X, Save, Plus, Flame, Calendar } from 'lucide-react';

const mealIcons = {
    breakfast: <Coffee size={16} />,
    lunch: <Sun size={16} />,
    dinner: <Moon size={16} />,
    snack: <Apple size={16} />,
};

const mealLabels = {
    breakfast: 'Petit-déj',
    lunch: 'Déjeuner',
    dinner: 'Dîner',
    snack: 'Snack',
};

export default function App() {
    const [entries, setEntries] = useState([]);
    const [dailyGoal, setDailyGoal] = useState(2000);
    const [newEntry, setNewEntry] = useState({
        name: '',
        calories: '',
        meal: 'breakfast',
        image: null,
    });

    // Charger les données depuis localStorage au démarrage
    useEffect(() => {
        const saved = localStorage.getItem('calorieEntries');
        const savedGoal = localStorage.getItem('dailyGoal');
        if (saved) setEntries(JSON.parse(saved));
        if (savedGoal) setDailyGoal(parseInt(savedGoal));
    }, []);

    // Sauvegarder dans localStorage à chaque changement
    useEffect(() => {
        localStorage.setItem('calorieEntries', JSON.stringify(entries));
    }, [entries]);

    useEffect(() => {
        localStorage.setItem('dailyGoal', dailyGoal.toString());
    }, [dailyGoal]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setNewEntry({ ...newEntry, image: ev.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const addEntry = () => {
        if (!newEntry.name || !newEntry.calories) return;
        const entry = {
            id: Date.now(),
            ...newEntry,
            calories: parseInt(newEntry.calories),
            date: new Date().toISOString(),
        };
        setEntries([entry, ...entries]);
        setNewEntry({ name: '', calories: '', meal: 'breakfast', image: null });
    };

    const deleteEntry = (id) => {
        setEntries(entries.filter((e) => e.id !== id));
    };

    const today = new Date().toDateString();
    const todayEntries = entries.filter((e) => new Date(e.date).toDateString() === today);
    const todayCalories = todayEntries.reduce((sum, e) => sum + e.calories, 0);
    const progress = Math.min((todayCalories / dailyGoal) * 100, 100);

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <header className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl mb-4">
                        <Flame className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-white">CalorieVision</h1>
                    <p className="text-emerald-200 mt-2">Calculateur de calories en ligne</p>
                </header>

                {/* Objectif quotidien */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 border border-white/20 mb-6">
                    <label className="text-emerald-200 text-sm mb-2 block">
                        Objectif quotidien (kcal)
                    </label>
                    <input
                        type="number"
                        value={dailyGoal}
                        onChange={(e) => setDailyGoal(parseInt(e.target.value) || 2000)}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-center text-2xl font-bold focus:outline-none focus:border-emerald-400"
                    />
                </div>

                {/* Stats du jour */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-emerald-200 text-sm">Aujourd'hui</p>
                            <p className="text-3xl font-bold text-white">
                                {todayCalories}{' '}
                                <span className="text-lg text-emerald-300">/ {dailyGoal} kcal</span>
                            </p>
                        </div>
                        <div className="w-20 h-20 relative">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="35"
                                    stroke="rgba(255,255,255,0.1)"
                                    strokeWidth="8"
                                    fill="none"
                                />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="35"
                                    stroke="url(#gradient)"
                                    strokeWidth="8"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={`${progress * 2.2} 220`}
                                />
                                <defs>
                                    <linearGradient id="gradient">
                                        <stop offset="0%" stopColor="#34d399" />
                                        <stop offset="100%" stopColor="#22d3d1" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-white font-bold">
                                {Math.round(progress)}%
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => {
                            const mealCals = todayEntries
                                .filter((e) => e.meal === meal)
                                .reduce((s, e) => s + e.calories, 0);
                            return (
                                <div key={meal} className="bg-white/5 rounded-xl p-3 text-center">
                                    <div className="text-emerald-300 mb-1">{mealIcons[meal]}</div>
                                    <p className="text-white font-semibold text-sm">{mealCals}</p>
                                    <p className="text-emerald-200 text-xs">{mealLabels[meal]}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Formulaire d'ajout */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 mb-6">
                    <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Plus size={20} /> Ajouter un repas
                    </h2>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <label className="flex-1 cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <div
                                    className={`h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition ${newEntry.image
                                            ? 'border-emerald-400'
                                            : 'border-white/30 hover:border-white/50'
                                        }`}
                                >
                                    {newEntry.image ? (
                                        <img
                                            src={newEntry.image}
                                            alt="Preview"
                                            className="h-full w-full object-cover rounded-xl"
                                        />
                                    ) : (
                                        <>
                                            <Upload className="text-white/50 mb-2" size={24} />
                                            <span className="text-white/50 text-sm">Ajouter une photo</span>
                                        </>
                                    )}
                                </div>
                            </label>
                        </div>
                        {newEntry.image && (
                            <button
                                onClick={() => setNewEntry({ ...newEntry, image: null })}
                                className="text-red-400 text-sm flex items-center gap-1"
                            >
                                <X size={14} /> Supprimer l'image
                            </button>
                        )}
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                value={newEntry.name}
                                onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
                                placeholder="Nom du plat"
                                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400"
                            />
                            <input
                                type="number"
                                value={newEntry.calories}
                                onChange={(e) => setNewEntry({ ...newEntry, calories: e.target.value })}
                                placeholder="Calories"
                                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400"
                            />
                        </div>
                        <div className="flex gap-2">
                            {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => (
                                <button
                                    key={meal}
                                    onClick={() => setNewEntry({ ...newEntry, meal })}
                                    className={`flex-1 py-2 rounded-xl text-sm flex items-center justify-center gap-1 transition ${newEntry.meal === meal
                                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                                        }`}
                                >
                                    {mealIcons[meal]} {mealLabels[meal]}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={addEntry}
                            disabled={!newEntry.name || !newEntry.calories}
                            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Save size={18} /> Enregistrer
                        </button>
                    </div>
                </div>

                {/* Historique */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                    <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Calendar size={20} /> Historique
                    </h2>
                    {entries.length === 0 ? (
                        <p className="text-center text-white/50 py-8">Aucun repas enregistré</p>
                    ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {entries.map((entry) => (
                                <div
                                    key={entry.id}
                                    className="bg-white/5 rounded-xl p-3 flex items-center gap-3"
                                >
                                    {entry.image ? (
                                        <img
                                            src={entry.image}
                                            alt={entry.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center text-emerald-300">
                                            {mealIcons[entry.meal]}
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <p className="text-white font-medium">{entry.name}</p>
                                        <p className="text-emerald-300 text-sm">
                                            {entry.calories} kcal • {mealLabels[entry.meal]}
                                        </p>
                                        <p className="text-white/50 text-xs">
                                            {new Date(entry.date).toLocaleDateString('fr-FR', {
                                                day: 'numeric',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => deleteEntry(entry.id)}
                                        className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-emerald-200 text-sm">
                    💾 Les données sont sauvegardées localement dans votre navigateur
                </div>
            </div>
        </div>
    );
}
