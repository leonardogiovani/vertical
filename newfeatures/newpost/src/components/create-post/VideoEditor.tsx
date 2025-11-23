import { useState, useEffect, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface VideoEditorProps {
    file: File | null
}

export default function VideoEditor({ file }: VideoEditorProps) {
    const [src, setSrc] = useState<string | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file)
            setSrc(url)
            return () => URL.revokeObjectURL(url)
        }
    }, [file])

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause()
            else videoRef.current.play()
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    if (!src) return null

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-black relative group">
            <video
                ref={videoRef}
                src={src}
                className="max-h-full max-w-full"
                loop
                playsInline
                onClick={togglePlay}
            />

            {/* Controls Overlay */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={togglePlay} className="text-white hover:text-primary transition-colors">
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                </button>
                <div className="w-px h-6 bg-white/20" />
                <button onClick={toggleMute} className="text-white hover:text-primary transition-colors">
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
            </div>
        </div>
    )
}
