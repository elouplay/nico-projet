import { useState, useEffect } from 'react';
import { Trash2, Coffee, Sun, Moon, Apple, Upload, X, Save, Plus, Flame, Calendar, Book, Calculator } from 'lucide-react';

// Base de données d'aliments (calories pour 100g)
const FOOD_DATABASE = {
    'Glucides': [
        { name: 'Flocons d\'avoine', calories: 389 },
        { name: 'Riz basmati (cuit)', calories: 130 },
        { name: 'Pâtes complètes (cuites)', calories: 131 },
        { name: 'Pain complet', calories: 247 },
        { name: 'Patate douce', calories: 86 },
        { name: 'Quinoa (cuit)', calories: 120 },
        { name: 'Pommes de terre', calories: 77 },
    ],
    'Protéines': [
        { name: 'Poulet (blanc)', calories: 165 },
        { name: 'Bœuf haché (5% MG)', calories: 137 },
        { name: 'Saumon', calories: 208 },
        { name: 'Thon (conserve)', calories: 116 },
        { name: 'Œufs (entiers)', calories: 155 },
        { name: 'Fromage blanc 0%', calories: 47 },
        { name: 'Protéine whey (poudre)', calories: 380 },
    ],
    'Lipides': [
        { name: 'Beurre de cacahuète', calories: 588 },
        { name: 'Amandes', calories: 579 },
        { name: 'Avocat', calories: 160 },
        { name: 'Huile d\'olive', calories: 884 },
        { name: 'Noix', calories: 654 },
    ],
    'Fruits': [
        { name: 'Banane', calories: 89 },
        { name: 'Pomme', calories: 52 },
        { name: 'Fraises', calories: 32 },
        { name: 'Mangue', calories: 60 },
    ],
    'Légumes': [
        { name: 'Brocoli', calories: 34 },
        { name: 'Haricots verts', calories: 31 },
        { name: 'Épinards', calories: 23 },
        { name: 'Tomates', calories: 18 },
    ],
};

// Bibliothèque de repas pré-définis
const MEAL_LIBRARY = {
    breakfast: [
        { name: 'Flocons d\'avoine + banane + beurre de cacahuète', calories: 450 },
        { name: 'Omelette 4 œufs + pain complet + avocat', calories: 520 },
        { name: 'Pancakes protéinés (3) + sirop d\'érable', calories: 480 },
        { name: 'Porridge + fruits secs + miel', calories: 400 },
    ],
    lunch: [
        { name: 'Poulet grillé (200g) + riz basmati + légumes', calories: 650 },
        { name: 'Saumon (150g) + quinoa + brocoli', calories: 580 },
        { name: 'Bœuf haché (200g) + pâtes complètes + sauce tomate', calories: 720 },
        { name: 'Thon (200g) + patates douces + haricots verts', calories: 600 },
    ],
    dinner: [
        { name: 'Steak (200g) + riz + salade', calories: 680 },
        { name: 'Poulet rôti (200g) + pommes de terre + légumes', calories: 620 },
        { name: 'Poisson blanc (200g) + couscous + ratatouille', calories: 550 },
        { name: 'Dinde (200g) + lentilles + épinards', calories: 590 },
    ],
    snack: [
        { name: 'Shaker protéiné + banane', calories: 280 },
        { name: 'Fromage blanc (200g) + fruits', calories: 220 },
        { name: 'Amandes (50g) + pomme', calories: 340 },
        { name: 'Barre protéinée + yaourt grec', calories: 300 },
    ],
};

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

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

