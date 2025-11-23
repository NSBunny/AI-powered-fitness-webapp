import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.username}!</h1>
                <p className="mt-2 text-gray-600">This is your fitness dashboard.</p>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Placeholder for Analytics/Stats */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Total Workouts</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Calories Burned</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-sm font-medium text-gray-500 truncate">Streak</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">0 Days</dd>
                        </div>
                    </div>
                </div>

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
        </div>
    );
};

export default Dashboard;
