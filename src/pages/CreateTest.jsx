import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditPostContainerNew as EditPostContainer } from '../components/editpost/EditPostContainerNew.jsx';

const CreateTest = () => {
  const navigate = useNavigate();
  const [showEditPost, setShowEditPost] = useState(false);
  const [postType, setPostType] = useState('photo');

  console.log('🧪 CreateTest rendering - showEditPost:', showEditPost, 'postType:', postType);

  const handleOptionClick = (type) => {
    console.log('🧪 Option clicked:', type);
    setPostType(type);
    setShowEditPost(true);
  };

  const handleClose = () => {
    console.log('🧪 Close clicked');
    setShowEditPost(false);
  };

  const handleSave = (draftData) => {
    console.log('🧪 Draft saved:', draftData);
  };

  const handlePublish = (publishedData) => {
    console.log('🧪 Post published:', publishedData);
    navigate('/');
  };

  if (showEditPost) {
    console.log('🧪 Rendering EditPostContainer with postType:', postType);
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,0,0,0.3)', zIndex: 10000 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'yellow', padding: '20px' }}>
          <h1>🧪 EDITPOST SHOULD RENDER BELOW 🧪</h1>
          <EditPostContainer
            postType={postType}
            onClose={handleClose}
            onSave={handleSave}
            onPublish={handlePublish}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>🧪 CREATE TEST PAGE 🧪</h1>
      <p>Click a button to test EditPost:</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <button 
          onClick={() => handleOptionClick('photo')}
          style={{ padding: '20px', fontSize: '18px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          📸 Test Photo Post
        </button>
        
        <button 
          onClick={() => handleOptionClick('video')}
          style={{ padding: '20px', fontSize: '18px', backgroundColor: '#E91E63', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          🎥 Test Video Post
        </button>
        
        <button 
          onClick={() => handleOptionClick('article')}
          style={{ padding: '20px', fontSize: '18px', backgroundColor: '#FF9800', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          📝 Test Article Post
        </button>
      </div>
    </div>
  );
};

export default CreateTest;