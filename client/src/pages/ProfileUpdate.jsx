import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileUpdate.css";

export default function ProfileUpdate() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // Fetch current user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await api.get("/profile/");
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setError("Failed to load user details.");
            }
        };

        fetchUserDetails();
    }, []);

    // Handle form submission to update profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put("/profile-update/", user); // Update user details
            setSuccess("Profile updated successfully!");
            setError("");

            // Redirect to the profile page
            setTimeout(() => {
                navigate("/profile");
            }, 500); // Wait 1.5 seconds to show the success message before redirecting
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile.");
            setSuccess("");
        }
    };



    return (
        <div className="profile-container">
            <h1>Update Profile</h1>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit} className="profile-form">
                <label>
                    Username:
                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        required
                    />
                </label>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={user.first_name}
                        onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        value={user.last_name}
                        onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                    />
                </label>
                <button type="submit" className="btn-update">
                    Update Profile
                </button>
            </form>
        </div>
    );
}
