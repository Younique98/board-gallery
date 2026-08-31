import { render, screen, fireEvent } from '@testing-library/react'
import { ClipCard } from '../ClipCard'
import type { Clip } from '@/app/api/clips'

const mockPhotoClip: Clip = {
    id: 'photo-1',
    type: 'photo',
    title: 'Test Photo',
    importedName: 'Imported Photo',
    assets: {
        image: 'https://picsum.photos/400/300',
    },
    width: 400,
    height: 300,
    rotation: 0,
    avatar: null,
    ext: 'jpg',
    bookmarked: false,
    createdAt: '',
    updatedAt: '',
    recordedAt: '',
    description: '',
    assetId: '',
    owner: { ownerName: 'Test User', ownerAvatar: '' },
    ownerName: 'Test User',
    workspaceId: '',
    workspaceName: '',
    workspaceImage: '',
    size: 1234,
    status: 'transcoded',
    version: 1,
    altResolutions: [],
    isDefault: true,
    boardCount: 0,
    tagCount: 0,
    accountId: '',
    displayName: '',
    source: '',
}

const mockVideoClip: Clip = {
    ...mockPhotoClip,
    id: 'video-1',
    type: 'video',
    assets: {
        ...mockPhotoClip.assets,
        previewVideo: 'https://example.com/video.mp4',
    },
    duration: 7.42,
}

describe('Given a user is viewing their boards and assets. When they are scrolling the ClipCard should function properly.', () => {
    beforeAll(() => {
        // Prevent matchMedia errors
        window.matchMedia = jest.fn().mockImplementation((query: string) => ({
            matches: query === '(hover: hover)',
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }))

        class MockIntersectionObserver {
            root: Element | null = null
            rootMargin: string = ''
            thresholds: ReadonlyArray<number> = []

            constructor(
                public callback: IntersectionObserverCallback,
                public options?: IntersectionObserverInit
            ) {}

observe = jest.fn((target: Element) => {
  const entry: IntersectionObserverEntry = {
    isIntersecting: true,
    target,
    boundingClientRect: target.getBoundingClientRect(),
    intersectionRatio: 1,
    intersectionRect: target.getBoundingClientRect(),
    rootBounds: null,
    time: Date.now(),
  }

  this.callback([entry], this)
})

            unobserve = jest.fn()
            disconnect = jest.fn()
            takeRecords = jest.fn()
        }
        global.IntersectionObserver = MockIntersectionObserver
    })

    it('Then it renders photo clip with image and title', () => {
        render(<ClipCard clip={mockPhotoClip} />)

        const image = screen.getByAltText('Test Photo')
        expect(image).toBeInTheDocument()
    })

    it('Then it renders video clip with preview and duration', () => {
        render(<ClipCard clip={mockVideoClip} />)

        const video = screen.getByTestId('clip-video') as HTMLVideoElement
        expect(video).toBeInTheDocument()

        const duration = screen.getByText('0:07')
        expect(duration).toBeInTheDocument()
    })

})
