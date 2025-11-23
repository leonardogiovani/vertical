import React from 'react';
import './Button.css';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled,
    className = '',
    ...props
}) => {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? <span className="btn-spinner"></span> : children}
        </button>
    );
};
