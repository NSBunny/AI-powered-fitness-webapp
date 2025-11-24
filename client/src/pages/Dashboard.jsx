import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProfileModal from '../components/ProfileModal';
import WorkoutTracker from '../components/WorkoutTracker';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ totalWorkouts: 0, caloriesBurned: 0, streak: 0 });
    const [currentPlan, setCurrentPlan] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [activeWorkout, setActiveWorkout] = useState(null);

    useEffect(() => {
        fetchUserData();

        const handleOpenProfile = () => setIsProfileOpen(true);
        window.addEventListener('openProfile', handleOpenProfile);
        return () => window.removeEventListener('openProfile', handleOpenProfile);
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/user/profile', {
                headers: { 'x-auth-token': token }
            });
            setStats(res.data);
            setCurrentPlan(res.data.currentPlan);
        } catch (err) {
            console.error(err);
        }
    };

    const startWorkout = (day, details) => {
        console.log("Starting workout for", day, "Details:", details);
        // Extract exercises from details
        // Extract exercises from details
        let exercises = [];
        if (details.Exercises) {
            exercises = details.Exercises;
        } else if (details.exercises) {
            exercises = details.exercises;
        } else if (details["Workout Details"] && Array.isArray(details["Workout Details"])) {
            exercises = details["Workout Details"];
        } else {
            console.log("Could not find exercises in details:", details);
        }

        if (exercises.length > 0) {
            setActiveWorkout({ day, exercises });
        } else {
            alert("No exercises found for this day.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.username}!</h1>
                <p className="mt-2 text-gray-600">This is your fitness dashboard.</p>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Workouts</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalWorkouts}</dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Calories Burned</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.caloriesBurned}</dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Streak</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.streak} Days</dd>
                        </div>
                    </div>
                </div>

                {currentPlan && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Workout Plan</h2>
                        <div className="bg-white shadow overflow-hidden sm:rounded-md">
                            <ul className="divide-y divide-gray-200">
                                {Object.entries(currentPlan)
                                    .filter(([day]) => !day.toLowerCase().includes('note'))
                                    .map(([day, details]) => (
                                        <li key={day}>
                                            <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                                                <div className="text-sm font-medium text-indigo-600 truncate capitalize">{day}</div>
                                                <div className="ml-2 flex-shrink-0 flex">
                                                    <button
                                                        onClick={() => startWorkout(day, details)}
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200"
                                                    >
                                                        Start Workout
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Tools</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="bg-indigo-50 overflow-hidden shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-indigo-900">Workout Generator</h3>
                            <p className="mt-2 text-indigo-600">Generate a personalized workout plan based on your goals.</p>
                            <Link to="/workout-generator" className="mt-4 w-full inline-block text-center bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">Generate Workout</Link>
                        </div>
                        <div className="bg-green-50 overflow-hidden shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-green-900">Meal Plan Generator</h3>
                            <p className="mt-2 text-green-600">Get a customized meal plan to fuel your fitness journey.</p>
                            <Link to="/meal-generator" className="mt-4 w-full inline-block text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Generate Meal Plan</Link>
                        </div>
                    </div>
                </div>
            </div>

            <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

            {activeWorkout && (
                <WorkoutTracker
                    isOpen={!!activeWorkout}
                    onClose={() => setActiveWorkout(null)}
                    day={activeWorkout.day}
                    exercises={activeWorkout.exercises}
                    onComplete={() => {
                        fetchUserData();
                        setActiveWorkout(null);
                    }}
                />
            )}
        </div>
    );
};

export default Dashboard;
