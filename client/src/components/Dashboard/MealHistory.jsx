import { Calendar, Trash2, Coffee, Sun, Moon, Apple } from 'lucide-react';

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

export default function MealHistory({ entries, onDelete }) {
    return (
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
                            key={entry._id}
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
                                onClick={() => onDelete(entry._id)}
                                className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
