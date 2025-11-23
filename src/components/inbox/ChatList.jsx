import React from 'react';
import './ChatList.css';

export const ChatListItem = ({ chat }) => {
    return (
        <div className="chat-item">
            <div className="chat-avatar-wrapper">
                <img src={chat.user.avatar} alt={chat.user.name} className="chat-avatar" />
                {chat.online && <div className="online-badge"></div>}
            </div>

            <div className="chat-content">
                <div className="chat-header">
                    <span className="chat-username">{chat.user.name}</span>
                    <span className="chat-time">{chat.lastMessageTime}</span>
                </div>
                <div className="chat-preview">
                    <p className={`chat-message ${chat.unread ? 'unread' : ''}`}>
                        {chat.lastMessage}
                    </p>
                    {chat.unreadCount > 0 && (
                        <div className="unread-badge">{chat.unreadCount}</div>
                    )}
                </div>
            </div>
        </div>
    );
};
