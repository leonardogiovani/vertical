import React, { useState, useMemo } from 'react';
import { X, ArrowLeft } from 'lucide-react';

const FILTERS = [
  { name: 'Normal', filter: '' },
  { name: 'Clarendon', filter: 'contrast(1.1) saturate(1.15) brightness(1.05)' },
  { name: 'Gingham', filter: 'brightness(1.05) sepia(0.2)' },
  { name: 'Moon', filter: 'grayscale(1) brightness(1.1) contrast(0.8)' },
  { name: 'Lark', filter: 'contrast(0.9) brightness(1.1) saturate(1.1)' },
  { name: 'Reyes', filter: 'sepia(0.4) brightness(1.1) contrast(0.85) saturate(0.75)' }
];

export const EditPostContainerNew = ({ postType = 'photo', onClose, onSave, onPublish }) => {
  const initialTab = useMemo(() => {
    if (postType === 'reel') return 'VIDEO';
    if (postType === 'article') return 'ARTIGO';
    return 'POST';
  }, [postType]);

  const [activeTab, setActiveTab] = useState(initialTab);
  const [step, setStep] = useState('UPLOAD');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [donationsEnabled, setDonationsEnabled] = useState(false);
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);

  const handleFileSelect = (selected) => {
    setFile(selected);
    const url = URL.createObjectURL(selected);
    setPreview(url);
  };

  const handleNext = () => {
    if (step === 'UPLOAD' && file) setStep('EDIT');
    else if (step === 'EDIT') setStep('DETAILS');
    else if (step === 'DETAILS') {
      const payload = { type: activeTab, caption, donationsEnabled };
      onPublish?.(payload);
      onClose?.();
    }
  };

  const handleBack = () => {
    if (step === 'DETAILS') setStep('EDIT');
    else if (step === 'EDIT') setStep('UPLOAD');
    else onClose?.();
  };

  const resetAndClose = () => {
    setStep('UPLOAD');
    setFile(null);
    setPreview(null);
    setCaption('');
    setDonationsEnabled(false);
    setActiveFilter(FILTERS[0]);
    onClose?.();
  };

  const acceptByType = activeTab === 'POST' ? 'image/*' : activeTab === 'VIDEO' ? 'video/*' : 'image/*,text/plain';

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={resetAndClose}>
      <div style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)', width: 'min(1024px, 96vw)', height: '85vh', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ height: 56, borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {step !== 'UPLOAD' ? (
              <button onClick={handleBack} aria-label="Voltar" style={{ background: 'none', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer' }}>
                <ArrowLeft size={24} />
              </button>
            ) : (
              <button onClick={resetAndClose} aria-label="Fechar" style={{ background: 'none', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            )}
            <span style={{ fontWeight: 700, fontSize: 18 }}>
              {step === 'UPLOAD' ? 'NOVO' : step === 'EDIT' ? 'EDITAR' : 'NOVA PUBLICAÇÃO'}
            </span>
          </div>

          {step === 'UPLOAD' && (
            <div style={{ display: 'flex', gap: 16, fontWeight: 600, fontSize: 14, color: 'var(--text-secondary)' }}>
              {['POST', 'VIDEO', 'ARTIGO'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: activeTab === tab ? 'var(--color-text-primary)' : 'var(--text-secondary)', borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent', paddingBottom: 10 }}>
                  {tab}
                </button>
              ))}
            </div>
          )}

          <button onClick={handleNext} disabled={!file && step === 'UPLOAD'} style={{ background: 'none', border: 'none', cursor: (!file && step === 'UPLOAD') ? 'not-allowed' : 'pointer', color: (!file && step === 'UPLOAD') ? 'var(--color-border)' : 'var(--color-primary)', fontWeight: 700, fontSize: 14 }}>
            {step === 'DETAILS' ? 'PUBLICAR' : 'PRÓXIMO'}
          </button>
        </div>

        <div style={{ flex: 1, display: 'flex', background: 'var(--bg-secondary)' }}>
          <div style={{ flex: step === 'DETAILS' ? 2 : 1, display: step === 'DETAILS' ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', borderRight: step === 'DETAILS' ? '1px solid var(--color-border)' : 'none' }}>
            {step === 'UPLOAD' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <input type="file" accept={acceptByType} onChange={(e) => e.target.files && e.target.files[0] && handleFileSelect(e.target.files[0])} />
              </div>
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-surface)' }}>
                {activeTab === 'POST' && preview && (
                  <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: activeFilter.filter }} />
                    </div>
                    <div style={{ width: 192, borderLeft: '1px solid var(--color-border)', overflowY: 'auto' }}>
                      <div style={{ padding: 12, display: 'grid', rowGap: 12 }}>
                        {FILTERS.map((filter) => (
                          <button key={filter.name} onClick={() => setActiveFilter(filter)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'none', border: 'none' }}>
                            <div style={{ width: 80, height: 80, borderRadius: 6, overflow: 'hidden', border: activeFilter.name === filter.name ? '2px solid var(--color-primary)' : '2px solid transparent' }}>
                              <img src={preview} alt={filter.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: filter.filter }} />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 500, color: activeFilter.name === filter.name ? 'var(--color-primary)' : 'var(--text-secondary)' }}>{filter.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'VIDEO' && preview && (
                  <video src={preview} controls style={{ maxWidth: '100%', maxHeight: '100%' }} />
                )}
                {activeTab === 'ARTIGO' && (
                  <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ borderBottom: '1px solid var(--color-border)', padding: 8, display: 'flex', gap: 8 }}>
                      <button style={{ padding: 8, borderRadius: 6, border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>B</button>
                      <button style={{ padding: 8, borderRadius: 6, border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>I</button>
                    </div>
                    <div style={{ flex: 1, overflow: 'auto' }}>
                      <textarea placeholder="Comece seu artigo..." style={{ width: '100%', height: '100%', padding: 16, border: 'none', outline: 'none', background: 'var(--color-surface)', color: 'var(--color-text-primary)' }} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {step === 'DETAILS' && (
            <div style={{ width: 360, background: 'var(--color-surface)', display: 'flex', flexDirection: 'column', borderLeft: '1px solid var(--color-border)' }}>
              <div style={{ padding: 16, borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 16, background: 'var(--bg-secondary)' }} />
                  <textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Escreva uma legenda..." style={{ flex: 1, background: 'transparent', border: 'none', resize: 'none', outline: 'none', color: 'var(--color-text-primary)' }} />
                </div>
              </div>

              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid var(--color-border)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-primary)' }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>Adicionar música</span>
                <span style={{ color: 'var(--text-secondary)' }}>›</span>
              </button>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid var(--color-border)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-primary)' }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>Marcar pessoas</span>
                <span style={{ color: 'var(--text-secondary)' }}>›</span>
              </button>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottom: '1px solid var(--color-border)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-primary)' }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>Adicionar localização</span>
                <span style={{ color: 'var(--text-secondary)' }}>›</span>
              </button>

              <div style={{ padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 20, height: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, border: '2px solid var(--color-text-primary)' }}>$</span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>Habilitar Doações</span>
                </span>
                <button onClick={() => setDonationsEnabled(!donationsEnabled)} style={{ width: 44, height: 24, borderRadius: 12, background: donationsEnabled ? 'var(--color-primary)' : 'var(--color-border)', border: 'none', position: 'relative', cursor: 'pointer' }}>
                  <span style={{ width: 20, height: 20, background: '#fff', borderRadius: 10, position: 'absolute', top: 2, left: donationsEnabled ? 22 : 2, transition: 'left .2s' }} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}