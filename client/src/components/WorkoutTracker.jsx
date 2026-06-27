import { useState } from 'react';
import axios from 'axios';

const WorkoutTracker = ({ isOpen, onClose, day, exercises, onComplete }) => {
    const [checkedExercises, setCheckedExercises] = useState({});
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleCheck = (idx) => {
        setCheckedExercises(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };

    const handleFinish = async () => {
        setLoading(true);
        const completedCount = Object.values(checkedExercises).filter(Boolean).length;
        // Simple calorie calculation: 50 calories per exercise
        const calories = completedCount * 50;

        try {
            const token = localStorage.getItem('token');
            await axios.post('/api/user/stats', { calories }, {
                headers: { 'x-auth-token': token }
            });
            onComplete();
            onClose();
        } catch (err) {
            console.error(err);
            alert('Failed to save workout stats');
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative p-5 border w-full max-w-lg shadow-lg rounded-md bg-white m-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{day} Workout</h3>

                <div className="max-h-96 overflow-y-auto mb-6">
                    {exercises.map((exercise, idx) => (
                        <div key={idx} className="flex items-start mb-4 p-3 bg-gray-50 rounded-lg">
                            <input
                                type="checkbox"
                                checked={!!checkedExercises[idx]}
                                onChange={() => handleCheck(idx)}
                                className="mt-1 h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <div className="ml-3">
                                <label className="text-sm font-medium text-gray-900">
                                    {exercise.Exercise || exercise.Name || "Exercise"}
                                </label>
                                <p className="text-sm text-gray-500">
                                    {exercise.Sets ? `${exercise.Sets} Sets` : ''} • {exercise.Reps}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleFinish}
                        disabled={loading}
                        className="px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-400"
                    >
                        {loading ? 'Saving...' : 'Finish Workout'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutTracker;
