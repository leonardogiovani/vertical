import React, { useState } from 'react';
import { ArrowLeft, MapPin, Hash, DollarSign, ChevronRight } from 'lucide-react';
import { TopBar } from '../layout/TopBar';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import './PostMetadata.css';

export const PostMetadata = ({ onBack, onPublish }) => {
    const [description, setDescription] = useState('');
    const [hasDonation, setHasDonation] = useState(false);
    const [goal, setGoal] = useState('');

    return (
        <div className="post-metadata-page">
            <TopBar
                title="Nova Publicação"
                showBack
                onBack={onBack}
                actions={
                    <Button variant="ghost" onClick={onPublish} style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>
                        PUBLICAR
                    </Button>
                }
            />

            <div className="metadata-content container">
                <div className="media-preview-row">
                    <div className="media-thumbnail">
                        <div className="play-icon-small">▶</div>
                    </div>
                    <div className="caption-input-wrapper">
                        <textarea
                            className="caption-textarea"
                            placeholder="Escreva uma legenda..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={2200}
                        />
                    </div>
                </div>
                <div className="char-counter">{description.length} / 2200</div>

                <div className="metadata-actions">
                    <button className="meta-action-btn">
                        <Hash size={20} />
                        <span>Adicionar hashtags</span>
                    </button>
                    <button className="meta-action-btn">
                        <MapPin size={20} />
                        <span>Adicionar localização</span>
                    </button>
                </div>

                <div className="donation-toggle-section">
                    <div className="toggle-header">
                        <div className="toggle-label">
                            <DollarSign size={20} color="var(--color-primary)" />
                            <span>Habilitar doações</span>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={hasDonation}
                                onChange={(e) => setHasDonation(e.target.checked)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    {hasDonation && (
                        <div className="donation-config">
                            <Input
                                label="Meta de Arrecadação (R$)"
                                placeholder="0,00"
                                type="number"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                icon={<span style={{ fontSize: '14px', fontWeight: 'bold' }}>R$</span>}
                            />
                            <div className="donation-type-options">
                                <label className="radio-option">
                                    <input type="radio" name="dtype" defaultChecked />
                                    <span>Meta específica</span>
                                </label>
                                <label className="radio-option">
                                    <input type="radio" name="dtype" />
                                    <span>Doação rápida R$1</span>
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                <div className="advanced-settings">
                    <span>Configurações Avançadas</span>
                    <ChevronRight size={20} />
                </div>
            </div>
        </div>
    );
};
