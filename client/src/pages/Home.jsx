import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { jwtDecode } from 'jwt-decode';
import '../styles/Home.css';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            try {
                const decoded = jwtDecode(token); // Use `jwtDecode` or `decode`
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
            setIsLoggedIn(false); // Ensure state reflects logged out if no token is found
        }
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts/');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to My Blog</h1>
                <nav>
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="nav-link">Login</Link> |
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile/" className="nav-link">Profile</Link> |
                            <Link to="/dashboard" className="nav-link">Dashboard</Link> |
                            <Link to="/posts/create" className="nav-link">Create Post</Link>|

                            <button
                                onClick={handleLogout}
                                className="nav-logout-btn"
                            >
                                Logout
                            </button>
                        </>
                    )}

                </nav>
            </header>

            <main className="posts-container">
                <h2>Recent Posts</h2>
                {posts.length > 0 ? (
                    <div className="posts-list">
                        {posts.map((post) => (
                            <div className="post-card" key={post.id}>
                                {post.image_url && (
                                    <img
                                        src={post.image_url}
                                        alt={post.title}
                                        className="post-image"
                                    />
                                )}
                                <div className="post-content">
                                    <Link to={`/posts/${post.id}`} className="post-title">
                                        {post.title}
                                    </Link>
                                    <p>{post.content.substring(0, 100)}...</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No posts yet</p>
                )}
            </main>
        </div>
    );
}
