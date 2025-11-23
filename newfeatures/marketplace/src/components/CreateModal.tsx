import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, Video } from 'lucide-react';

interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialType?: 'donation' | 'request';
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onSubmit, initialType = 'donation' }) => {
    const [type, setType] = useState<'donation' | 'request'>(initialType);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');
    const [validity, setValidity] = useState('');

    // Media
    const [images, setImages] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    if (!isOpen) return null;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const newPreviews = [...imagePreviews];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);
    };

    const removeVideo = (index: number) => {
        const newVideos = [...videos];
        newVideos.splice(index, 1);
        setVideos(newVideos);

        const newPreviews = [...videoPreviews];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setVideoPreviews(newPreviews);
    };

    const isValid = () => {
        const nextErrors: Record<string, string> = {};
        if (!title || title.trim().length < 5) nextErrors.title = 'Título mínimo de 5 caracteres.';
        if (!description || description.trim().length < 10) nextErrors.description = 'Descrição mínima de 10 caracteres.';
        if (imagePreviews.length < 3) nextErrors.images = 'Mínimo de 3 fotos obrigatórias.';
        if (type === 'request' && !validity) nextErrors.validity = 'Data para concluir é obrigatória.';
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
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
            images: imagePreviews, // In a real app, this would be uploaded URLs
            videos: videoPreviews
        });
        // Reset form
        setTitle('');
        setDescription('');
        setBairro('');
        setCidade('');
        setEstado('');
        setPais('');
        setValidity('');
        setImages([]);
        setVideos([]);
        setImagePreviews([]);
        setVideoPreviews([]);
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                backgroundColor: 'var(--card-bg)',
                padding: '2rem',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: 'var(--shadow)',
                position: 'relative'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-secondary)'
                    }}
                >
                    <X size={24} />
                </button>

                <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Criar Novo Item</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Tipo</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="type"
                                    value="donation"
                                    checked={type === 'donation'}
                                    onChange={() => setType('donation')}
                                />
                                <span style={{ color: 'var(--text-primary)' }}>Quero Doar</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="type"
                                    value="request"
                                    checked={type === 'request'}
                                    onChange={() => setType('request')}
                                />
                                <span style={{ color: 'var(--text-primary)' }}>Quero Pedir Ajuda</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Título</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                        />
                        {errors.title && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.title}</div>}
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Descrição</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={4}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                        />
                        {errors.description && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.description}</div>}
                    </div>

                    {/* Media Uploads */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Fotos (Máx 10)</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            {imagePreviews.map((src, index) => (
                                <div key={index} style={{ position: 'relative', width: '80px', height: '80px' }}>
                                    <img src={src} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        style={{ position: 'absolute', top: -5, right: -5, background: 'red', color: 'white', borderRadius: '50%', width: '20px', height: '20px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            <label style={{
                                width: '80px',
                                height: '80px',
                                border: '2px dashed var(--border-color)',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)'
                            }}>
                                <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} />
                                <ImageIcon size={24} />
                            </label>
                        </div>
                        {errors.images && <div style={{ color: 'var(--danger)', fontSize: '0.8rem' }}>{errors.images}</div>}
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Vídeos (Máx 3)</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            {videoPreviews.map((src, index) => (
                                <div key={index} style={{ position: 'relative', width: '80px', height: '80px', backgroundColor: '#000', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <video src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                    <button
                                        type="button"
                                        onClick={() => removeVideo(index)}
                                        style={{ position: 'absolute', top: -5, right: -5, background: 'red', color: 'white', borderRadius: '50%', width: '20px', height: '20px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', zIndex: 10 }}
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            <label style={{
                                width: '80px',
                                height: '80px',
                                border: '2px dashed var(--border-color)',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)'
                            }}>
                                <input type="file" accept="video/*" multiple onChange={handleVideoChange} style={{ display: 'none' }} />
                                <Video size={24} />
                            </label>
                        </div>
                    </div>

                    {/* Location */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Bairro</label>
                            <input
                                type="text"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Cidade</label>
                            <input
                                type="text"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Estado</label>
                            <input
                                type="text"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>País</label>
                            <input
                                type="text"
                                value={pais}
                                onChange={(e) => setPais(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                            />
                        </div>
                    </div>

                    {type === 'request' && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Validade do Pedido</label>
                            <input
                                type="date"
                                value={validity}
                                onChange={(e) => setValidity(e.target.value)}
                                required
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                            />
                            {errors.validity && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{errors.validity}</div>}
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={imagePreviews.length < 3 || !title || !description || (type === 'request' && !validity)}>
                        Criar Campanha
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateModal;
