import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/Profile.css';

export default function Profile() {
    const [user, setUser] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (token) {
                    const response = await api.get('profile/', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);  // Ensure this is setting the correct user data
                } else {
                    setError('No authentication token found.');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Failed to load profile.');
            }
        };

        fetchUserProfile();
    }, []);

    const handleUpdate = () => {
        navigate('/profile/update'); // Navigate to the profile update page
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your profile?');
        if (confirmDelete) {
            try {
                await api.delete('profile/');
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                navigate('/login'); // Redirect to login after successful deletion
            } catch (error) {
                console.error('Error deleting profile:', error);
                setError('Failed to delete profile.');
            }
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="profile-details">
            {user ? (
                <>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>First Name:</strong> {user.first_name}</p>
                    <p><strong>Last Name:</strong> {user.last_name}</p>
                    {user.profile_picture && (
                        <img src={user.profile_picture} alt="Profile" className="profile-picture" />
                    )}

                    <div className="profile-actions">
                        <button onClick={handleUpdate} className="profile-update-btn">Update Profile</button>
                        <button onClick={handleDelete} className="profile-delete-btn">Delete Profile</button>
                    </div>
                </>
            ) : (
                <p>Loading profile...</p> // Display a loading message if `user` is not yet available
            )}
        </div>
    );
};

