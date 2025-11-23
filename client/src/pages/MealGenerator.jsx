import { useState } from 'react';
import axios from 'axios';

const MealGenerator = () => {
    const [formData, setFormData] = useState({
        preferences: '',
        calorieTarget: ''
    });
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setPlan(null);
        try {
            const res = await axios.post('/api/meal/generate', {
                userProfile: {
                    calorieTarget: formData.calorieTarget
                },
                preferences: formData.preferences
            });
            setPlan(res.data);
        } catch (err) {
            setError('Failed to generate plan. Please try again.');
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Meal Plan Generator</h1>

            <div className="bg-white shadow sm:rounded-lg p-6 mb-8">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Dietary Preferences</label>
                            <input type="text" name="preferences" required placeholder="e.g., Vegan, Keto, No nuts" value={formData.preferences} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Calorie Target (Optional)</label>
                            <input type="number" name="calorieTarget" placeholder="e.g., 2000" value={formData.calorieTarget} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400">
                        {loading ? 'Generating...' : 'Generate Plan'}
                    </button>
                </form>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {plan && (
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Weekly Meal Plan</h2>
                    <div className="space-y-6">
                        {Object.entries(plan).map(([day, meals]) => (
                            <div key={day} className="border-b border-gray-200 pb-6 last:border-0">
                                <h3 className="text-xl font-semibold text-green-700 capitalize mb-4">{day}</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(meals).map(([mealType, description]) => (
                                        <div key={mealType} className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="text-sm font-bold text-green-800 uppercase tracking-wide mb-2">{mealType}</h4>
                                            <div className="text-gray-700 text-sm leading-relaxed">
                                                {typeof description === 'string' ? (
                                                    description
                                                ) : (
                                                    <ul className="list-disc list-inside">
                                                        {Object.entries(description).map(([key, val]) => (
                                                            <li key={key}>
                                                                <span className="font-medium">{key}: </span>
                                                                {typeof val === 'string' ? val : JSON.stringify(val).replace(/["{}[\]]/g, '')}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealGenerator;
