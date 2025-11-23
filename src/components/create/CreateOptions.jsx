import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Image, FileText, Gift, ChevronRight } from 'lucide-react';
import './CreateOptions.css';

const OPTIONS = [
    {
        id: 'reels',
        icon: <Video size={32} color="#E91E63" />,
        title: 'Gravar Reels',
        description: 'Vídeo até 90s',
        action: 'video'
    },
    {
        id: 'photo',
        icon: <Image size={32} color="#2196F3" />,
        title: 'Foto ou Álbum',
        description: 'Até 10 fotos',
        action: 'photo'
    },
    {
        id: 'article',
        icon: <FileText size={32} color="#FF9800" />,
        title: 'Artigo Longo',
        description: 'Texto rico',
        action: 'text'
    },
    {
        id: 'donation',
        icon: <Gift size={32} color="#4CAF50" />,
        title: 'Doar Item Usado',
        description: 'Objetos físicos',
        action: 'item'
    },
    {
        id: 'campaign',
        icon: <Gift size={32} color="#9C27B0" />,
        title: 'Criar Campanha',
        description: 'Arrecadação ou ajuda',
        action: 'campaign'
    }
];

export const CreateOptions = ({ onSelect }) => {
    const navigate = useNavigate();

    const handleButtonClick = (action) => {
        console.log('🖱️ CreateOptions button clicked with action:', action);
        if (action === 'item') {
            navigate('/donations?open=create&type=donation');
            return;
        }
        if (action === 'campaign') {
            navigate('/donations?open=create&type=request');
            return;
        }
        if (onSelect) {
            onSelect(action);
        }
    };

    const handleButtonMouseDown = (e, action) => {
        console.log('🖱️ CreateOptions button MOUSEDOWN with action:', action); // Debug
        e.stopPropagation(); // Prevent event bubbling
    };

    return (
        <div className="create-options-list">
            <h2 className="create-title">O que você quer compartilhar?</h2>

            {OPTIONS.map(option => {
                const isLink = option.action === 'item' || option.action === 'campaign';
                const href = option.action === 'item'
                    ? '/donations?open=create&type=donation#type-donation'
                    : option.action === 'campaign'
                        ? '/donations?open=create&type=request#type-request'
                        : undefined;

                if (isLink) {
                    return (
                        <a
                            key={option.id}
                            className="create-option-card"
                            href={href}
                            onMouseDown={(e) => handleButtonMouseDown(e, option.action)}
                        >
                            <div className="option-icon-wrapper">
                                {option.icon}
                            </div>
                            <div className="option-content">
                                <h3 className="option-title">{option.title}</h3>
                                <span className="option-desc">{option.description}</span>
                            </div>
                            <ChevronRight size={20} color="var(--color-text-secondary)" />
                        </a>
                    );
                }

                return (
                    <button
                        key={option.id}
                        className="create-option-card"
                        onClick={() => handleButtonClick(option.action)}
                        onMouseDown={(e) => handleButtonMouseDown(e, option.action)}
                    >
                        <div className="option-icon-wrapper">
                            {option.icon}
                        </div>
                        <div className="option-content">
                            <h3 className="option-title">{option.title}</h3>
                            <span className="option-desc">{option.description}</span>
                        </div>
                        <ChevronRight size={20} color="var(--color-text-secondary)" />
                    </button>
                );
            })}
        </div>
    );
};
