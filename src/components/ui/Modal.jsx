import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import './Modal.css';

export const Modal = ({
    isOpen,
    onClose,
    children,
    title,
    type = 'bottom-sheet',
    preventClose = false
}) => {
    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => {
            if (e.key === 'Escape' && !preventClose) onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose, preventClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        console.log('🎯 Modal overlay clicked'); // Debug
        // Only close if the click is directly on the overlay, not on any child elements, and preventClose is false
        if (e.target === e.currentTarget && !preventClose) {
            onClose();
        }
    };

    const handleContentClick = (e) => {
        console.log('🎯 Modal content clicked - stopping propagation'); // Debug
        e.stopPropagation();
    };

    return createPortal(
        (
            <div
                className="modal-overlay"
                onClick={handleOverlayClick}
                style={type === 'center' ? { alignItems: 'center', justifyContent: 'center' } : undefined}
            >
                <div
                    className={`modal-content modal-${type}`}
                    onClick={handleContentClick}
                >
                    {type === 'bottom-sheet' && <div className="modal-drag-handle"></div>}

                    <div className="modal-header">
                        {title && <h3 className="modal-title">{title}</h3>}
                        <button className="modal-close" onClick={onClose}>
                            <X size={24} />
                        </button>
                    </div>

                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        ),
        document.body
    );
};
