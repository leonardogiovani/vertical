import React, { useMemo, useState, useEffect } from 'react';
import { TopBar } from '../components/layout/TopBar';
import { Plus, MapPin } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import './Donate.css';

const MOCK_ITEMS = [
  // Doações
  {
    id: '1',
    title: 'Cadeira de Escritório',
    description: 'Cadeira usada mas em bom estado.',
    type: 'donation',
    user: { name: 'Ana Silva', avatar: 'https://i.pravatar.cc/150?u=1' },
    location: { bairro: 'Centro', cidade: 'São Paulo', estado: 'SP', pais: 'Brasil' },
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    title: 'Roupas de Bebê',
    description: 'Várias peças de roupa para recém nascido.',
    type: 'donation',
    user: { name: 'Mariana Lima', avatar: 'https://i.pravatar.cc/150?u=2' },
    location: { bairro: 'Vila Madalena', cidade: 'São Paulo', estado: 'SP', pais: 'Brasil' },
    videos: ['https://www.w3schools.com/html/mov_bbb.mp4']
  },
  // Pedidos
  {
    id: '9',
    title: 'Livros Escolares',
    description: 'Preciso de livros do 6º ano para meu filho.',
    type: 'request',
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
    user: { name: 'Maria Silva', avatar: 'https://i.pravatar.cc/150?u=10' },
    location: { bairro: 'Grajaú', cidade: 'São Paulo', estado: 'SP', pais: 'Brasil' },
    campaignStats: { collected: 50, target: 200 },
    validity: '2023-11-30'
  }
];

const ItemCard = ({ item, onClick, onFeaturedClick }) => (
  <div 
    className="card"
    style={{
      background: 'var(--color-surface)',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
      cursor: 'pointer'
    }}
    onClick={() => onClick(item)}
  >
    <div style={{ position: 'relative' }}>
      <img 
        src={item.imageUrl || 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=500&q=60'} 
        alt={item.title}
        style={{ width: '100%', height: 180, objectFit: 'cover' }}
      />
      {item.isFeatured && (
        <button
          onClick={(e) => { e.stopPropagation(); onFeaturedClick && onFeaturedClick(); }}
          style={{
            position: 'absolute', top: 12, right: 12, padding: '6px 10px',
            borderRadius: 20, background: 'rgba(255,255,255,0.9)', border: 'none',
            fontSize: 12, fontWeight: 600
          }}
        >
          Em Destaque
        </button>
      )}
    </div>
    <div style={{ padding: '12px 14px' }}>
      <h4 style={{ margin: 0, fontSize: 16 }}>{item.title}</h4>
      <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--color-text-secondary)' }}>{item.description}</p>
    </div>
  </div>
);

const SimpleCreateModal = ({ isOpen, onClose, onSubmit, initialType }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(initialType || 'donation');

  useEffect(() => { setType(initialType || 'donation'); }, [initialType]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({ title, description, type });
    onClose();
    setTitle('');
    setDescription('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar" type="center">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="donation">Doação</option>
          <option value="request">Pedido</option>
        </select>
        <input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button className="donate-btn-primary" onClick={handleSubmit}>Salvar</button>
      </div>
    </Modal>
  );
};

const Donate = () => {
  const [activeTab, setActiveTab] = useState('donation');
  const [items, setItems] = useState(MOCK_ITEMS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab === 'donation' || tab === 'request') setActiveTab(tab);
  }, []);

  const filteredItems = useMemo(() => items.filter(i => i.type === activeTab), [items, activeTab]);

  const allMedia = useMemo(() => {
    if (!selectedItem) return [];
    const base = [];
    if (selectedItem.imageUrl) base.push({ type: 'image', url: selectedItem.imageUrl });
    (selectedItem.images || []).forEach(url => base.push({ type: 'image', url }));
    (selectedItem.videos || []).forEach(url => base.push({ type: 'video', url }));
    return base;
  }, [selectedItem]);

  useEffect(() => {
    setActiveMediaIndex(0);
    setReason('');
  }, [selectedItem]);

  const handleCreateItem = (newItem) => {
    const item = { ...newItem, id: Math.random().toString(36).slice(2), imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=500&q=60' };
    setItems([item, ...items]);
  };

  return (
    <div className="page-donate">
      <TopBar title="Doar" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setActiveTab('donation')} className={`filter-chip ${activeTab === 'donation' ? 'active' : ''}`}>Quero Doar</button>
          <button onClick={() => setActiveTab('request')} className={`filter-chip ${activeTab === 'request' ? 'active' : ''}`}>Quero Ajudar</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {filteredItems.map(item => (
          <ItemCard key={item.id} item={item} onClick={setSelectedItem} onFeaturedClick={() => {}} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
          <p>Nenhum item encontrado nesta categoria.</p>
        </div>
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: 64, height: 64, borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 90, border: 'none' }}
      >
        <Plus size={32} />
      </button>

      <SimpleCreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateItem} initialType={activeTab} />

      {selectedItem && (
        <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem.title} type="center" preventClose={false}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '100%', backgroundColor: '#000', height: 400, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {allMedia.length > 0 && allMedia[activeMediaIndex]?.type === 'image' && (
                <img src={allMedia[activeMediaIndex].url} alt={selectedItem.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
              {allMedia.length > 0 && allMedia[activeMediaIndex]?.type === 'video' && (
                <video src={allMedia[activeMediaIndex].url} controls style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
              {allMedia.length > 1 && (
                <div style={{ position: 'absolute', bottom: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', width: '100%' }}>
                  {allMedia.map((_, idx) => (
                    <button key={idx} onClick={() => setActiveMediaIndex(idx)} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: activeMediaIndex === idx ? 'var(--color-primary)' : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer' }} />
                  ))}
                </div>
              )}
            </div>
            <div style={{ padding: '2rem', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {selectedItem.type === 'donation' ? 'Doação' : 'Campanha'}
              </div>
              <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>{selectedItem.title}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#bdbdbd', backgroundImage: selectedItem.user?.avatar ? `url(${selectedItem.user.avatar})` : 'none', backgroundSize: 'cover' }} />
                <div>
                  <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{selectedItem.user?.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Publicado em {new Date().toLocaleDateString()}</div>
                </div>
              </div>
              {selectedItem.location && (
                <div style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} /> {selectedItem.location.bairro}, {selectedItem.location.cidade} - {selectedItem.location.estado}
                </div>
              )}
              <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '2rem' }}>{selectedItem.description}</p>
              {selectedItem.type === 'donation' && (
                <form onSubmit={(e) => { e.preventDefault(); alert('Solicitação enviada com sucesso!'); setSelectedItem(null); }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Por que você precisa deste item?</label>
                  <textarea maxLength={1000} required rows={4} placeholder="Conte um pouco sobre sua história..." value={reason} onChange={(e) => setReason(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 4, border: '1px solid var(--color-border)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical', marginBottom: '0.5rem' }} />
                  <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{reason.length}/1000</div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Solicitar Doação</button>
                </form>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Donate;