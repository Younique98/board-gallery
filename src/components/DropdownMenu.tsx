'use client'

import { Clip } from '@/app/api/clips'
import { MenuButton, Menu, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'

type TDropdownMenuProps = {
    onDownload?: () => void
    onCopyLink?: () => void
    onOpenModal?: () => void
}

export const handleDownload = (clip: Clip) => {
    const url =
        clip.assets?.original || clip.assets?.video || clip.assets?.image
    if (!url) return
    const link = document.createElement('a')
    link.href = url
    link.download = clip.displayName || 'asset'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

export const handleCopyLink = (clip: Clip) => {
    const url =
        clip.assets?.original || clip.assets?.video || clip.assets?.image
    if (!url) return
    navigator.clipboard.writeText(url).then(() => {
        console.log('Link copied to clipboard:', url)
        // TODO: (ET) Optionally show a toast or confirmation
    })
}

export const handleOpenModal = (clip: Clip) => {
    // TODO: (ET) Hook up modal functionality if/when needed
    // place holder code for now
    console.log('Open modal for clip:', clip)
    const url =
        clip.assets?.original || clip.assets?.video || clip.assets?.image
    if (!url) return
    const link = document.createElement('a')
    link.href = url
    link.download = clip.displayName || 'asset'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

// TODO: (ET): fix deprecated actives
export const DropdownMenu = ({
    onDownload,
    onCopyLink,
    onOpenModal,
}: TDropdownMenuProps) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/10 focus:outline-none z-50">
                <div className="py-1">
                    <MenuItem>
                        {({ active }) => (
                            <button
                                onClick={onDownload}
                                className={`${
                                    active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700'
                                } w-full text-left px-4 py-2 text-sm`}
                            >
                                Download
                            </button>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ active }) => (
                            <button
                                onClick={onCopyLink}
                                className={`${
                                    active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700'
                                } w-full text-left px-4 py-2 text-sm`}
                            >
                                Copy Link
                            </button>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ active }) => (
                            <button
                                onClick={onOpenModal}
                                className={`${
                                    active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700'
                                } w-full text-left px-4 py-2 text-sm`}
                            >
                                Open
                            </button>
                        )}
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}
