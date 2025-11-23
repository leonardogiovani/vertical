import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Music, ChevronDown } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';
import { Button } from '../ui/Button';
import { DonationModal } from '../donate/DonationModal';
import './FeedItem.css';

export const FeedItem = ({ data, isActive }) => {
    const [isDonationOpen, setIsDonationOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Verifica se o texto tem mais de 100 caracteres
    const needsExpansion = data.fullDescription && data.fullDescription.length > 100;
    const displayDescription = needsExpansion && !isExpanded 
        ? data.description 
        : (data.fullDescription || data.description);

    return (
        <div className="feed-item">
            <VideoPlayer src={data.videoUrl} poster={data.poster} isActive={isActive} />

            {/* Right Actions */}
            <div className="feed-actions">
                <div className="action-item">
                    <div className="action-icon-wrapper">
                        <Heart size={28} color="white" />
                    </div>
                    <span className="action-count">{data.likes}</span>
                </div>

                <div className="action-item">
                    <div className="action-icon-wrapper">
                        <MessageCircle size={28} color="white" />
                    </div>
                    <span className="action-count">{data.comments}</span>
                </div>

                <div className="action-item">
                    <div className="action-icon-wrapper">
                        <Share2 size={28} color="white" />
                    </div>
                    <span className="action-count">{data.shares}</span>
                </div>

                <div className="action-item">
                    <div className="action-icon-wrapper">
                        <MoreHorizontal size={28} color="white" />
                    </div>
                </div>
            </div>

            {/* Bottom Overlay */}
            <div className="feed-overlay">
                <div className="feed-info">
                    <div className="feed-user">
                        <img src={data.user.avatar} alt={data.user.name} className="user-avatar" />
                        <div className="user-details">
                            <span className="user-name">{data.user.name}</span>
                            <button className="follow-btn">Seguir</button>
                        </div>
                    </div>

                    <div className="feed-description-container">
                        <p className={`feed-description ${isExpanded ? 'expanded' : ''}`}>
                            {displayDescription}
                        </p>
                        {needsExpansion && (
                            <button 
                                className="expand-btn"
                                onClick={() => setIsExpanded(!isExpanded)}
                                aria-label={isExpanded ? "Recolher texto" : "Expandir texto"}
                            >
                                <ChevronDown size={16} className={isExpanded ? 'rotate-180' : ''} />
                                {isExpanded ? 'Ver menos' : 'Ver mais'}
                            </button>
                        )}
                    </div>
                    <div className="feed-tags">
                        {data.tags.map(tag => <span key={tag}>#{tag} </span>)}
                    </div>

                    <div className="feed-music">
                        <Music size={14} />
                        <span>{data.music}</span>
                    </div>
                </div>

                <div className="feed-cta">
                    <Button
                        variant="primary"
                        fullWidth
                        className="donate-btn"
                        onClick={() => setIsDonationOpen(true)}
                    >
                        💚 DOAR R$1
                    </Button>
                </div>
            </div>

            <DonationModal
                isOpen={isDonationOpen}
                onClose={() => setIsDonationOpen(false)}
                campaign={{
                    title: data.description,
                    goal: 1000, // Mock goal
                    user: data.user
                }}
            />
        </div>
    );
};
