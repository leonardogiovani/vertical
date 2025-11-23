import React, { useState, useRef, useEffect } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface FilterBarProps {
    onFilterChange: (filters: { bairro: string; cidade: string; estado: string; pais: string }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({ bairro: '', cidade: '', estado: '', pais: '' });
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block', zIndex: 100 }} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow)',
                    color: 'var(--text-primary)',
                    fontWeight: 500
                }}
            >
                <Filter size={18} />
                <span>Filtro</span>
                <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    width: '280px',
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '1rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem'
                }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Bairro</label>
                        <input
                            name="bairro"
                            value={filters.bairro}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Cidade</label>
                        <input
                            name="cidade"
                            value={filters.cidade}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Estado</label>
                            <input
                                name="estado"
                                value={filters.estado}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>País</label>
                            <input
                                name="pais"
                                value={filters.pais}
                                onChange={handleInputChange}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterBar;
