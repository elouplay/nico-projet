import { useState } from 'react';
import { Upload, X, Save, Coffee, Sun, Moon, Apple, Plus } from 'lucide-react';

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

export default function MealForm({ onAdd }) {
    const [formData, setFormData] = useState({
        name: '',
        calories: '',
        meal: 'breakfast',
        image: null,
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setFormData({ ...formData, image: ev.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.calories) return;
        onAdd(formData);
        setFormData({ name: '', calories: '', meal: 'breakfast', image: null });
    };

    return (
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
                            className={`h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition ${formData.image
                                    ? 'border-emerald-400'
                                    : 'border-white/30 hover:border-white/50'
                                }`}
                        >
                            {formData.image ? (
                                <img
                                    src={formData.image}
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
                {formData.image && (
                    <button
                        onClick={() => setFormData({ ...formData, image: null })}
                        className="text-red-400 text-sm flex items-center gap-1"
                    >
                        <X size={14} /> Supprimer l'image
                    </button>
                )}
                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nom du plat"
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400"
                    />
                    <input
                        type="number"
                        value={formData.calories}
                        onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                        placeholder="Calories"
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400"
                    />
                </div>
                <div className="flex gap-2">
                    {['breakfast', 'lunch', 'dinner', 'snack'].map((meal) => (
                        <button
                            key={meal}
                            onClick={() => setFormData({ ...formData, meal })}
                            className={`flex-1 py-2 rounded-xl text-sm flex items-center justify-center gap-1 transition ${formData.meal === meal
                                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            {mealIcons[meal]} {mealLabels[meal]}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={!formData.name || !formData.calories}
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <Save size={18} /> Enregistrer
                </button>
            </div>
        </div>
    );
}
