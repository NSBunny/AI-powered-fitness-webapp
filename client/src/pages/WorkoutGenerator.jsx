import { useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const WorkoutGenerator = () => {
    const [formData, setFormData] = useState({
        age: '',
        gender: 'Male',
        weight: '',
        height: '',
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
                    weight: formData.weight,
                    height: formData.height,
                    fitnessLevel: formData.fitnessLevel
                },
                goals: formData.goals
            });
            setPlan(res.data);
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.msg || err.message || 'Failed to generate plan';
            setError(`Error: ${msg}. Please try again.`);
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
                            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                            <input type="number" name="weight" required value={formData.weight} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Height (ft)</label>
                            <input type="number" step="0.1" name="height" required value={formData.height} onChange={onChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
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
                    <button type="submit" disabled={loading} className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            'Generate Plan'
                        )}
                    </button>
                </form>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {plan && (
                <div className="bg-white shadow sm:rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Weekly Plan</h2>
                    <div className="space-y-6">
                        {Object.entries(plan).map(([day, details]) => (
                            <div key={day} className="border-b border-gray-200 pb-6 last:border-0">
                                <h3 className="text-xl font-semibold text-indigo-700 capitalize mb-3">{day}</h3>

                                {details.Focus && (
                                    <div className="mb-2">
                                        <span className="font-medium text-gray-700">Focus: </span>
                                        <span className="text-gray-600">{details.Focus}</span>
                                    </div>
                                )}
                                {details.Duration && (
                                    <div className="mb-4">
                                        <span className="font-medium text-gray-700">Duration: </span>
                                        <span className="text-gray-600">{details.Duration}</span>
                                    </div>
                                )}
                                {details["Warm-up"] && (
                                    <div className="mb-4">
                                        <span className="font-medium text-gray-700">Warm-up: </span>
                                        <span className="text-gray-600">{details["Warm-up"]}</span>
                                    </div>
                                )}

                                {(details.Exercises || details["Workout Details"]) && Array.isArray(details.Exercises || details["Workout Details"]) ? (
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Exercises</h4>
                                        <div className="space-y-4">
                                            {(details.Exercises || details["Workout Details"]).map((exercise, idx) => (
                                                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3 rounded shadow-sm">
                                                    <div className="font-medium text-gray-900 mb-1 sm:mb-0">{exercise.Exercise || exercise.Name || "Exercise"}</div>
                                                    <div className="flex space-x-4 text-sm text-gray-500">
                                                        <span>{exercise.Sets ? `${exercise.Sets} Sets` : ''}</span>
                                                        <span>{exercise.Reps}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {typeof details === 'object' ? (
                                            Object.entries(details).map(([key, value]) => {
                                                if (['Focus', 'Duration', 'Warm-up'].includes(key)) return null;

                                                // Helper to parse stringified lists
                                                const renderValue = (val) => {
                                                    if (typeof val !== 'string') return JSON.stringify(val).replace(/["{}[\]]/g, '');

                                                    // Check for comma-separated key-value pairs like "Activity:..., Description:..."
                                                    if (val.includes(':') && val.includes(',')) {
                                                        const parts = val.split(',').map(part => part.trim());
                                                        return (
                                                            <ul className="list-disc list-inside mt-1">
                                                                {parts.map((part, i) => {
                                                                    const [k, v] = part.split(':').map(s => s.trim());
                                                                    if (v) {
                                                                        return <li key={i}><span className="font-medium">{k}:</span> {v}</li>;
                                                                    }
                                                                    return <li key={i}>{part}</li>;
                                                                })}
                                                            </ul>
                                                        );
                                                    }
                                                    return val;
                                                };

                                                return (
                                                    <div key={key} className="text-gray-600">
                                                        <span className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                                                        <span>{renderValue(value)}</span>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <p className="text-gray-600">{details}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={async () => {
                                try {
                                    const token = localStorage.getItem('token');
                                    await axios.post('/api/user/plan', { plan }, {
                                        headers: { 'x-auth-token': token }
                                    });
                                    alert('Plan saved to dashboard!');
                                } catch (err) {
                                    console.error(err);
                                    const msg = err.response?.data?.msg || err.message;
                                    alert(`Failed to save plan: ${msg}`);
                                }
                            }}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Save to Dashboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkoutGenerator;
