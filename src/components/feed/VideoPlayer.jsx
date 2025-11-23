import React, { useRef, useState, useEffect } from 'react';
import './VideoPlayer.css';

export const VideoPlayer = ({ src, poster, isActive }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (isActive) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    }, [isActive]);

    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className="video-container" onClick={togglePlay}>
            <video
                ref={videoRef}
                className="video-element"
                src={src}
                poster={poster}
                loop
                playsInline
                muted // Start muted to allow autoplay policy
            />
            {!isPlaying && (
                <div className="play-overlay">
                    <div className="play-icon">▶</div>
                </div>
            )}
        </div>
    );
};
