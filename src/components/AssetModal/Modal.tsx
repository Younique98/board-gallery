import {
    Dialog,
    DialogTitle,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import { Fragment } from 'react'
import { Clip } from '@/app/api/clips'
import Image from 'next/image'
import { getOptimizedImageUrl } from '@/utils/getOptimizedImageUrl'

interface IModalProps {
    isOpen: boolean
    onClose: () => void
    clip: Clip | null
}

export const Modal = ({ isOpen, onClose, clip }: IModalProps) => {
    if (!clip) return null

    const width = clip.width > 800 ? 800 : clip.width || 400
    const height =
        clip.height && clip.width
            ? Math.round(
                  (clip.height / clip.width) *
                      (clip.width > 800 ? 800 : clip.width)
              )
            : 300
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle className="text-lg font-medium text-gray-900 mb-4">
                                    {clip.displayName}
                                </DialogTitle>
                                <div className="rounded overflow-hidden shadow bg-white hover:shadow-lg transition-transform duration-200 ease-in-out hover:scale-105">
                                    {clip.type === 'photo' ? (
                                        <Image
                                            src={getOptimizedImageUrl(
                                                clip.assets.image
                                            )}
                                            alt={
                                                clip.title ||
                                                clip.importedName ||
                                                ''
                                            }
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            width={width}
                                            height={height}
                                            className="w-full h-auto rounded"
                                        />
                                    ) : (
                                        <video
                                            controls
                                            className="w-full h-[600px] rounded"
                                            poster={getOptimizedImageUrl(
                                                clip.assets.image
                                            )}
                                        >
                                            <source
                                                src={
                                                    clip.assets.previewVideo ||
                                                    clip.assets.video
                                                }
                                                type="video/mp4"
                                            />
                                        </video>
                                    )}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
