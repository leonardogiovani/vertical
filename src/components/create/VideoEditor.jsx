import React, { useState } from 'react';
import { X, Settings, Image as ImageIcon, RotateCcw, Music, Zap, Check } from 'lucide-react';
import './VideoEditor.css';

export const VideoEditor = ({ onClose, onNext }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [progress, setProgress] = useState(0);

    const toggleRecording = () => {
        if (isRecording) {
            setIsRecording(false);
            // Simulate finishing recording
            onNext();
        } else {
            setIsRecording(true);
            // Simulate progress
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsRecording(false);
                        onNext();
                        return 100;
                    }
                    return prev + 1;
                });
            }, 50);
        }
    };

    return (
        <div className="video-editor">
            {/* Top Bar */}
            <div className="editor-top-bar">
                <button className="editor-icon-btn" onClick={onClose}>
                    <X size={28} color="white" />
                </button>
                <button className="editor-icon-btn">
                    <Settings size={28} color="white" />
                </button>
            </div>

            {/* Camera Preview Placeholder */}
            <div className="camera-preview">
                <div className="camera-grid"></div>
                {isRecording && (
                    <div className="recording-indicator">
                        <div className="rec-dot"></div>
                        <span>00:{(progress / 100 * 15).toFixed(0).padStart(2, '0')}</span>
                    </div>
                )}
            </div>

            {/* Right Controls */}
            <div className="editor-right-controls">
                <button className="control-item">
                    <RotateCcw size={24} color="white" />
                    <span>Flip</span>
                </button>
                <button className="control-item">
                    <Zap size={24} color="white" />
                    <span>Flash</span>
                </button>
                <button className="control-item">
                    <Music size={24} color="white" />
                    <span>Som</span>
                </button>
                <button className="control-item">
                    <span>1x</span>
                    <span>Vel</span>
                </button>
            </div>

            {/* Bottom Controls */}
            <div className="editor-bottom-controls">
                <button className="gallery-btn">
                    <ImageIcon size={24} color="white" />
                </button>

                <button
                    className={`record-btn ${isRecording ? 'recording' : ''}`}
                    onClick={toggleRecording}
                >
                    <div className="record-inner"></div>
                    {isRecording && (
                        <svg className="progress-ring" width="80" height="80">
                            <circle
                                stroke="white"
                                strokeWidth="4"
                                fill="transparent"
                                r="38"
                                cx="40"
                                cy="40"
                                style={{ strokeDasharray: `${progress * 2.4} 251` }}
                            />
                        </svg>
                    )}
                </button>

                <button className="effects-btn">
                    <span>✨</span>
                </button>
            </div>
        </div>
    );
};
