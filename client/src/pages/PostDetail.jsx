import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/PostDetails.css';

export default function PostDetails() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const response = await api.get(`/posts/${id}/`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };
        fetchPostDetails();
    }, [id]);

    const handleDelete = async () => {
        try {
            await api.delete(`/posts/${id}/`);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="post-details-container">
            <h2>{post ? post.title : 'Loading...'}</h2>
            {post && (
                <div className="post-details-content">
                    <p>{post.content}</p>
                    {post.image_url && <img src={post.image_url} alt={post.title} />}
                    <div className="post-actions">
                        <button onClick={() => navigate(`/editmeal/${post.id}`)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}
