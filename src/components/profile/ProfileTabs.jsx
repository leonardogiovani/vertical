import React, { useState, useEffect, useRef } from 'react';
import { Grid, Film, Heart, Package, FileText } from 'lucide-react';
import { PostPopup } from './PostPopup';
import './ProfileTabs.css';

export const ProfileTabs = ({ posts, donations }) => {
    const [activeTab, setActiveTab] = useState('grid');
    const [isSticky, setIsSticky] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const tabsRef = useRef(null);
    const tabsNavRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (tabsRef.current) {
                const rect = tabsRef.current.getBoundingClientRect();
                setIsSticky(rect.top <= 0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        
        // Scroll to top when clicking on tabs
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const openPostPopup = (post) => {
        setSelectedPost(post);
    };

    const closePostPopup = () => {
        setSelectedPost(null);
    };

    return (
        <div className="profile-tabs-section" ref={tabsRef}>
            <div 
                className={`profile-tabs-nav ${isSticky ? 'sticky-active' : ''}`}
                ref={tabsNavRef}
            >
                <button
                    className={`tab-btn ${activeTab === 'grid' ? 'active' : ''}`}
                    onClick={() => handleTabClick('grid')}
                    aria-label="Posts em Grid"
                >
                    <Grid size={24} />
                </button>
                <button
                    className={`tab-btn ${activeTab === 'reels' ? 'active' : ''}`}
                    onClick={() => handleTabClick('reels')}
                    aria-label="Reels"
                >
                    <Film size={24} />
                </button>
                <button
                    className={`tab-btn ${activeTab === 'donations' ? 'active' : ''}`}
                    onClick={() => handleTabClick('donations')}
                    aria-label="Doações"
                >
                    <Heart size={24} />
                </button>
                <button
                    className={`tab-btn ${activeTab === 'items' ? 'active' : ''}`}
                    onClick={() => handleTabClick('items')}
                    aria-label="Itens"
                >
                    <Package size={24} />
                </button>
            </div>

            <div className="profile-tab-content">
                {activeTab === 'grid' && (
                    <div className="posts-grid">
                        {posts.map(post => (
                            <div 
                                key={post.id} 
                                className={`grid-post-item ${post.type}`}
                                onClick={() => openPostPopup(post)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img 
                                    src={post.image} 
                                    alt="Post" 
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NSA4NUg3MFYxMDBIODVWODVaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xMzAgODVIMTE1VjEwMEgxMzBWODVaIiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNODUgMTIwSDcwVjEzNUg4NVYxMjBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xMzAgMTIwSDExNVYxMzVIMTMwVjEyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                                    }}
                                />
                                {/* Ícone do tipo de post */}
                                <div className="post-type-icon">
                                    {post.type === 'video' && <Film size={16} />}
                                    {post.type === 'article' && <FileText size={16} />}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'donations' && (
                    <div className="donations-list">
                        {donations.map(donation => (
                            <div key={donation.id} className="donation-item">
                                <div className="donation-icon-wrapper">
                                    {donation.type === 'sent' ? '↗️' : '↙️'}
                                </div>
                                <div className="donation-details">
                                    <p className="donation-text">
                                        {donation.type === 'sent' ? 'Você doou ' : 'Você recebeu '}
                                        <strong>{donation.amount}</strong>
                                    </p>
                                    <span className="donation-date">{donation.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Placeholders for other tabs */}
                {(activeTab === 'reels' || activeTab === 'items') && (
                    <div className="tab-placeholder">
                        <p>Nenhum item encontrado</p>
                        <button 
                            className="back-to-top-btn"
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                });
                            }}
                        >
                            Voltar ao topo
                        </button>
                    </div>
                )}
            </div>

            {/* Post Popup Modal */}
            {selectedPost && (
                <PostPopup 
                    post={selectedPost} 
                    onClose={closePostPopup}
                />
            )}
        </div>
    );
};
