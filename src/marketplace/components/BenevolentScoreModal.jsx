import React from 'react';
import { X, Heart, Award, TrendingUp } from 'lucide-react';

const BenevolentScoreModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: 'var(--color-background)', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px', boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                    <X size={24} />
                </button>

                <h2 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Award size={28} color="#00c853" /> Score Benevolente
                </h2>

                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    Este item foi destacado pelo nosso algoritmo de benevolência! O Score Benevolente identifica campanhas e doações de alto impacto social.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ backgroundColor: 'rgba(0, 200, 83, 0.1)', padding: '0.8rem', borderRadius: '50%' }}>
                            <Heart size={24} color="#00c853" />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, color: 'var(--color-text-primary)' }}>Alto Engajamento</h4>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Muitas pessoas estão interagindo com este item.</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ backgroundColor: 'rgba(33, 150, 243, 0.1)', padding: '0.8rem', borderRadius: '50%' }}>
                            <TrendingUp size={24} color="#2196f3" />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, color: 'var(--color-text-primary)' }}>Relevância Comunitária</h4>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Item essencial para a comunidade local.</p>
                        </div>
                    </div>
                </div>

                <button onClick={onClose} className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
                    Entendi
                </button>
            </div>
        </div>
    );
};

export default BenevolentScoreModal;