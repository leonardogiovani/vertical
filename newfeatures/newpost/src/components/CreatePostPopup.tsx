import { useState, useRef } from 'react'
import { X, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import MediaUploader from './create-post/MediaUploader'
import PostEditor from './create-post/PostEditor'
import VideoEditor from './create-post/VideoEditor'
import ArticleEditor from './create-post/ArticleEditor'
import PostDetails from './create-post/PostDetails'

type Tab = 'POST' | 'VIDEO' | 'ARTIGO'
type Step = 'UPLOAD' | 'EDIT' | 'DETAILS'

interface CreatePostPopupProps {
    isOpen: boolean
    onClose: () => void
}

export default function CreatePostPopup({ isOpen, onClose }: CreatePostPopupProps) {
    const [activeTab, setActiveTab] = useState<Tab>('POST')
    const [step, setStep] = useState<Step>('UPLOAD')
    const [media, setMedia] = useState<File | null>(null)
    const [croppedImage, setCroppedImage] = useState<string | null>(null)

    // Reset state on close
    const handleClose = () => {
        setStep('UPLOAD')
        setMedia(null)
        setCroppedImage(null)
        onClose()
    }

    const handleNext = () => {
        if (step === 'UPLOAD' && media) setStep('EDIT')
        else if (step === 'EDIT') setStep('DETAILS')
    }

    const handleBack = () => {
        if (step === 'DETAILS') setStep('EDIT')
        else if (step === 'EDIT') setStep('UPLOAD')
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white dark:bg-zinc-900 w-full max-w-4xl h-[85vh] rounded-xl overflow-hidden flex flex-col shadow-2xl border border-zinc-200 dark:border-zinc-800"
                    >
                        {/* Header */}
                        <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 shrink-0">
                            <div className="flex items-center gap-4">
                                {step !== 'UPLOAD' ? (
                                    <button onClick={handleBack} className="text-zinc-900 dark:text-white">
                                        <ArrowLeft size={24} />
                                    </button>
                                ) : (
                                    <button onClick={handleClose} className="text-zinc-900 dark:text-white">
                                        <X size={24} />
                                    </button>
                                )}
                                <span className="font-bold text-lg dark:text-white">
                                    {step === 'UPLOAD' ? 'NOVO' : step === 'EDIT' ? 'EDITAR' : 'NOVA PUBLICAÇÃO'}
                                </span>
                            </div>

                            {/* Tabs (Only visible in Upload step) */}
                            {step === 'UPLOAD' && (
                                <div className="hidden md:flex gap-6 font-semibold text-sm text-zinc-500 dark:text-zinc-400">
                                    {(['POST', 'VIDEO', 'ARTIGO'] as Tab[]).map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={clsx(
                                                "transition-colors hover:text-zinc-900 dark:hover:text-white",
                                                activeTab === tab && "text-zinc-900 dark:text-white border-b-2 border-primary pb-4 -mb-4"
                                            )}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <button
                                onClick={handleNext}
                                disabled={!media && step === 'UPLOAD'}
                                className={clsx(
                                    "font-bold text-sm transition-colors",
                                    (!media && step === 'UPLOAD') ? "text-zinc-300 dark:text-zinc-700 cursor-not-allowed" : "text-primary hover:text-green-600"
                                )}
                            >
                                {step === 'DETAILS' ? 'PUBLICAR' : 'PRÓXIMO'}
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative bg-zinc-50 dark:bg-black">

                            {/* Main Preview/Editor Area */}
                            <div className={clsx(
                                "flex-1 flex items-center justify-center relative transition-all duration-300",
                                step === 'DETAILS' && "hidden md:flex md:basis-1/2 lg:basis-2/3 border-r border-zinc-200 dark:border-zinc-800"
                            )}>
                                {step === 'UPLOAD' ? (
                                    <MediaUploader
                                        type={activeTab}
                                        onFileSelect={(file) => setMedia(file)}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-950">
                                        {activeTab === 'POST' && <PostEditor file={media} onUpdate={setCroppedImage} />}
                                        {activeTab === 'VIDEO' && <VideoEditor file={media} />}
                                        {activeTab === 'ARTIGO' && <ArticleEditor />}
                                    </div>
                                )}
                            </div>

                            {/* Sidebar (Filters/Details) */}
                            {step !== 'UPLOAD' && (
                                <div className={clsx(
                                    "w-full md:w-[340px] bg-white dark:bg-zinc-900 flex flex-col border-l border-zinc-200 dark:border-zinc-800",
                                    step === 'DETAILS' ? "flex-1 md:flex-none" : "hidden" // Show only in details or if we want filters in edit step
                                )}>
                                    {step === 'DETAILS' && <PostDetails />}
                                </div>
                            )}
                        </div>

                        {/* Mobile Tabs Bottom */}
                        {step === 'UPLOAD' && (
                            <div className="md:hidden h-12 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-8 bg-white dark:bg-zinc-900 shrink-0">
                                {(['POST', 'VIDEO', 'ARTIGO'] as Tab[]).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={clsx(
                                            "font-semibold text-xs transition-colors",
                                            activeTab === tab ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
                                        )}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        )}

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
