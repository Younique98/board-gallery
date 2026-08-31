'use client'
import { BoardSection } from '@/components/BoardSection'

export default function Home() {
    return (
        <main className="p-6">
            <header className="mb-6">
                <h1 className="text-2xl font-bold">Board Gallery</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Browse and organize creative asset boards, with infinite scroll and
                    optimized image loading.
                </p>
            </header>
            <BoardSection />
        </main>
    )
}
