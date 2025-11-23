import React from 'react';
import { MapPin, Camera, Video, Star } from 'lucide-react';

export interface Item {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    user: {
        name: string;
        avatar?: string;
    };
    type: 'donation' | 'request';
    createdAt: string;
    location?: {
        bairro: string;
        cidade: string;
        estado: string;
        pais: string;
    };
    isFeatured?: boolean;
    validity?: string;
    campaignStats?: {
        collected: number;
        target: number;
    };
    images?: string[];
    videos?: string[];
}

interface ItemCardProps {
    item: Item;
    onClick: (item: Item) => void;
    onFeaturedClick?: (item: Item) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick, onFeaturedClick }) => {
    const progress = item.campaignStats
        ? Math.min((item.campaignStats.collected / item.campaignStats.target) * 100, 100)
        : 0;

    return (
        <div
            className={item.isFeatured ? 'featured-card' : ''}
            onClick={() => onClick(item)}
            style={{
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: 'var(--card-bg)',
                boxShadow: 'var(--shadow)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div
                className="item-card-image"
                style={{
                    height: '200px',
                    backgroundColor: '#e0e0e0',
                    backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#757575',
                    position: 'relative'
                }}
            >
                {!item.imageUrl && <span>No Image</span>}
                {item.isFeatured && (
                    <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        backgroundColor: '#00c853',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <Star size={12} fill="white" />
                        Destaque
                    </div>
                )}

                {/* Media Indicators */}
                {(item.images?.length || 0) + (item.videos?.length || 0) > 0 && (
                    <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        right: '8px',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                            <Camera size={12} /> {(item.images?.length || 0) + (item.imageUrl ? 1 : 0)}
                        </span>
                        {item.videos?.length ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                <Video size={12} /> {item.videos.length}
                            </span>
                        ) : null}
                    </div>
                )}
            </div>

            <div className="item-card-content" style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    color: item.type === 'donation' ? 'var(--color-primary)' : '#e91e63',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                }}>
                    {item.type === 'donation' ? 'Doação' : 'Pedido'}
                </div>

                <h3 className="item-card-title" style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{item.title}</h3>

                <p className="item-card-desc" style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {item.description}
                </p>

                {item.location && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} /> {item.location.cidade}, {item.location.estado}
                    </div>
                )}

                {item.campaignStats && (
                    <div style={{ marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
                            <span>R$ {item.campaignStats.collected}</span>
                            <span>Meta: R$ {item.campaignStats.target}</span>
                        </div>
                        <div style={{ width: '100%', height: '6px', backgroundColor: '#e0e0e0', borderRadius: '3px' }}>
                            <div style={{
                                width: `${progress}%`,
                                height: '100%',
                                backgroundColor: 'var(--color-primary)',
                                borderRadius: '3px'
                            }} />
                        </div>
                    </div>
                )}

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: '#bdbdbd',
                            backgroundImage: item.user.avatar ? `url(${item.user.avatar})` : 'none',
                            backgroundSize: 'cover'
                        }} />
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.user.name}</span>
                    </div>

                    {item.isFeatured && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onFeaturedClick && onFeaturedClick(item);
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#00c853',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            Saiba mais &gt;
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemCard;
