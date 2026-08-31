import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchAssets, type ClipsListResponse } from '@/app/api/clips'

export const useInfiniteAssets = () => {
    return useInfiniteQuery<ClipsListResponse, Error>({
        queryKey: ['clips'],
        initialPageParam: null,
        queryFn: async ({ pageParam }) => {
            const cursor =
                typeof pageParam === 'string' || pageParam === null
                    ? pageParam
                    : null

            try {
                return await fetchAssets({ cursor })
            } catch (error) {
                console.error('Error fetching assets:', error)
                throw error
            }
        },
        getNextPageParam: (lastPage) =>
            lastPage.pagination.hasMore
                ? lastPage.pagination.cursor
                : undefined,
        staleTime: 1000 * 60 * 3,
        retry: 1,
        refetchOnWindowFocus: false,
    })
}
