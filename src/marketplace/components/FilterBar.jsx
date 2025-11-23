import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';

const FilterBar = ({ onFilterChange, hideButton = false, isOpen: externalOpen, onToggle }) => {
    const [isOpenInternal, setIsOpenInternal] = useState(false);
    const [openLocation, setOpenLocation] = useState(false);
    const [openAdvanced, setOpenAdvanced] = useState(false);
    const [filters, setFilters] = useState({ bairro: '', cidade: '', estado: '', pais: '' });

    useEffect(() => {
        const isOpen = externalOpen ?? isOpenInternal;
        if (isOpen) {
            setOpenLocation(false);
            setOpenAdvanced(false);
        }
    }, [externalOpen, isOpenInternal]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block', zIndex: 100 }}>
            {!hideButton && (
                <button
                    onClick={() => externalOpen === undefined ? setIsOpenInternal(!isOpenInternal) : onToggle && onToggle(!externalOpen)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
                        backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', borderRadius: '8px',
                        cursor: 'pointer', boxShadow: 'var(--shadow-md)', color: 'var(--color-text-primary)', fontWeight: 500
                    }}
                >
                    <Filter size={18} />
                    <span>Filtro</span>
                    <ChevronDown size={16} style={{ transform: (externalOpen ?? isOpenInternal) ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                </button>
            )}

            {(externalOpen ?? isOpenInternal) && (
                <Modal
                    isOpen={externalOpen ?? isOpenInternal}
                    onClose={() => externalOpen === undefined ? setIsOpenInternal(false) : onToggle && onToggle(false)}
                    title="Filtros"
                    type="center"
                    preventClose={true}
                >
                    <div style={{ borderBottom: '1px solid var(--color-border)', padding: '0.75rem 0' }}>
                        <button onClick={() => setOpenLocation(!openLocation)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                            <span>Localização</span>
                            <ChevronDown size={16} style={{ transform: openLocation ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                        </button>
                        {openLocation && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
                                <input name="bairro" value={filters.bairro} onChange={handleInputChange} placeholder="Bairro" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-text-primary)', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }} />
                                <input name="cidade" value={filters.cidade} onChange={handleInputChange} placeholder="Cidade" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-text-primary)', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }} />
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                     <input name="estado" value={filters.estado} onChange={handleInputChange} placeholder="Estado" style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-text-primary)', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }} />
                                     <input name="pais" value={filters.pais} onChange={handleInputChange} placeholder="País" style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-text-primary)', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ borderBottom: '1px solid var(--color-border)', padding: '0.75rem 0' }}>
                        <button onClick={() => setOpenAdvanced(!openAdvanced)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', color: 'var(--color-text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                            <span>Avançado</span>
                            <ChevronDown size={16} style={{ transform: openAdvanced ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                        </button>
                        {openAdvanced && (
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                                <span style={{ padding: '6px 10px', borderRadius: '999px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>Recentes</span>
                                <span style={{ padding: '6px 10px', borderRadius: '999px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>Mais próximos</span>
                                <span style={{ padding: '6px 10px', borderRadius: '999px', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>Relevância</span>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                        <button onClick={() => { const cleared = { bairro: '', cidade: '', estado: '', pais: '' }; setFilters(cleared); onFilterChange(cleared); }} style={{ flex: 1, padding: '0.75rem', borderRadius: 8, border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-primary)', fontWeight: 600 }}>Limpar</button>
                        <button onClick={() => externalOpen === undefined ? setIsOpenInternal(false) : onToggle && onToggle(false)} className="btn btn-primary" style={{ flex: 1, padding: '0.75rem', borderRadius: 8 }}>Aplicar</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default FilterBar;