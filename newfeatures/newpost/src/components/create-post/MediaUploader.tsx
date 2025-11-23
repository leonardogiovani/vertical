import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Image, Video, FileText, UploadCloud } from 'lucide-react'
import clsx from 'clsx'

interface MediaUploaderProps {
    type: 'POST' | 'VIDEO' | 'ARTIGO'
    onFileSelect: (file: File) => void
}

export default function MediaUploader({ type, onFileSelect }: MediaUploaderProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            onFileSelect(acceptedFiles[0])
        }
    }, [onFileSelect])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: type === 'POST'
            ? { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }
            : type === 'VIDEO'
                ? { 'video/*': ['.mp4', '.mov', '.webm'] }
                : { 'image/*': ['.png', '.jpg'], 'text/plain': ['.txt', '.md'] }, // Article can start with cover image
        maxFiles: 1
    })

    return (
        <div
            {...getRootProps()}
            className={clsx(
                "w-full h-full flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-colors",
                isDragActive ? "bg-primary/10" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
        >
            <input {...getInputProps()} />

            <div className="mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                {type === 'POST' && <Image size={64} className="relative text-zinc-800 dark:text-white" />}
                {type === 'VIDEO' && <Video size={64} className="relative text-zinc-800 dark:text-white" />}
                {type === 'ARTIGO' && <FileText size={64} className="relative text-zinc-800 dark:text-white" />}
            </div>

            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">
                {type === 'POST' && 'Drag photos here'}
                {type === 'VIDEO' && 'Drag video here'}
                {type === 'ARTIGO' && 'Start your article'}
            </h3>

            <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-xs">
                {type === 'POST' && 'Upload high quality photos to share with your community.'}
                {type === 'VIDEO' && 'Share your moments with vertical videos.'}
                {type === 'ARTIGO' && 'Write compelling stories and share your knowledge.'}
            </p>

            <button className="px-6 py-2.5 bg-primary hover:bg-green-600 text-white font-semibold rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
                <UploadCloud size={20} />
                Select from computer
            </button>
        </div>
    )
}
