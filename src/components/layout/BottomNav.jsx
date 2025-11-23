import React from 'react';
import { Home, Heart, Plus, Bell, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BottomNav.css';

export const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bottom-nav">
            <div className="bottom-nav-container">
                <button
                    className={`nav-item ${isActive('/') ? 'active' : ''}`}
                    onClick={() => navigate('/')}
                >
                    <Home size={24} />
                    <span className="nav-label">Home</span>
                </button>

                <button
                    className={`nav-item ${isActive('/donations') ? 'active' : ''}`}
                    onClick={() => navigate('/donations')}
                >
                    <Heart size={24} />
                    <span className="nav-label">Doar</span>
                </button>

                <div className="nav-center-wrapper">
                    <button
                        className="nav-fab"
                        onClick={() => navigate('/create')}
                    >
                        <Plus size={32} color="white" />
                    </button>
                </div>

                <button
                    className={`nav-item ${isActive('/inbox') ? 'active' : ''}`}
                    onClick={() => navigate('/inbox')}
                >
                    <Bell size={24} />
                    <span className="nav-label">Inbox</span>
                </button>

                <button
                    className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
                    onClick={() => navigate('/profile')}
                >
                    <User size={24} />
                    <span className="nav-label">Perfil</span>
                </button>
            </div>
        </nav>
    );
};
