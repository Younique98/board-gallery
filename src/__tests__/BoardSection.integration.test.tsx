import { render, screen, waitFor } from '@testing-library/react'
import { BoardSection } from '@/components/BoardSection'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

jest.mock('@/hooks/useInfiniteAssets', () => ({
    useInfiniteAssets: () => ({
        data: {
            pages: [
                {
                    data: {
                        clips: [
                            {
                                id: '1',
                                title: 'Test Clip Title',
                                importedName: null,
                                type: 'photo',
                                assets: {
                                    image: 'https://picsum.photos/400/300',
                                },
                            },
                            {
                                id: '2',
                                importedName: 'Second Clip',
                                title: null,
                                type: 'photo',
                                assets: {
                                    image: 'https://picsum.photos/400/300',
                                },
                            },
                        ],
                    },
                    pagination: {
                        hasMore: false,
                        cursor: null,
                    },
                },
            ],
        },
        isLoading: false,
        isError: false,
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
    }),
}))

jest.mock('@/app/api/boards', () => ({
    fetchBoards: () =>
        Promise.resolve({
            data: [
                {
                    id: 'board-1',
                    title: 'Marketing',
                    thumbnails: ['https://picsum.photos/400/300'],
                },
                {
                    id: 'board-2',
                    title: 'Campaigns',
                    thumbnails: ['https://picsum.photos/400/300'],
                },
            ],
        }),
}))

describe('BoardSection Integration', () => {
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

    it('renders boards and clips correctly', async () => {
        const queryClient = new QueryClient()

        render(
            <QueryClientProvider client={queryClient}>
                <BoardSection />
            </QueryClientProvider>
        )

        await waitFor(() => {
            expect(screen.getByText(/Marketing/i)).toBeInTheDocument()
            expect(screen.getByText(/Campaigns/i)).toBeInTheDocument()
            expect(screen.getByAltText(/Test Clip Title/i)).toBeInTheDocument()
            expect(screen.getByAltText(/Second Clip/i)).toBeInTheDocument()
        })
    })
})
