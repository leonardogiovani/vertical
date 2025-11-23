import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../components/ui/Modal';
import { CreateOptions } from '../components/create/CreateOptions';
import { EditPostContainerNew as EditPostContainer } from '../components/editpost/EditPostContainerNew.jsx';
import './Create.css';

const Create = () => {
  const navigate = useNavigate();
  const [showEditPost, setShowEditPost] = useState(false);
  const [postType, setPostType] = useState('photo');
  const [showOptions, setShowOptions] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOptionSelect = (action) => {
    if (isTransitioning) return; // Prevent double clicks
    
    console.log('🎯 handleOptionSelect called with action:', action); // Debug
    const typeMap = {
      'video': 'reel',
      'photo': 'photo',
      'text': 'article',
      'item': 'item_donation',
      'campaign': 'campaign'
    };
    
    const mappedType = typeMap[action] || 'photo';
    console.log('📝 Mapped type:', mappedType); // Debug
    
    setIsTransitioning(true);
    setPostType(mappedType);
    
    // First hide the modal completely
    setShowOptions(false);
    
    // Wait for modal to unmount, then show EditPost
    setTimeout(() => {
      console.log('⏰ Setting showEditPost to true after delay'); // Debug
      setShowEditPost(true);
      setIsTransitioning(false);
    }, 600); // Increased delay to ensure modal is completely gone
    
    console.log('✅ State update scheduled - showEditPost should be true, showOptions should be false'); // Debug
  };

  const handleClose = () => {
    console.log('🚪 handleClose called - navigating to home'); // Debug
    navigate('/');
  };

  const handleSave = (draftData) => {
    console.log('Draft saved:', draftData);
    // Handle draft save logic here
  };

  const handlePublish = (publishedData) => {
    console.log('Post published:', publishedData);
    navigate('/');
  };

  console.log('🔄 Create component rendering - showEditPost:', showEditPost, 'showOptions:', showOptions, 'postType:', postType, 'isTransitioning:', isTransitioning); // Debug

  return (
    <div className="page-create">
      {/* Step 1: Options Modal */}
      <Modal 
        isOpen={showOptions} 
        onClose={handleClose}
        title=""
        preventClose={true} // Prevent closing via overlay click during selection
      >
        <CreateOptions onSelect={handleOptionSelect} />
      </Modal>

      {/* Step 2: EditPost Component */}
      {showEditPost && (
        <EditPostContainer
          postType={postType}
          onClose={handleClose}
          onSave={handleSave}
          onPublish={handlePublish}
        />
      )}
    </div>
  );
};

export default Create;
