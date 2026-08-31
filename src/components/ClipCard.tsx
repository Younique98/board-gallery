'use client'
import { Clip } from '@/app/api/clips'
import { formatDuration } from '@/utils/formatDuration'
import Image from 'next/image'
import { useEffect, useRef, useState, memo, useCallback } from 'react'
import { clsx } from 'clsx'
import { getOptimizedImageUrl } from '@/utils/getOptimizedImageUrl'
import { DropdownMenu, handleCopyLink, handleDownload } from './DropdownMenu'
import { AssetModal } from './AssetModal/AssetModal'
interface IClipCardProps {
    clip: Clip
}

// TODO: (ET) clean up playback logic later and explore packages to manage video state across breakpoints
const ClipCard = ({ clip }: IClipCardProps) => {
    const displayName = clip.title ?? clip.importedName ?? ''
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const [timeLeft, setTimeLeft] = useState<number | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const animationRef = useRef<number | null>(null)
    const [supportsHover, setSupportsHover] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedClip, setSelectedClip] = useState<Clip | null>(null)

    const handleOpenAssetModal = (clip: Clip) => {
        setSelectedClip(clip)
        setIsModalOpen(true)
    }

    const handleCloseAssetModal = () => {
        setIsModalOpen(false)
        setSelectedClip(null)
    }

    const updateTimer = useCallback(() => {
        if (
            videoRef.current &&
            !videoRef.current.paused &&
            !videoRef.current.ended
        ) {
            setTimeLeft(
                videoRef.current.duration - videoRef.current.currentTime
            )
            animationRef.current = requestAnimationFrame(updateTimer)
        }
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setSupportsHover(window.matchMedia('(hover: hover)').matches)
        }
    }, [])

    useEffect(() => {
        if (!videoRef.current) return

        const video = videoRef.current

        const handlePlay = () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            animationRef.current = requestAnimationFrame(updateTimer)
        }

        const handlePause = () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
                animationRef.current = null
            }
        }

        // Set initial time
        if (video.duration) {
            setTimeLeft(video.duration)
        } else {
            video.addEventListener(
                'loadedmetadata',
                () => {
                    setTimeLeft(video.duration)
                },
                { once: true }
            )
        }

        video.addEventListener('play', handlePlay)
        video.addEventListener('pause', handlePause)
        video.addEventListener('ended', handlePause)

        return () => {
            video.removeEventListener('play', handlePlay)
            video.removeEventListener('pause', handlePause)
            video.removeEventListener('ended', handlePause)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [updateTimer])

    // Pause video if card scrolls out of view
    useEffect(() => {
        if (!videoRef.current) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting)
                if (!entry.isIntersecting && videoRef.current) {
                    videoRef.current.pause()
                }
            },
            { threshold: 0.5, rootMargin: '100px' }
        )

        observer.observe(videoRef.current)
        return () => {
            observer.disconnect()
        }
    }, [])

    const handleMouseEnter = () => {
        if (supportsHover && videoRef.current && isVisible) {
            videoRef.current.play().catch(() => {
                console.warn('Video autoplay prevented by browser')
            })
        }
    }

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause()
        }
    }
    const handleVideoClick = () => {
        if (!videoRef.current || !isVisible) return

        if (videoRef.current.paused) {
            videoRef.current.play().catch(() => {
                console.warn('Video play prevented by browser')
            })
        } else {
            videoRef.current.pause()
        }
    }
    const width = clip.width > 800 ? 800 : clip.width || 400
    const height =
        clip.height && clip.width
            ? Math.round(
                  (clip.height / clip.width) *
                      (clip.width > 800 ? 800 : clip.width)
              )
            : 300
    return (
        <div className="rounded overflow-hidden shadow bg-white hover:shadow-lg transition-transform duration-200 ease-in-out hover:scale-105">
            {clip.type === 'photo' && (
                <div className="relative aspect-video w-full bg-gray-200">
                    <div className="absolute top-2 right-2 z-10">
                        <DropdownMenu
                            onDownload={() => handleDownload(clip)}
                            onCopyLink={() => handleCopyLink(clip)}
                            onOpenModal={() => handleOpenAssetModal(clip)}
                        />
                    </div>
                    <Image
                        src={getOptimizedImageUrl(clip.assets.image)}
                        alt={displayName}
                        width={width}
                        height={height}
                        className={clsx(
                            'object-cover w-full h-full',
                            isImageLoaded
                                ? 'opacity-100'
                                : 'opacity-0 transition-opacity duration-500 ease-in-out'
                        )}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={false}
                        loading="lazy"
                        fetchPriority="auto"
                        decoding="async"
                        onLoad={() => setIsImageLoaded(true)}
                    />
                </div>
            )}

            {clip.type === 'video' && (
                <div
                    data-testid="clip-card-video-wrapper"
                    className="relative aspect-video group overflow-hidden rounded-md group-hover:brightness-90 group-hover:scale-105 transition cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleVideoClick}
                >
                    <div className="absolute top-2 right-2 z-10">
                        <DropdownMenu
                            onDownload={() => handleDownload(clip)}
                            onCopyLink={() => handleCopyLink(clip)}
                            onOpenModal={() => handleOpenAssetModal(clip)}
                        />
                    </div>
                    <video
                        ref={videoRef}
                        poster={getOptimizedImageUrl(clip.assets.image)}
                        muted
                        playsInline
                        preload="metadata"
                        controls={false}
                        aria-hidden="true"
                        tabIndex={-1}
                        data-testid="clip-video"
                        className="aspect-video object-cover rounded-md transition group-hover:brightness-90 group-hover:scale-105 w-full"
                    >
                        <source
                            src={clip.assets.previewVideo}
                            type="video/mp4"
                        />
                    </video>

                    {clip.duration && (
                        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1 rounded pointer-events-none">
                            {formatDuration(timeLeft ?? clip.duration)}
                        </span>
                    )}
                </div>
            )}
            {selectedClip && (
                <AssetModal clip={clip} initialIsOpen={true} />
            )}
        </div>
    )
}

export default memo(ClipCard)
export { ClipCard }
