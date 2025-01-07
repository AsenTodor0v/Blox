import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from "../api";
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000; // Current time in seconds
                if (decoded.exp > currentTime) {
                    setIsLoggedIn(true);
                } else {
                    localStorage.removeItem(ACCESS_TOKEN);
                    localStorage.removeItem(REFRESH_TOKEN);
                }
            } catch (err) {
                console.error('Invalid token:', err);
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await api.get('/user-posts/'); // Fetch user's posts
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        fetchUserPosts();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    return (
        <div>
            <header>
                <h1>Welcome to My Blog</h1>
                <nav>
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login">Login</Link> |
                            <Link to="/register">Register</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/">Home</Link> |
                            <Link to="/profile">Profile</Link> |
                            <Link to="/posts/create">Create Post</Link> |
                            <Link to="/dashboard">Dashboard</Link> |
                            <button
                                onClick={handleLogout}
                                className='logout-button'
                            >
                                Logout
                            </button>
                        </>
                    )}
                </nav>
            </header>

            <main>
                <h2>Your Posts</h2>
                <div className="posts-container">
                    {posts.length === 0 ? (
                        <p>You have not created any posts yet.</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post.id} className="post-card">
                                <a href={`/posts/${post.id}`} className="post-title">
                                    {post.title}
                                </a>
                                <p className="post-content">{post.content}</p>
                                {post.image_url && (
                                    <img
                                        src={post.image_url}
                                        alt={post.title}
                                        className="post-image"
                                    />
                                )}
                                <p className="post-date">
                                    Created on: {new Date(post.created_at).toLocaleString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
