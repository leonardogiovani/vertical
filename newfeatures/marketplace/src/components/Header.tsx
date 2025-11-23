import React from 'react';

interface HeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
    return (
        <header style={{
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 0',
            backgroundColor: 'var(--bg-primary)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ color: 'var(--color-primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Vertical Doe
                </h1>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button
                        onClick={toggleTheme}
                        className="btn btn-outline"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
