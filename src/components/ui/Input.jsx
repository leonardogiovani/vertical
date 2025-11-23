import React from 'react';
import './Input.css';

export const Input = ({
    label,
    error,
    icon,
    className = '',
    type = 'text',
    ...props
}) => {
    return (
        <div className={`input-wrapper ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <div className="input-container">
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    className={`input-field ${error ? 'input-error' : ''} ${icon ? 'input-with-icon' : ''}`}
                    type={type}
                    {...props}
                />
            </div>
            {error && <span className="input-error-msg">{error}</span>}
        </div>
    );
};
