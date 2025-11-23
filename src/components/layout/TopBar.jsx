import React from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

export const TopBar = ({
    title,
    showBack = false,
    transparent = false,
    actions,
    onBack
}) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) onBack();
        else navigate(-1);
    };

    return (
        <header className={`top-bar ${transparent ? 'top-bar-transparent' : ''}`}>
            <div className="top-bar-left">
                {showBack && (
                    <button className="icon-btn" onClick={handleBack}>
                        <ArrowLeft size={24} />
                    </button>
                )}
                {title && <h1 className="top-bar-title">{title}</h1>}
            </div>

            <div className="top-bar-right">
                {actions ? actions : (
                    <button className="icon-btn">
                        <Search size={24} />
                    </button>
                )}
            </div>
        </header>
    );
};
