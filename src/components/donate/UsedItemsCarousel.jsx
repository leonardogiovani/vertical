import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import './UsedItemsCarousel.css';

export const UsedItemsCarousel = ({ items }) => {
    return (
        <div className="used-items-section">
            <div className="section-header">
                <h3 className="section-title">Doar Itens Usados</h3>
                <button className="see-more-btn">Ver +</button>
            </div>

            <div className="used-items-carousel no-scrollbar">
                <button className="carousel-nav-btn prev">←</button>

                {items.map(item => (
                    <Card key={item.id} className="used-item-card" onClick={() => { }}>
                        <div className="used-item-image-wrapper">
                            <img src={item.image} alt={item.title} className="used-item-image" />
                            <div className="used-item-price-tag">Grátis</div>
                        </div>
                        <div className="used-item-details">
                            <h4 className="used-item-title">{item.title}</h4>
                            <span className="used-item-distance">{item.distance}</span>
                        </div>
                    </Card>
                ))}

                <div className="view-all-card">
                    <div className="view-all-circle">
                        <ArrowRight size={24} color="var(--color-primary)" />
                    </div>
                    <span>Ver tudo</span>
                </div>
            </div>
        </div>
    );
};
