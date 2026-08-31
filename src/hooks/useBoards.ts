import { useQuery } from '@tanstack/react-query'
import { fetchBoards, Board } from '@/app/api/boards'

export const useBoards = () => {
    return useQuery<Board[], Error>({
        queryKey: ['boards'],
        queryFn: async () => {
            const response = await fetchBoards()

            if (!response?.data || !Array.isArray(response.data)) {
                throw new Error('Invalid boards response')
            }
            return response.data
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
}
