import { ImageWithPlaceholder } from './ImageWithPlaceholder'

/**
 * BoardCard
 *
 * A styled card component for displaying a creative asset or board item.
 * Renders an optimized image with title and board name.
 *
 * Props:
 * @param title - the title of the asset or board
 * @param thumbnail - the image URL (can be external)
 */

export interface IBoardCardProps {
    title: string
    thumbnail?: string
    priority?: boolean
    loading?: 'lazy' | 'eager'
}

export const BoardCard = ({
    title,
    thumbnail,
    priority,
    loading,
}: IBoardCardProps) => {
    const thumbnailUrl =
        thumbnail ?? 'https://picsum.photos/seed/team-intros/480/320'
    return (
        <div className="relative rounded-lg overflow-hidden shadow bg-white hover:shadow-md  transition-transform duration-200 ease-in-out border border-gray-200 aspect-square hover:scale-105">
            <ImageWithPlaceholder
                src={thumbnailUrl}
                alt={`Preview image for the ${title} board`}
                className="object-cover w-full h-full"
                priority={priority}
                loading={loading}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
                <p className="text-sm font-medium text-white truncate">
                    {title}
                </p>
            </div>
        </div>
    )
}