export default function App() {
    const [entries, setEntries] = useState([]);
    const [dailyGoal, setDailyGoal] = useState(2000);
    const [weeklyPlan, setWeeklyPlan] = useState({});
    const [activeTab, setActiveTab] = useState('tracker');
    const [showLibrary, setShowLibrary] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);
    const [customMeal, setCustomMeal] = useState({ items: [], name: '' });
    const [selectedFood, setSelectedFood] = useState('');
    const [grams, setGrams] = useState('');
    const [newEntry, setNewEntry] = useState({
        name: '',
        calories: '',
        meal: 'breakfast',
        image: null,
    });

    useEffect(() => {
        const saved = localStorage.getItem('calorieEntries');
        const savedGoal = localStorage.getItem('dailyGoal');
        const savedPlan = localStorage.getItem('weeklyPlan');
        if (saved) setEntries(JSON.parse(saved));
        if (savedGoal) setDailyGoal(parseInt(savedGoal));
        if (savedPlan) setWeeklyPlan(JSON.parse(savedPlan));
    }, []);

    useEffect(() => {
        localStorage.setItem('calorieEntries', JSON.stringify(entries));
    }, [entries]);

    useEffect(() => {
        localStorage.setItem('dailyGoal', dailyGoal.toString());
    }, [dailyGoal]);

    useEffect(() => {
        localStorage.setItem('weeklyPlan', JSON.stringify(weeklyPlan));
    }, [weeklyPlan]);

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

    const addToCustomMeal = () => {
        if (!selectedFood || !grams) return;
        const [category, foodName] = selectedFood.split('|');
        const food = FOOD_DATABASE[category].find(f => f.name === foodName);
        if (!food) return;

        const calories = Math.round((food.calories * parseInt(grams)) / 100);
        const item = {
            name: `${foodName} (${grams}g)`,
            calories: calories,
        };
        setCustomMeal({
            ...customMeal,
            items: [...customMeal.items, item],
        });
        setSelectedFood('');
        setGrams('');
    };

    const removeFromCustomMeal = (index) => {
        setCustomMeal({
            ...customMeal,
            items: customMeal.items.filter((_, i) => i !== index),
        });
    };

    const saveCustomMeal = () => {
        if (!customMeal.name || customMeal.items.length === 0) return;
        const totalCalories = customMeal.items.reduce((sum, item) => sum + item.calories, 0);
        const entry = {
            id: Date.now(),
            name: customMeal.name,
            calories: totalCalories,
            meal: newEntry.meal,
            image: null,
            date: new Date().toISOString(),
            details: customMeal.items,
        };
        setEntries([entry, ...entries]);
        setCustomMeal({ items: [], name: '' });
        setShowCalculator(false);
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

    const addFromLibrary = (meal, item) => {
        const entry = {
            id: Date.now(),
            name: item.name,
            calories: item.calories,
            meal: meal,
            image: null,
            date: new Date().toISOString(),
        };
        setEntries([entry, ...entries]);
    };

    const deleteEntry = (id) => {
        setEntries(entries.filter((e) => e.id !== id));
    };

    const addToPlan = (day, meal, item) => {
        const key = `${day}-${meal}`;
        setWeeklyPlan({ ...weeklyPlan, [key]: item });
    };

    const removeFromPlan = (day, meal) => {
        const key = `${day}-${meal}`;
        const newPlan = { ...weeklyPlan };
        delete newPlan[key];
        setWeeklyPlan(newPlan);
    };

    const today = new Date().toDateString();
    const todayEntries = entries.filter((e) => new Date(e.date).toDateString() === today);
    const todayCalories = todayEntries.reduce((sum, e) => sum + e.calories, 0);
    const progress = Math.min((todayCalories / dailyGoal) * 100, 100);

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-4">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl mb-4">
                        <Flame className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-white">CalorieVision</h1>
                    <p className="text-emerald-200 mt-2">Calculateur de calories + Planning</p>
                </header>

                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('tracker')}
                        className={`flex-1 py-3 rounded-xl font-semibold transition ${activeTab === 'tracker' ? 'bg-white text-emerald-900' : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                    >
                        📊 Suivi
                    </button>
                    <button
                        onClick={() => setActiveTab('planner')}
                        className={`flex-1 py-3 rounded-xl font-semibold transition ${activeTab === 'planner' ? 'bg-white text-emerald-900' : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                    >
                        📅 Planning
                    </button>
                </div>

                {activeTab === 'tracker' ? (
                    <>
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 border border-white/20 mb-6">
                            <label className="text-emerald-200 text-sm mb-2 block">Objectif quotidien (kcal)</label>
                            <input
                                type="number"
                                value={dailyGoal}
                                onChange={(e) => setDailyGoal(parseInt(e.target.value) || 2000)}
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-center text-2xl font-bold focus:outline-none focus:border-emerald-400"
                            />
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-emerald-200 text-sm">Aujourd'hui</p>
                                    <p className="text-3xl font-bold text-white">
                                        {todayCalories} <span className="text-lg text-emerald-300">/ {dailyGoal} kcal</span>
                                    </p>
                                </div>
                                <div className="w-20 h-20 relative">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="40" cy="40" r="35" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                                        <circle cx="40" cy="40" r="35" stroke="url(#gradient)" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={`${progress * 2.2} 220`} />
                                        <defs>
                                            <linearGradient id="gradient">
                                                <stop offset="0%" stopColor="#34d399" />
                                                <stop offset="100%" stopColor="#22d3d1" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold">{Math.round(progress)}%</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => {
                                    const mealCals = todayEntries.filter((e) => e.meal === meal).reduce((s, e) => s + e.calories, 0);
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

                        {/* Boutons d'ajout */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <button
                                onClick={() => setShowLibrary(!showLibrary)}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2"
                            >
                                <Book size={18} /> Repas prédéfinis
                            </button>
                            <button
                                onClick={() => {
                                    setShowCalculator(!showCalculator);
                                    setShowLibrary(false);
                                }}
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2"
                            >
                                <Calculator size={18} /> Calculer par grammes
                            </button>
                        </div>

                        {/* Calculateur custom */}
                        {showCalculator && (
                            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 mb-6">
                                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <Calculator size={20} /> Créer un repas personnalisé
                                </h2>

                                <div className="mb-4">
                                    <label className="text-emerald-200 text-sm mb-2 block">Nom du repas</label>
                                    <input
                                        type="text"
                                        value={customMeal.name}
                                        onChange={(e) => setCustomMeal({ ...customMeal, name: e.target.value })}
                                        placeholder="ex: Mon petit-déj protéiné"
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <label className="text-emerald-200 text-sm mb-2 block">Aliment</label>
                                        <select
                                            value={selectedFood}
                                            onChange={(e) => setSelectedFood(e.target.value)}
                                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-400"
                                        >
                                            <option value="">Sélectionner...</option>
                                            {Object.entries(FOOD_DATABASE).map(([category, foods]) => (
                                                <optgroup key={category} label={category} className="bg-gray-800">
                                                    {foods.map((food) => (
                                                        <option key={food.name} value={`${category}|${food.name}`} className="bg-gray-800">
                                                            {food.name} ({food.calories} kcal/100g)
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-emerald-200 text-sm mb-2 block">Grammes</label>
                                        <input
                                            type="number"
                                            value={grams}
                                            onChange={(e) => setGrams(e.target.value)}
                                            placeholder="ex: 80"
                                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={addToCustomMeal}
                                    disabled={!selectedFood || !grams}
                                    className="w-full bg-emerald-500 text-white font-semibold py-2 rounded-xl hover:opacity-90 transition disabled:opacity-50 mb-4"
                                >
                                    + Ajouter
                                </button>

                                {customMeal.items.length > 0 && (
                                    <div className="bg-white/5 rounded-xl p-4 mb-4">
                                        <h3 className="text-white font-semibold mb-2">Composition :</h3>
                                        {customMeal.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                                                <div>
                                                    <p className="text-white text-sm">{item.name}</p>
                                                    <p className="text-emerald-300 text-xs">{item.calories} kcal</p>
                                                </div>
                                                <button onClick={() => removeFromCustomMeal(idx)} className="text-red-400 hover:text-red-300">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ))}
                                        <div className="mt-3 pt-3 border-t border-white/20">
                                            <p className="text-white font-bold text-right">
                                                Total : {customMeal.items.reduce((sum, item) => sum + item.calories, 0)} kcal
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => (
                                        <button
                                            key={meal}
                                            onClick={() => setNewEntry({ ...newEntry, meal })}
                                            className={`flex-1 py-2 rounded-xl text-xs flex items-center justify-center gap-1 transition ${newEntry.meal === meal ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white' : 'bg-white/10 text-white/70'
                                                }`}
                                        >
                                            {mealIcons[meal]}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={saveCustomMeal}
                                    disabled={!customMeal.name || customMeal.items.length === 0}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50 mt-4"
                                >
                                    <Save size={18} className="inline mr-2" /> Enregistrer le repas
                                </button>
                            </div>
                        )}

                        {/* Bibliothèque */}
                        {showLibrary && (
                            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 mb-6">
                                <h2 className="text-white font-semibold mb-4">📚 Repas Prise de Masse</h2>
                                {Object.entries(MEAL_LIBRARY).map(([meal, items]) => (
                                    <div key={meal} className="mb-4">
                                        <h3 className="text-emerald-300 font-semibold mb-2 flex items-center gap-2">
                                            {mealIcons[meal]} {mealLabels[meal]}
                                        </h3>
                                        <div className="space-y-2">
                                            {items.map((item, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => addFromLibrary(meal, item)}
                                                    className="w-full bg-white/5 hover:bg-white/10 rounded-lg p-3 text-left transition flex items-center justify-between"
                                                >
                                                    <div>
                                                        <p className="text-white text-sm">{item.name}</p>
                                                        <p className="text-emerald-300 text-xs">{item.calories} kcal</p>
                                                    </div>
                                                    <Plus size={16} className="text-emerald-400" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Formulaire manuel */}
                        {!showCalculator && !showLibrary && (
                            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 mb-6">
                                <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                                    <Plus size={20} /> Ajouter manuellement
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <label className="flex-1 cursor-pointer">
                                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                            <div className={`h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition ${newEntry.image ? 'border-emerald-400' : 'border-white/30 hover:border-white/50'}`}>
                                                {newEntry.image ? (
                                                    <img src={newEntry.image} alt="Preview" className="h-full w-full object-cover rounded-xl" />
                                                ) : (
                                                    <>
                                                        <Upload className="text-white/50 mb-2" size={24} />
                                                        <span className="text-white/50 text-sm">Photo (optionnel)</span>
                                                    </>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                    {newEntry.image && (
                                        <button onClick={() => setNewEntry({ ...newEntry, image: null })} className="text-red-400 text-sm flex items-center gap-1">
                                            <X size={14} /> Supprimer l'image
                                        </button>
                                    )}
                                    <div className="grid grid-cols-2 gap-3">
                                        <input type="text" value={newEntry.name} onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })} placeholder="Nom du plat" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400" />
                                        <input type="number" value={newEntry.calories} onChange={(e) => setNewEntry({ ...newEntry, calories: e.target.value })} placeholder="Calories" className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400" />
                                    </div>
                                    <div className="flex gap-2">
                                        {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => (
                                            <button key={meal} onClick={() => setNewEntry({ ...newEntry, meal })} className={`flex-1 py-2 rounded-xl text-sm flex items-center justify-center gap-1 transition ${newEntry.meal === meal ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}>
                                                {mealIcons[meal]} {mealLabels[meal]}
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={addEntry} disabled={!newEntry.name || !newEntry.calories} className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                        <Save size={18} /> Enregistrer
                                    </button>
                                </div>
                            </div>
                        )}

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
                                        <div key={entry.id} className="bg-white/5 rounded-xl p-3">
                                            <div className="flex items-center gap-3">
                                                {entry.image ? (
                                                    <img src={entry.image} alt={entry.name} className="w-16 h-16 rounded-lg object-cover" />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center text-emerald-300">
                                                        {mealIcons[entry.meal]}
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <p className="text-white font-medium">{entry.name}</p>
                                                    <p className="text-emerald-300 text-sm">{entry.calories} kcal • {mealLabels[entry.meal]}</p>
                                                    <p className="text-white/50 text-xs">
                                                        {new Date(entry.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                                <button onClick={() => deleteEntry(entry.id)} className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            {entry.details && (
                                                <div className="mt-2 ml-20 text-xs text-white/70">
                                                    {entry.details.map((item, idx) => (
                                                        <div key={idx}>• {item.name}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
                        <h2 className="text-white font-semibold mb-4">📅 Planning de la Semaine</h2>
                        <div className="space-y-4">
                            {DAYS.map((day) => (
                                <div key={day} className="bg-white/5 rounded-xl p-4">
                                    <h3 className="text-emerald-300 font-semibold mb-3">{day}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => {
                                            const key = `${day}-${meal}`;
                                            const planned = weeklyPlan[key];
                                            return (
                                                <div key={meal} className="bg-white/5 rounded-lg p-2">
                                                    <p className="text-white/70 text-xs mb-1 flex items-center gap-1">
                                                        {mealIcons[meal]} {mealLabels[meal]}
                                                    </p>
                                                    {planned ? (
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex-1">
                                                                <p className="text-white text-sm">{planned.name}</p>
                                                                <p className="text-emerald-300 text-xs">{planned.calories} kcal</p>
                                                            </div>
                                                            <button onClick={() => removeFromPlan(day, meal)} className="p-1 text-red-400 hover:bg-red-400/20 rounded">
                                                                <X size={14} />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <select
                                                            onChange={(e) => {
                                                                const item = MEAL_LIBRARY[meal][parseInt(e.target.value)];
                                                                if (item) addToPlan(day, meal, item);
                                                                e.target.value = '';
                                                            }}
                                                            className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-white text-xs focus:outline-none focus:border-emerald-400 cursor-pointer"
                                                        >
                                                            <option value="">+ Ajouter</option>
                                                            {MEAL_LIBRARY[meal].map((item, idx) => (
                                                                <option key={idx} value={idx} className="bg-gray-800">
                                                                    {item.name} ({item.calories} kcal)
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-2 text-right">
                                        <span className="text-emerald-300 text-sm font-semibold">
                                            Total: {['breakfast', 'lunch', 'dinner', 'snack'].reduce((sum, meal) => {
                                                const key = `${day}-${meal}`;
                                                return sum + (weeklyPlan[key]?.calories || 0);
                                            }, 0)} kcal
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="text-center mt-6 text-emerald-200 text-sm">💾 Données sauvegardées localement</div>
            </div>
        </div>
    );
}
