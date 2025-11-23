import { useState } from 'react';
import axios from 'axios';

const WorkoutGenerator = () => {
    const [formData, setFormData] = useState({
        age: '',
        gender: 'Male',
        fitnessLevel: 'Beginner',
        goals: ''
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
            const res = await axios.post('/api/workout/generate', {
                userProfile: {
                    age: formData.age,
                    gender: formData.gender,
                    fitnessLevel: formData.fitnessLevel
                },
                goals: formData.goals
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
            <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Workout Generator</h1>

            <div className="bg-white shadow sm:rounded-lg p-6 mb-8">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <input type="number" name="age" required value={formData.age} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <select name="gender" value={formData.gender} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fitness Level</label>
                            <select name="fitnessLevel" value={formData.fitnessLevel} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Goals</label>
                            <input type="text" name="goals" required placeholder="e.g., Build muscle, Lose weight" value={formData.goals} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                        {loading ? 'Generating...' : 'Generate Plan'}
                    </button>
                </form>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {plan && (
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Weekly Plan</h2>
                    <div className="space-y-6">
                        {Object.entries(plan).map(([day, details]) => (
                            <div key={day} className="border-b border-gray-200 pb-4 last:border-0">
                                <h3 className="text-lg font-medium text-indigo-600 capitalize">{day}</h3>
                                <div className="mt-2 text-gray-600 whitespace-pre-wrap">
                                    {/* Handle if details is string or object */}
                                    {typeof details === 'string' ? details : JSON.stringify(details, null, 2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkoutGenerator;
