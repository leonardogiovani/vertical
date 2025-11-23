import React, { useState } from 'react';
import { X, MapPin, Heart } from 'lucide-react';
import type { Item } from './ItemCard';

interface ItemDetailModalProps {
    item: Item | null;
    onClose: () => void;
    onRequest: (itemId: string, reason: string) => void;
}

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, onRequest }) => {
    const [reason, setReason] = useState('');
    const [activeMediaIndex, setActiveMediaIndex] = useState(0);
    const [donationAmount, setDonationAmount] = useState<number | 'other' | null>(null);
    const [customAmount, setCustomAmount] = useState('');

    if (!item) return null;

    const allMedia = [
        ...(item.imageUrl ? [{ type: 'image', url: item.imageUrl }] : []),
        ...(item.images || []).map(url => ({ type: 'image', url })),
        ...(item.videos || []).map(url => ({ type: 'video', url }))
    ];

    const handleRequest = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = (reason || '').trim();
        if (trimmed.length < 30) {
            alert('Por favor, escreva pelo menos 30 caracteres para explicar sua necessidade.');
            return;
        }
        onRequest(item.id, trimmed);
        setReason('');
        onClose();
    };

    const handlePayment = () => {
        const amount = donationAmount === 'other' ? parseFloat(customAmount) : donationAmount;
        if (!amount || amount <= 0) {
            alert('Por favor, selecione um valor válido para doação.');
            return;
        }

        // Placeholder for Payment Gateway
        console.log(`Initiating payment of R$ ${amount} for item ${item.id}`);
        alert(`Redirecionando para o gateway de pagamento... (Valor: R$ ${amount})`);
        // Here we would integrate with Stripe, PayPal, or local gateway
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'var(--card-bg)',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: 'var(--shadow)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        cursor: 'pointer',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <X size={20} />
                </button>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Media Section */}
                    <div style={{
                        width: '100%',
                        backgroundColor: '#000',
                        height: '400px',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {allMedia.length > 0 ? (
                            <>
                                {allMedia[activeMediaIndex].type === 'image' ? (
                                    <img
                                        src={allMedia[activeMediaIndex].url}
                                        alt={item.title}
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <video
                                        src={allMedia[activeMediaIndex].url}
                                        controls
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                )}

                                {/* Navigation */}
                                {allMedia.length > 1 && (
                                    <div style={{ position: 'absolute', bottom: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', width: '100%' }}>
                                        {allMedia.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setActiveMediaIndex(index)}
                                                style={{
                                                    width: '10px',
                                                    height: '10px',
                                                    borderRadius: '50%',
                                                    backgroundColor: index === activeMediaIndex ? 'var(--color-primary)' : 'rgba(255,255,255,0.5)',
                                                    border: 'none',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div style={{ color: 'white' }}>Sem imagem</div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div style={{ padding: '2rem', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                        <div style={{
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            color: item.type === 'donation' ? 'var(--color-primary)' : '#e91e63',
                            fontWeight: 'bold',
                            marginBottom: '0.5rem'
                        }}>
                            {item.type === 'donation' ? 'Doação' : 'Pedido'}
                        </div>

                        <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>{item.title}</h2>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: '#bdbdbd',
                                backgroundImage: item.user.avatar ? `url(${item.user.avatar})` : 'none',
                                backgroundSize: 'cover'
                            }} />
                            <div>
                                <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{item.user.name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    Publicado em {new Date(item.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        {item.location && (
                            <div style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={16} /> {item.location.bairro}, {item.location.cidade} - {item.location.estado}
                            </div>
                        )}

                        <p style={{ color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '2rem' }}>
                            {item.description}
                        </p>

                        {item.type === 'donation' ? (
                            <form onSubmit={handleRequest}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                                    Por que você precisa deste item?
                                </label>
                                <textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    minLength={30}
                                    maxLength={1000}
                                    required
                                    rows={4}
                                    placeholder="Conte um pouco sobre sua história..."
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        borderRadius: '4px',
                                        border: '1px solid var(--color-border)',
                                        backgroundColor: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        resize: 'vertical',
                                        marginBottom: '0.5rem'
                                    }}
                                />
                                <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                    {reason.length}/1000
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                    Solicitar Doação
                                </button>
                            </form>
                        ) : (
                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                                <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Heart size={20} color="#e91e63" fill="#e91e63" /> Fazer uma Doação
                                </h3>
                                <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    Ajude esta causa com uma doação rápida.
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                                    {[1, 5, 10, 20, 50].map((amount) => (
                                        <button
                                            key={amount}
                                            onClick={() => setDonationAmount(amount)}
                                            style={{
                                                padding: '0.5rem',
                                                borderRadius: '4px',
                                                border: `1px solid ${donationAmount === amount ? 'var(--color-primary)' : 'var(--border-color)'}`,
                                                backgroundColor: donationAmount === amount ? 'var(--color-primary)' : 'transparent',
                                                color: donationAmount === amount ? 'white' : 'var(--text-primary)',
                                                cursor: 'pointer',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            R$ {amount}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setDonationAmount('other')}
                                        style={{
                                            padding: '0.5rem',
                                            borderRadius: '4px',
                                            border: `1px solid ${donationAmount === 'other' ? 'var(--color-primary)' : 'var(--border-color)'}`,
                                            backgroundColor: donationAmount === 'other' ? 'var(--color-primary)' : 'transparent',
                                            color: donationAmount === 'other' ? 'white' : 'var(--text-primary)',
                                            cursor: 'pointer',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Outro
                                    </button>
                                </div>

                                {donationAmount === 'other' && (
                                    <div style={{ marginBottom: '1rem' }}>
                                        <input
                                            type="number"
                                            value={customAmount}
                                            onChange={(e) => setCustomAmount(e.target.value)}
                                            placeholder="Digite o valor (R$)"
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem',
                                                borderRadius: '4px',
                                                border: '1px solid var(--border-color)',
                                                backgroundColor: 'var(--bg-secondary)',
                                                color: 'var(--text-primary)'
                                            }}
                                        />
                                    </div>
                                )}

                                <button
                                    className="btn btn-primary"
                                    style={{ width: '100%', backgroundColor: '#00c853' }}
                                    onClick={handlePayment}
                                    disabled={!donationAmount || (donationAmount === 'other' && !customAmount)}
                                >
                                    Doar Agora
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailModal;
