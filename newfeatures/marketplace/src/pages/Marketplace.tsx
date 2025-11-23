import React, { useState, useEffect } from 'react';
import ItemCard, { type Item } from '../components/ItemCard';
import CreateModal from '../components/CreateModal';
import ItemDetailModal from '../components/ItemDetailModal';
import BenevolentScoreModal from '../components/BenevolentScoreModal';
import FilterBar from '../components/FilterBar';
import { Plus } from 'lucide-react';

const MOCK_ITEMS: Item[] = [
    // Donations (8 items)
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
    // Requests (7 items)
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
    {
        id: '11',
        title: 'Roupas de Frio',
        description: 'Para doação em abrigo de idosos.',
        type: 'request',
        createdAt: '2023-11-01T15:00:00Z',
        user: { name: 'Abrigo Esperança', avatar: 'https://i.pravatar.cc/150?u=11' },
        location: { bairro: 'Centro', cidade: 'Curitiba', estado: 'PR', pais: 'Brasil' },
        campaignStats: { collected: 800, target: 1000 },
        validity: '2024-01-15',
        isFeatured: true
    },
    {
        id: '12',
        title: 'Material de Construção',
        description: 'Para reforma de casa atingida por chuva.',
        type: 'request',
        createdAt: '2023-11-02T11:00:00Z',
        user: { name: 'João Pereira', avatar: 'https://i.pravatar.cc/150?u=12' },
        location: { bairro: 'Vila Nova', cidade: 'Blumenau', estado: 'SC', pais: 'Brasil' },
        campaignStats: { collected: 1200, target: 5000 },
        validity: '2024-02-28'
    },
    {
        id: '13',
        title: 'Notebook Usado',
        description: 'Para estudante universitário sem condições.',
        type: 'request',
        createdAt: '2023-11-03T14:20:00Z',
        user: { name: 'Felipe Santos', avatar: 'https://i.pravatar.cc/150?u=13' },
        location: { bairro: 'Liberdade', cidade: 'São Paulo', estado: 'SP', pais: 'Brasil' },
        campaignStats: { collected: 0, target: 1500 },
        validity: '2023-12-15'
    },
    {
        id: '14',
        title: 'Brinquedos',
        description: 'Para festa de natal comunitária.',
        type: 'request',
        createdAt: '2023-11-04T10:00:00Z',
        user: { name: 'Associação Viver', avatar: 'https://i.pravatar.cc/150?u=14' },
        location: { bairro: 'Rocinha', cidade: 'Rio de Janeiro', estado: 'RJ', pais: 'Brasil' },
        campaignStats: { collected: 300, target: 1000 },
        validity: '2023-12-20'
    },
    {
        id: '15',
        title: 'Ração para Cães',
        description: 'Abrigo de animais precisa de ração.',
        type: 'request',
        createdAt: '2023-11-05T09:30:00Z',
        user: { name: 'Abrigo Pet', avatar: 'https://i.pravatar.cc/150?u=15' },
        location: { bairro: 'Centro', cidade: 'Campinas', estado: 'SP', pais: 'Brasil' },
        campaignStats: { collected: 450, target: 2000 },
        validity: '2023-12-10'
    }
];

const Marketplace: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'donation' | 'request'>('donation');
    const [items, setItems] = useState<Item[]>(MOCK_ITEMS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [useInlineModal, setUseInlineModal] = useState(false);
    const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

    // Filters
    const [filterBairro, setFilterBairro] = useState('');
    const [filterCidade, setFilterCidade] = useState('');
    const [filterEstado, setFilterEstado] = useState('');
    const [filterPais, setFilterPais] = useState('');

    const filteredItems = items.filter(item => {
        if (item.type !== activeTab) return false;
        if (filterBairro && !item.location?.bairro.toLowerCase().includes(filterBairro.toLowerCase())) return false;
        if (filterCidade && !item.location?.cidade.toLowerCase().includes(filterCidade.toLowerCase())) return false;
        if (filterEstado && !item.location?.estado.toLowerCase().includes(filterEstado.toLowerCase())) return false;
        if (filterPais && !item.location?.pais.toLowerCase().includes(filterPais.toLowerCase())) return false;
        return true;
    });

    const handleCreateItem = (newItem: any) => {
        const item: Item = {
            ...newItem,
            id: Math.random().toString(36).substr(2, 9),
        };
        setItems([item, ...items]);
    };

    const handleRequestItem = (itemId: string, reason: string) => {
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
    const [fallbackType, setFallbackType] = useState<'donation' | 'request'>(activeTab);

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
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={() => setActiveTab('donation')}
                        className={`tab-btn ${activeTab === 'donation' ? 'active' : ''}`}
                    >
                        Quero Doar
                    </button>
                    <button
                        onClick={() => setActiveTab('request')}
                        className={`tab-btn ${activeTab === 'request' ? 'active' : ''}`}
                    >
                        Quero Ajudar
                    </button>
                </div>

                {/* Modern Filters */}
                <FilterBar
                    onFilterChange={(filters) => {
                        setFilterBairro(filters.bairro);
                        setFilterCidade(filters.cidade);
                        setFilterEstado(filters.estado);
                        setFilterPais(filters.pais);
                    }}
                />
            </div>

            <div
                className="marketplace-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem'
                }}
            >
                {filteredItems.map(item => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        onClick={(item) => setSelectedItem(item)}
                        onFeaturedClick={() => setIsScoreModalOpen(true)}
                    />
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                    <p>Nenhum item encontrado nesta categoria com estes filtros.</p>
                </div>
            )}

            {/* FAB */}
            <button
                onClick={() => setIsModalOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 90,
                    border: 'none'
                }}
            >
                <Plus size={32} />
            </button>

            <CreateModal
                isOpen={!useInlineModal && isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateItem}
                initialType={activeTab}
            />

            {isModalOpen && useInlineModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100000 }}>
                    <div style={{ backgroundColor: 'var(--card-bg)', padding: '1.5rem', borderRadius: '8px', width: '100%', maxWidth: '520px', boxShadow: 'var(--shadow)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Criar Novo Item</h3>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>✕</button>
                        </div>
                        <select value={fallbackType} onChange={(e) => setFallbackType(e.target.value as 'donation' | 'request')} style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                            <option value="donation">Doação</option>
                            <option value="request">Pedido</option>
                        </select>
                        <input placeholder="Título" value={fallbackTitle} onChange={(e) => setFallbackTitle(e.target.value)} style={{ padding: '0.75rem', borderRadius: 4, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                        <textarea placeholder="Descrição" value={fallbackDesc} onChange={(e) => setFallbackDesc(e.target.value)} rows={4} style={{ padding: '0.75rem', borderRadius: 4, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                        <button onClick={handleFallbackSubmit} className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            )}

            <ItemDetailModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
                onRequest={handleRequestItem}
            />

            <BenevolentScoreModal
                isOpen={isScoreModalOpen}
                onClose={() => setIsScoreModalOpen(false)}
            />
        </div>
    );
};

export default Marketplace;
