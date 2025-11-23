import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, Video } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';

const CreateModal = ({ isOpen, onClose, onSubmit, initialType = 'donation' }) => {
    const [type, setType] = useState(initialType);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');
    const [validity, setValidity] = useState('');

    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [videoPreviews, setVideoPreviews] = useState([]);
    const [errors, setErrors] = useState({});
    const [maxValue, setMaxValue] = useState('');

    React.useEffect(() => {
        if (!isOpen) return;
        const params = new URLSearchParams(window.location.search);
        const urlType = params.get('type');
        if (urlType === 'donation' || urlType === 'request') {
            setType(urlType);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleImageChange = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            if (images.length + newFiles.length > 10) {
                alert('Máximo de 10 fotos permitidas.');
                return;
            }
            setImages([...images, ...newFiles]);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setImagePreviews([...imagePreviews, ...newPreviews]);
        }
    };

    const handleVideoChange = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            if (videos.length + newFiles.length > 3) {
                alert('Máximo de 3 vídeos permitidos.');
                return;
            }
            setVideos([...videos, ...newFiles]);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setVideoPreviews([...videoPreviews, ...newPreviews]);
        }
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const newPreviews = [...imagePreviews];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);
    };

    const removeVideo = (index) => {
        const newVideos = [...videos];
        newVideos.splice(index, 1);
        setVideos(newVideos);

        const newPreviews = [...videoPreviews];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setVideoPreviews(newPreviews);
    };

    const isValid = () => {
        const nextErrors = {};
        if (!title || title.trim().length < 5) nextErrors.title = 'Título mínimo de 5 caracteres.';
        if (!description || description.trim().length < 10) nextErrors.description = 'Descrição mínima de 10 caracteres.';
        if (imagePreviews.length < 3) nextErrors.images = 'Mínimo de 3 fotos obrigatórias.';
        if (type === 'request' && !validity) nextErrors.validity = 'Data para concluir é obrigatória.';
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid()) return;
        onSubmit({
            title,
            description,
            type,
            createdAt: new Date().toISOString(),
            user: { name: 'Você', avatar: '' },
            location: { bairro, cidade, estado, pais },
            validity: type === 'request' ? validity : undefined,
            campaignStats: type === 'request' && maxValue ? { collected: 0, target: parseFloat(maxValue) } : undefined,
            images: imagePreviews,
            videos: videoPreviews
        });
        setTitle('');
        setDescription('');
        setBairro('');
        setCidade('');
        setEstado('');
        setPais('');
        setValidity('');
        setMaxValue('');
        setImages([]);
        setVideos([]);
        setImagePreviews([]);
        setVideoPreviews([]);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Criar Novo Item" type="center" preventClose={true}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Tipo</label>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                        <label id="type-donation" className={`tab-btn ${type === 'donation' ? 'active' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem 1rem' }}>
                            <input type="radio" name="type" value="donation" checked={type === 'donation'} onChange={() => setType('donation')} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                            <span>Quero Doar</span>
                        </label>
                        <label id="type-request" className={`tab-btn ${type === 'request' ? 'active' : ''}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.5rem 1rem' }}>
                            <input type="radio" name="type" value="request" checked={type === 'request'} onChange={() => setType('request')} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
                            <span>Criar campanha</span>
                        </label>
                    </div>
                </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Título</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)' }} />
                    {errors.title && <div style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.title}</div>}
                    </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Descrição</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)' }} />
                    {errors.description && <div style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.description}</div>}
                </div>

                {type === 'request' && (
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Valor máximo da campanha (opcional)</label>
                        <input type="number" min="0" step="0.01" value={maxValue} onChange={(e) => setMaxValue(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)' }} />
                    </div>
                )}

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Fotos (Máx 10)</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            {imagePreviews.map((src, index) => (
                                <div key={index} style={{ position: 'relative', width: '80px', height: '80px' }}>
                                    <img src={src} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                    <button type="button" onClick={() => removeImage(index)} style={{ position: 'absolute', top: -5, right: -5, background: 'red', color: 'white', borderRadius: '50%', width: '20px', height: '20px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            <label style={{ width: '80px', height: '80px', border: '2px dashed var(--color-border)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                                <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} />
                                <ImageIcon size={24} />
                            </label>
                        </div>
                        {errors.images && <div style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.images}</div>}
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Vídeos (Máx 3)</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            {videoPreviews.map((src, index) => (
                                <div key={index} style={{ position: 'relative', width: '80px', height: '80px', backgroundColor: '#000', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <video src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                    <button type="button" onClick={() => removeVideo(index)} style={{ position: 'absolute', top: -5, right: -5, background: 'red', color: 'white', borderRadius: '50%', width: '20px', height: '20px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', zIndex: 10 }}>
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            <label style={{ width: '80px', height: '80px', border: '2px dashed var(--color-border)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                                <input type="file" accept="video/*" multiple onChange={handleVideoChange} style={{ display: 'none' }} />
                                <Video size={24} />
                            </label>
                        </div>
                    </div>

                    {type === 'request' && (
                        <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Validade (opcional)</label>
                            <input type="date" value={validity} onChange={(e) => setValidity(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)' }} />
                            {errors.validity && <div style={{ color: 'var(--color-error)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.validity}</div>}
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Bairro</label>
                            <input value={bairro} onChange={(e) => setBairro(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Cidade</label>
                            <input value={cidade} onChange={(e) => setCidade(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Estado</label>
                            <input value={estado} onChange={(e) => setEstado(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>País</label>
                            <input value={pais} onChange={(e) => setPais(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text-primary)' }} />
                        </div>
                    </div>

                <button type="submit" className="btn btn-primary" disabled={imagePreviews.length < 3 || !title || !description || (type === 'request' && !validity)}>Salvar</button>
            </form>
        </Modal>
    );
};

export default CreateModal;