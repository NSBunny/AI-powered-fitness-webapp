import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ProfileModal = ({ isOpen, onClose }) => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchProfile();
        }
    }, [isOpen]);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/user/profile', {
                headers: { 'x-auth-token': token }
            });
            setStats(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mt-2">{user?.username}</h3>
                    <p className="text-sm text-gray-500">{user?.email}</p>

                    <div className="mt-4 py-4 border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <div className="text-xl font-bold text-indigo-600">{stats?.totalWorkouts || 0}</div>
                                <div className="text-xs text-gray-500">Workouts</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-indigo-600">{stats?.caloriesBurned || 0}</div>
                                <div className="text-xs text-gray-500">Calories</div>
                            </div>
                            <div>
                                <div className="text-xl font-bold text-indigo-600">{stats?.streak || 0}</div>
                                <div className="text-xs text-gray-500">Streak</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
