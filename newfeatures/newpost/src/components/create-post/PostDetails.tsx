import { MapPin, Music, Users, DollarSign, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'

export default function PostDetails() {
    const [caption, setCaption] = useState('')
    const [donationsEnabled, setDonationsEnabled] = useState(false)

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            {/* Caption Input */}
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 shrink-0" />
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Write a caption..."
                        className="w-full bg-transparent border-none resize-none focus:ring-0 p-0 text-sm text-zinc-900 dark:text-white placeholder-zinc-500 h-24"
                    />
                </div>
                <div className="mt-2">
                    <button className="px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                        Poll
                    </button>
                </div>
            </div>

            {/* Options List */}
            <div className="flex flex-col">
                <button className="flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border-b border-zinc-100 dark:border-zinc-800/50">
                    <div className="flex items-center gap-3 text-zinc-900 dark:text-white">
                        <Music size={20} />
                        <span className="text-sm font-medium">Add music</span>
                    </div>
                    <ChevronRight size={16} className="text-zinc-400" />
                </button>

                <button className="flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border-b border-zinc-100 dark:border-zinc-800/50">
                    <div className="flex items-center gap-3 text-zinc-900 dark:text-white">
                        <Users size={20} />
                        <span className="text-sm font-medium">Tag people</span>
                    </div>
                    <ChevronRight size={16} className="text-zinc-400" />
                </button>

                <button className="flex items-center justify-between p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border-b border-zinc-100 dark:border-zinc-800/50">
                    <div className="flex items-center gap-3 text-zinc-900 dark:text-white">
                        <MapPin size={20} />
                        <span className="text-sm font-medium">Add location</span>
                    </div>
                    <ChevronRight size={16} className="text-zinc-400" />
                </button>

                {/* Donation Toggle */}
                <div className="p-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <div className="flex items-center gap-3 text-zinc-900 dark:text-white">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-zinc-900 dark:border-white">
                            <DollarSign size={12} strokeWidth={3} />
                        </div>
                        <span className="text-sm font-medium">Habilitar Doações</span>
                    </div>

                    <button
                        onClick={() => setDonationsEnabled(!donationsEnabled)}
                        className={clsx(
                            "w-11 h-6 rounded-full transition-colors relative",
                            donationsEnabled ? "bg-primary" : "bg-zinc-300 dark:bg-zinc-600"
                        )}
                    >
                        <div className={clsx(
                            "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm",
                            donationsEnabled ? "left-[22px]" : "left-0.5"
                        )} />
                    </button>
                </div>
            </div>
        </div>
    )
}
