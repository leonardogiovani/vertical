import React from 'react';
import { Settings, MoreVertical, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import './ProfileHeader.css';

export const ProfileHeader = ({ user, isOwnProfile }) => {
    return (
        <div className="profile-header">
            <div className="profile-avatar-section">
                <div className="profile-avatar-wrapper">
                    <img src={user.avatar} alt={user.name} className="profile-avatar" />
                </div>
            </div>

            <div className="profile-info">
                <div className="profile-name-row">
                    <h1 className="profile-name">{user.name}</h1>
                    {user.verified && <div className="verified-badge"><Check size={12} color="white" /></div>}
                </div>
                <span className="profile-username">@{user.username}</span>

                <p className="profile-bio">{user.bio}</p>
            </div>

            <div className="profile-stats">
                <div className="stat-item">
                    <span className="stat-value">{user.stats.donations}</span>
                    <span className="stat-label">Doações</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{user.stats.helped}</span>
                    <span className="stat-label">Ajudados</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{user.stats.dreams}</span>
                    <span className="stat-label">Sonhos</span>
                </div>
            </div>

            <div className="profile-actions">
                {isOwnProfile ? (
                    <>
                        <Button variant="outline" className="action-btn-lg">EDITAR PERFIL</Button>
                        <Button variant="outline" className="action-btn-sm">COMPARTILHAR</Button>
                    </>
                ) : (
                    <>
                        <Button variant="primary" className="action-btn-lg">SEGUIR</Button>
                        <Button variant="outline" className="action-btn-md">MENSAGEM</Button>
                        <Button variant="outline" className="action-btn-icon"><MoreVertical size={20} /></Button>
                    </>
                )}
            </div>
        </div>
    );
};
