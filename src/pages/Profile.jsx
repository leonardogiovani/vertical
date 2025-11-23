import React from 'react';
import { TopBar } from '../components/layout/TopBar';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileTabs } from '../components/profile/ProfileTabs';
import './Profile.css';

const MOCK_USER = {
    name: 'Giovani',
    username: 'giovani_dev',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    bio: 'Desenvolvedor apaixonado por causas sociais. Ajudando a construir um mundo melhor, uma linha de código por vez. 💻💚',
    verified: true,
    stats: {
        donations: 234,
        helped: '1.2k',
        dreams: 56
    }
};

const MOCK_POSTS = [
    { id: 1, image: 'https://images.unsplash.com/photo-1555685812-4b943f3e9942?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', type: 'photo' },
    { id: 2, image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', type: 'video' },
    { id: 3, image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', type: 'photo' },
    { id: 4, image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', type: 'article' },
    { id: 5, image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', type: 'video' },
    { id: 6, image: 'https://images.unsplash.com/photo-1588964895597-a51e21f816d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', type: 'photo' },
    // 6 posts adicionais
    { id: 7, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', type: 'video' },
    { id: 8, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', type: 'article' },
    { id: 9, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', type: 'photo' },
    { id: 10, image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', type: 'video' },
    { id: 11, image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', type: 'article' },
    { id: 12, image: 'https://images.unsplash.com/photo-1516775080506-8b3d7c0f1698?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', type: 'photo' },
];

const MOCK_DONATIONS = [
    { id: 1, type: 'sent', amount: 'R$ 10,00', date: '2 dias atrás' },
    { id: 2, type: 'received', amount: 'R$ 50,00', date: '5 dias atrás' },
    { id: 3, type: 'sent', amount: 'R$ 25,00', date: '1 semana atrás' },
];

const Profile = () => {
    return (
        <div className="page-profile">
            <TopBar transparent title="Perfil" showBack />
            <ProfileHeader user={MOCK_USER} isOwnProfile={true} />
            <ProfileTabs posts={MOCK_POSTS} donations={MOCK_DONATIONS} />
        </div>
    );
};

export default Profile;
