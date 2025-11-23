import React from 'react';
import './FilterChips.css';

export const FilterChips = ({ filters, activeFilter, onSelect }) => {
    return (
        <div className="filter-chips-container no-scrollbar">
            {filters.map(filter => (
                <button
                    key={filter.id}
                    className={`filter-chip ${activeFilter === filter.id ? 'active' : ''}`}
                    onClick={() => onSelect(filter.id)}
                >
                    {filter.icon && <span className="chip-icon">{filter.icon}</span>}
                    {filter.label}
                </button>
            ))}
        </div>
    );
};
