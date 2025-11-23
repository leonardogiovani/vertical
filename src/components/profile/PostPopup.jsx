import React, { useState, useEffect } from 'react';
import { X, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Play, FileText } from 'lucide-react';
import './PostPopup.css';

export const PostPopup = ({ post, onClose }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Compartilhar postagem',
                text: 'Confira esta postagem incrível!',
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    };

    const getDescription = () => {
        if (!post.fullDescription) return post.description || '';
        
        if (showFullDescription) {
            return post.fullDescription;
        }
        
        return post.description || post.fullDescription.substring(0, 100) + '...';
    };

    const needsExpansion = post.fullDescription && post.fullDescription.length > 100;

    return (
        <div className="post-popup-overlay" onClick={onClose}>
            <div className="post-popup-container" onClick={(e) => e.stopPropagation()}>
                <div className="post-popup-header">
                    <button className="post-popup-close" onClick={onClose} aria-label="Fechar">
                        <X size={24} />
                    </button>
                    <button className="post-popup-more" aria-label="Mais opções">
                        <MoreHorizontal size={24} />
                    </button>
                </div>

                <div className="post-popup-content">
                    <div className="post-popup-media">
                        {post.type === 'video' && (
                            <div className="post-video-container">
                                <img 
                                    src={post.image} 
                                    alt="Video thumbnail"
                                    className="post-popup-image"
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2ZyB4PSIxODAiIHk9IjEzMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9IndoaXRlIj4KPHBhdGggZD0iTTggNXYxNGwxMS03eiIvPgo8L3N2Zz4KPC9zdmc+';
                                    }}
                                />
                                <div className="video-play-overlay">
                                    <Play size={48} />
                                </div>
                            </div>
                        )}
                        {post.type === 'article' && (
                            <div className="post-article-container">
                                <img 
                                    src={post.image} 
                                    alt="Article cover"
                                    className="post-popup-image"
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjUwIiB5PSI4MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxNDAiIGZpbGw9IndoaXRlIiByeD0iOCIvPgo8cmVjdCB4PSI3MCIgeT0iMTAwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjQiIGZpbGw9IiM5Q0EzQUYiLz4KPHJlY3QgeD0iNzAiIHk9IjExMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSI0IiBmaWxsPSIjOUNBM0FGIi8+CjxyZWN0IHg9IjcwIiB5PSIxMjAiIHdpZHRoPSIyMjAiIGhlaWdodD0iNCIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4=';
                                    }}
                                />
                                <div className="article-overlay">
                                    <FileText size={32} />
                                    <span>Artigo</span>
                                </div>
                            </div>
                        )}
                        {post.type === 'photo' && (
                            <img 
                                src={post.image} 
                                alt="Post photo"
                                className="post-popup-image"
                                onError={(e) => {
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iNzUiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjOUNBM0FGIiByeD0iOCIvPgo8Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMjUiIHI9IjIwIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4=';
                                }}
                            />
                        )}
                    </div>

                    <div className="post-popup-info">
                        <div className="post-popup-actions">
                            <div className="post-actions-left">
                                <button 
                                    className={`action-btn ${isLiked ? 'liked' : ''}`}
                                    onClick={handleLike}
                                    aria-label="Curtir"
                                >
                                    <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
                                </button>
                                <button className="action-btn" aria-label="Comentar">
                                    <MessageCircle size={24} />
                                </button>
                                <button 
                                    className="action-btn"
                                    onClick={handleShare}
                                    aria-label="Compartilhar"
                                >
                                    <Share2 size={24} />
                                </button>
                            </div>
                            <button 
                                className={`action-btn ${isSaved ? 'saved' : ''}`}
                                onClick={handleSave}
                                aria-label="Salvar"
                            >
                                <Bookmark size={24} fill={isSaved ? 'currentColor' : 'none'} />
                            </button>
                        </div>

                        <div className="post-popup-description">
                            <p className="post-description-text">
                                {getDescription()}
                            </p>
                            {needsExpansion && (
                                <button 
                                    className="expand-description-btn"
                                    onClick={() => setShowFullDescription(!showFullDescription)}
                                >
                                    {showFullDescription ? 'Ver menos' : 'Ver mais'}
                                </button>
                            )}
                        </div>

                        <div className="post-popup-comments">
                            <p className="comments-placeholder">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};