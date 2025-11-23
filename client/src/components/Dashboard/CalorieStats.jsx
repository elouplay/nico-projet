import { Coffee, Sun, Moon, Apple } from 'lucide-react';

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

export default function CalorieStats({ entries, dailyGoal }) {
    const today = new Date().toDateString();
    const todayEntries = entries.filter(
        (e) => new Date(e.date).toDateString() === today
    );
    const todayCalories = todayEntries.reduce((sum, e) => sum + e.calories, 0);
    const progress = Math.min((todayCalories / dailyGoal) * 100, 100);

    return (
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
    );
}
