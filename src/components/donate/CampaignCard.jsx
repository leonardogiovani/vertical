import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { DonationModal } from './DonationModal';
import './CampaignCard.css';

export const CampaignCard = ({ data, variant = 'grid' }) => {
    const [isDonationOpen, setIsDonationOpen] = useState(false);
    const progress = (data.raised / data.goal) * 100;
    const isFeatured = variant === 'featured';

    return (
        <Card className={`campaign-card ${isFeatured ? 'campaign-featured' : 'campaign-grid'}`}>
            <div className="campaign-image-wrapper">
                <img src={data.image} alt={data.title} className="campaign-image" />
                <div className="campaign-overlay-top">
                    {isFeatured && (
                        <div className="campaign-user">
                            <img src={data.user.avatar} alt={data.user.name} className="campaign-avatar" />
                            <span className="campaign-username">{data.user.name}</span>
                        </div>
                    )}
                    <button className="campaign-like-btn">
                        <Heart size={isFeatured ? 24 : 20} color="white" />
                    </button>
                </div>
            </div>

            <div className="campaign-content">
                <h3 className="campaign-title">{data.title}</h3>

                {isFeatured && (
                    <p className="campaign-description">{data.description}</p>
                )}

                <div className="campaign-progress-wrapper">
                    <div className="campaign-progress-bar">
                        <div
                            className="campaign-progress-fill"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                    </div>
                    <div className="campaign-stats">
                        <span className="campaign-raised">R$ {data.raised.toLocaleString()}</span>
                        <span className="campaign-goal">de R$ {data.goal.toLocaleString()}</span>
                    </div>
                    {isFeatured && (
                        <div className="campaign-meta">
                            {data.donors} doadores • {data.daysLeft} dias restantes
                        </div>
                    )}
                </div>

                <Button
                    variant="primary"
                    size={isFeatured ? 'lg' : 'sm'}
                    fullWidth
                    className="campaign-cta"
                    onClick={() => setIsDonationOpen(true)}
                >
                    {isFeatured ? '💚 DOAR AGORA' : 'DOAR R$1'}
                </Button>
            </div>

            <DonationModal
                isOpen={isDonationOpen}
                onClose={() => setIsDonationOpen(false)}
                campaign={data}
            />
        </Card>
    );
};
