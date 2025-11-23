import React from 'react';
import { Heart, User, Gift, MessageCircle } from 'lucide-react';
import './NotificationItem.css';

export const NotificationItem = ({ notification }) => {
    const getIcon = () => {
        switch (notification.type) {
            case 'like':
                return <div className="notif-icon like"><Heart size={16} fill="white" /></div>;
            case 'follow':
                return <div className="notif-icon follow"><User size={16} fill="white" /></div>;
            case 'donation':
                return <div className="notif-icon donation"><Gift size={16} fill="white" /></div>;
            case 'comment':
                return <div className="notif-icon comment"><MessageCircle size={16} fill="white" /></div>;
            default:
                return null;
        }
    };

    return (
        <div className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
            <div className="notif-avatar-wrapper">
                <img src={notification.user.avatar} alt={notification.user.name} className="notif-avatar" />
                {getIcon()}
            </div>

            <div className="notif-content">
                <p className="notif-text">
                    <span className="notif-username">{notification.user.name}</span>
                    {' '}
                    {notification.text}
                </p>
                <span className="notif-time">{notification.time}</span>
            </div>

            {notification.postImage && (
                <img src={notification.postImage} alt="Post" className="notif-post-thumb" />
            )}

            {notification.type === 'follow' && (
                <button className="notif-follow-btn">Seguir</button>
            )}
        </div>
    );
};
