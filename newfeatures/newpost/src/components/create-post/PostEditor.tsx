import { useState, useEffect } from 'react'
import clsx from 'clsx'

interface PostEditorProps {
    file: File | null
    onUpdate: (data: any) => void
}

const FILTERS = [
    { name: 'Normal', class: '' },
    { name: 'Clarendon', class: 'contrast-125 saturate-125 brightness-110' },
    { name: 'Gingham', class: 'brightness-105 hue-rotate-[-10deg] sepia-[.2]' },
    { name: 'Moon', class: 'grayscale brightness-110 contrast-75' },
    { name: 'Lark', class: 'contrast-[.9] brightness-110 saturate-110 sepia-[.1]' },
    { name: 'Reyes', class: 'sepia-[.4] brightness-110 contrast-[.85] saturate-75' },
]

export default function PostEditor({ file, onUpdate }: PostEditorProps) {
    const [preview, setPreview] = useState<string | null>(null)
    const [activeFilter, setActiveFilter] = useState(FILTERS[0])

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file)
            setPreview(url)
            return () => URL.revokeObjectURL(url)
        }
    }, [file])

    if (!preview) return null

    return (
        <div className="w-full h-full flex flex-col md:flex-row">
            {/* Image Preview Area */}
            <div className="flex-1 bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center overflow-hidden relative">
                <img
                    src={preview}
                    alt="Preview"
                    className={clsx(
                        "max-w-full max-h-full object-contain transition-all duration-300",
                        activeFilter.class
                    )}
                />
            </div>

            {/* Filters Sidebar */}
            <div className="h-32 md:h-full md:w-48 bg-white dark:bg-zinc-900 border-t md:border-t-0 md:border-l border-zinc-200 dark:border-zinc-800 flex md:flex-col overflow-x-auto md:overflow-y-auto">
                <div className="p-4 grid grid-flow-col md:grid-flow-row gap-4">
                    {FILTERS.map((filter) => (
                        <button
                            key={filter.name}
                            onClick={() => setActiveFilter(filter)}
                            className="group flex flex-col items-center gap-2 min-w-[80px]"
                        >
                            <div className={clsx(
                                "w-20 h-20 rounded-md overflow-hidden border-2 transition-all",
                                activeFilter.name === filter.name ? "border-primary" : "border-transparent group-hover:border-zinc-300"
                            )}>
                                <img
                                    src={preview}
                                    className={clsx("w-full h-full object-cover", filter.class)}
                                    alt={filter.name}
                                />
                            </div>
                            <span className={clsx(
                                "text-xs font-medium",
                                activeFilter.name === filter.name ? "text-primary" : "text-zinc-500 dark:text-zinc-400"
                            )}>
                                {filter.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
