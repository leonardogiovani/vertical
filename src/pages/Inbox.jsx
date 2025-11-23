import React, { useState } from 'react';
import { TopBar } from '../components/layout/TopBar';
import { NotificationItem } from '../components/inbox/NotificationItem';
import { ChatListItem } from '../components/inbox/ChatList';
import './Inbox.css';

const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        type: 'donation',
        user: { name: 'Maria Souza', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        text: 'doou R$ 50,00 para sua campanha.',
        time: '2 min',
        read: false
    },
    {
        id: 2,
        type: 'like',
        user: { name: 'Pedro Santos', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        text: 'curtiu seu vídeo.',
        time: '1h',
        postImage: 'https://images.unsplash.com/photo-1555685812-4b943f3e9942?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        read: true
    },
    {
        id: 3,
        type: 'follow',
        user: { name: 'Ana Clara', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        text: 'começou a seguir você.',
        time: '3h',
        read: true
    },
    {
        id: 4,
        type: 'comment',
        user: { name: 'Lucas Lima', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        text: 'comentou: "Incrível iniciativa! 👏👏"',
        time: '5h',
        postImage: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
        read: true
    }
];

const MOCK_CHATS = [
    {
        id: 1,
        user: { name: 'Carlos Oliveira', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        lastMessage: 'Obrigado pela doação! 🙏',
        lastMessageTime: '10:30',
        unread: true,
        unreadCount: 2,
        online: true
    },
    {
        id: 2,
        user: { name: 'Julia Silva', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' },
        lastMessage: 'Ainda está disponível o sofá?',
        lastMessageTime: 'Ontem',
        unread: false,
        unreadCount: 0,
        online: false
    }
];

const Inbox = () => {
    const [activeTab, setActiveTab] = useState('notifications');

    return (
        <div className="page-inbox">
            <TopBar title="Inbox" />

            <div className="inbox-tabs">
                <button
                    className={`inbox-tab ${activeTab === 'notifications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notifications')}
                >
                    Notificações
                    {MOCK_NOTIFICATIONS.filter(n => !n.read).length > 0 && <span className="tab-badge"></span>}
                </button>
                <button
                    className={`inbox-tab ${activeTab === 'messages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('messages')}
                >
                    Mensagens
                </button>
            </div>

            <div className="inbox-content">
                {activeTab === 'notifications' ? (
                    <div className="notifications-list">
                        {MOCK_NOTIFICATIONS.map(notif => (
                            <NotificationItem key={notif.id} notification={notif} />
                        ))}
                    </div>
                ) : (
                    <div className="messages-list">
                        {MOCK_CHATS.map(chat => (
                            <ChatListItem key={chat.id} chat={chat} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inbox;
