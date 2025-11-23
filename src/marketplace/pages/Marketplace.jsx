import React, { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import CreateModal from '../components/CreateModal';
import ItemDetailModal from '../components/ItemDetailModal';
import BenevolentScoreModal from '../components/BenevolentScoreModal';
import FilterBar from '../components/FilterBar';
import { Plus } from 'lucide-react';
import '../../styles/marketplace.css';

const MOCK_ITEMS = [
    {
        id: '1',
        title: 'Cadeira de Escritório',
        description: 'Cadeira usada mas em bom estado. Estou doando pois comprei uma nova.',
        type: 'donation',
        createdAt: '2023-10-27T10:00:00Z',
        user: { name: 'Ana Silva', avatar: 'https://i.pravatar.cc/150?u=1' },
        location: { bairro: 'Centro', cidade: 'São Paulo', estado: 'SP', pais: 'Brasil' },
        isFeatured: true,
        imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=500&q=60',
        images: [
            'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=500&q=60'
        ]
    },
    {
        id: '2',
        title: 'Roupas de Bebê',
        description: 'Várias peças de roupa para recém nascido. Menino.',
        type: 'donation',
        createdAt: '2023-10-29T09:15:00Z',
        user: { name: 'Mariana Lima', avatar: 'https://i.pravatar.cc/150?u=2' },
        location: { bairro: 'Vila Madalena', cidade: 'São Paulo', estado: 'SP', pais: 'Brasil' },
        videos: ['https://www.w3schools.com/html/mov_bbb.mp4']
    },
    {
        id: '3',
        title: 'Livros de Ficção',
        description: 'Coleção de livros de Harry Potter.',
        type: 'donation',
        createdAt: '2023-10-30T14:00:00Z',
        user: { name: 'Pedro Santos', avatar: 'https://i.pravatar.cc/150?u=3' },
        location: { bairro: 'Copacabana', cidade: 'Rio de Janeiro', estado: 'RJ', pais: 'Brasil' }
    },
    {
        id: '4',
        title: 'Mesa de Jantar',
        description: 'Mesa de madeira com 4 cadeiras.',
        type: 'donation',
        createdAt: '2023-11-01T11:30:00Z',
        user: { name: 'Julia Costa', avatar: 'https://i.pravatar.cc/150?u=4' },
        location: { bairro: 'Savassi', cidade: 'Belo Horizonte', estado: 'MG', pais: 'Brasil' },
        isFeatured: true
    },
    {
        id: '5',
        title: 'Teclado Musical',
        description: 'Teclado Casio antigo, funcionando perfeitamente.',
        type: 'donation',
        createdAt: '2023-11-02T16:45:00Z',
        user: { name: 'Lucas Oliveira', avatar: 'https://i.pravatar.cc/150?u=5' },
        location: { bairro: 'Centro', cidade: 'Curitiba', estado: 'PR', pais: 'Brasil' }
    },
    {
        id: '6',
        title: 'Bicicleta Aro 26',
        description: 'Precisa de reparo no pneu traseiro.',
        type: 'donation',
        createdAt: '2023-11-03T08:20:00Z',
        user: { name: 'Fernanda Souza', avatar: 'https://i.pravatar.cc/150?u=6' },
        location: { bairro: 'Boa Viagem', cidade: 'Recife', estado: 'PE', pais: 'Brasil' }
    },
    {
        id: '7',
        title: 'Monitor 19"',
        description: 'Monitor LCD antigo.',
        type: 'donation',
        createdAt: '2023-11-04T13:10:00Z',
        user: { name: 'Ricardo Almeida', avatar: 'https://i.pravatar.cc/150?u=7' },
        location: { bairro: 'Barra', cidade: 'Salvador', estado: 'BA', pais: 'Brasil' }
    },
    {
        id: '8',
        title: 'Roupas Femininas',
        description: 'Lote de roupas tamanho M.',
        type: 'donation',
        createdAt: '2023-11-05T10:00:00Z',
        user: { name: 'Camila Rocha', avatar: 'https://i.pravatar.cc/150?u=8' },
        location: { bairro: 'Centro', cidade: 'Porto Alegre', estado: 'RS', pais: 'Brasil' }
    },
    {
        id: '9',
        title: 'Livros Escolares',
        description: 'Preciso de livros do 6º ano para meu filho.',
        type: 'request',
        createdAt: '2023-10-28T14:30:00Z',
        user: { name: 'Carlos Souza', avatar: 'https://i.pravatar.cc/150?u=9' },
        location: { bairro: 'Centro', cidade: 'São Paulo', estado: 'SP', pais: 'Brasil' },
        campaignStats: { collected: 150, target: 500 },
        validity: '2023-12-31',
        isFeatured: true
    },
    {
        id: '10',
        title: 'Cesta Básica',
        description: 'Estamos passando por dificuldades e precisamos de alimentos.',
        type: 'request',
        createdAt: '2023-10-31T09:00:00Z',
        user: { name: 'Maria Silva', avatar: 'https://i.pravatar.cc/150?u=10' },
        location: { bairro: 'Grajaú', cidade: 'São Paulo', estado: 'SP', pais: 'Brasil' },
        campaignStats: { collected: 50, target: 200 },
        validity: '2023-11-30'
    },
];

const Marketplace = () => {
    const [activeTab, setActiveTab] = useState('donation');
    const [items, setItems] = useState(MOCK_ITEMS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [useInlineModal, setUseInlineModal] = useState(false);
    const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

    const [filterBairro, setFilterBairro] = useState('');
    const [filterCidade, setFilterCidade] = useState('');
    const [filterEstado, setFilterEstado] = useState('');
    const [filterPais, setFilterPais] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const open = params.get('open');
        const type = params.get('type');
        if (open === 'create') {
            setIsModalOpen(true);
        }
        if (type === 'donation' || type === 'request') {
            setActiveTab(type);
        }
    }, []);

    const filteredItems = items.filter(item => {
        if (item.type !== activeTab) return false;
        if (filterBairro && !item.location?.bairro.toLowerCase().includes(filterBairro.toLowerCase())) return false;
        if (filterCidade && !item.location?.cidade.toLowerCase().includes(filterCidade.toLowerCase())) return false;
        if (filterEstado && !item.location?.estado.toLowerCase().includes(filterEstado.toLowerCase())) return false;
        if (filterPais && !item.location?.pais.toLowerCase().includes(filterPais.toLowerCase())) return false;
        return true;
    });

    const handleCreateItem = (newItem) => {
        const item = { ...newItem, id: Math.random().toString(36).substr(2, 9) };
        setItems([item, ...items]);
    };

    const handleRequestItem = (itemId, reason) => {
        console.log('Requesting item:', itemId, 'Reason:', reason);
        alert('Solicitação enviada com sucesso! O doador receberá sua mensagem.');
    };

    

    useEffect(() => {
        if (isModalOpen) {
            setUseInlineModal(false);
            setTimeout(() => {
                const el = document.querySelector('.modal-overlay');
                setUseInlineModal(!el);
            }, 50);
        } else {
            setUseInlineModal(false);
        }
    }, [isModalOpen]);

    const [fallbackTitle, setFallbackTitle] = useState('');
    const [fallbackDesc, setFallbackDesc] = useState('');
    const [fallbackType, setFallbackType] = useState(activeTab);

    useEffect(() => {
        setFallbackType(activeTab);
    }, [activeTab]);

    const handleFallbackSubmit = () => {
        if (!fallbackTitle.trim() || !fallbackDesc.trim()) return;
        handleCreateItem({ title: fallbackTitle, description: fallbackDesc, type: fallbackType, createdAt: new Date().toISOString() });
        setIsModalOpen(false);
        setFallbackTitle('');
        setFallbackDesc('');
    };

    return (
        <div style={{ position: 'relative', minHeight: '80vh' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'nowrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'nowrap' }}>
                    <button onClick={() => setActiveTab('request')} className={`tab-btn ${activeTab === 'request' ? 'active' : ''}`}>Apoiar Causas</button>
                    <button onClick={() => setActiveTab('donation')} className={`tab-btn ${activeTab === 'donation' ? 'active' : ''}`}>Doações</button>
                </div>
            </div>

            {(filterBairro || filterCidade || filterEstado || filterPais) && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {filterBairro && <span className="filter-chip">Bairro: {filterBairro}</span>}
                    {filterCidade && <span className="filter-chip">Cidade: {filterCidade}</span>}
                    {filterEstado && <span className="filter-chip">Estado: {filterEstado}</span>}
                    {filterPais && <span className="filter-chip">País: {filterPais}</span>}
                </div>
            )}

            {/* Filtros controlados externamente com overlay fixo */}
            <FilterBar
                hideButton
                isOpen={isFilterOpen}
                onToggle={(open) => setIsFilterOpen(open)}
                onFilterChange={(filters) => {
                    setFilterBairro(filters.bairro);
                    setFilterCidade(filters.cidade);
                    setFilterEstado(filters.estado);
                    setFilterPais(filters.pais);
                }}
            />

            <div className="marketplace-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
                {filteredItems.map(item => (
                    <ItemCard key={item.id} item={item} onClick={(item) => setSelectedItem(item)} onFeaturedClick={() => setIsScoreModalOpen(true)} />
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                    <p>Nenhum item encontrado nesta categoria com estes filtros.</p>
                </div>
            )}

            <div className="bottom-controls">
                <button className="filter-fab" onClick={() => setIsFilterOpen(true)} aria-label="Abrir filtros">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-filter">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                </button>
                <button
                    className="page-fab"
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Criar item"
                >
                    <Plus size={32} color="white" />
                </button>
            </div>

            <CreateModal isOpen={!useInlineModal && isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateItem} initialType={activeTab} />

            {isModalOpen && useInlineModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000 }}>
                    <div style={{ backgroundColor: 'var(--color-background)', padding: '1.5rem', borderRadius: '8px', width: '100%', maxWidth: '520px', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, color: 'var(--color-text-primary)' }}>Criar Novo Item</h3>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>✕</button>
                        </div>
                        <select value={fallbackType} onChange={(e) => setFallbackType(e.target.value)} style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }}>
                            <option value="donation">Doação</option>
                            <option value="request">Pedido</option>
                        </select>
                        <input placeholder="Título" value={fallbackTitle} onChange={(e) => setFallbackTitle(e.target.value)} style={{ padding: '0.75rem', borderRadius: 4, border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }} />
                        <textarea placeholder="Descrição" value={fallbackDesc} onChange={(e) => setFallbackDesc(e.target.value)} rows={4} style={{ padding: '0.75rem', borderRadius: 4, border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }} />
                        <button onClick={handleFallbackSubmit} className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            )}

            <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} onRequest={handleRequestItem} />

            <BenevolentScoreModal isOpen={isScoreModalOpen} onClose={() => setIsScoreModalOpen(false)} />
        </div>
    );
};

export default Marketplace;