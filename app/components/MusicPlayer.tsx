'use client'
import React, { useRef, useState } from 'react';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';

// Add CSS for rotation
const rotationStyle = `
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.rotate {
    animation: rotate 15s linear infinite;
}
`;

const MusicPlayer: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <style>{rotationStyle}</style> {/* Inject the CSS for rotation */}
            {/* 图片路径在 app/assets/imgs/kosmos.webp */}
            <img
                title='kosmos!'
                className={`w-10 h-10 rounded-full ${isPlaying ? 'rotate' : ''}`} // Conditionally apply the rotate class
                src="/kosmos.webp"
                alt="kosmos!"
            />
            <audio ref={audioRef} src="/music/maybe-tomorrow.mp3" loop />
            <button className='text-2xl  mr-2 ml-2' onClick={togglePlayPause}>
                {isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
            </button>
        </div>
    );
};

export default MusicPlayer; 