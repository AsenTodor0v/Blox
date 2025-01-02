import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/Dashboard.css';
import { redirect } from 'react-router-dom';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);

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
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
    };

    return (
        <div className="dashboard-container"  >
            <h2 className="dashboard-title">Your Dashboard</h2>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
            <button className='create-post-button' onClick={() => window.location.href = '/posts/create'}>Create Post</button>
            <div className="posts-container">
                {posts.length === 0 ? (
                    <p>No posts available.</p>
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
        </div>
    );
};

export default Dashboard;
