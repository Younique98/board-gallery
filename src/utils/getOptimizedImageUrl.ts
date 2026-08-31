export const getOptimizedImageUrl = (imageUrl: string) => {
    if (imageUrl.includes('imgix.net')) {
        const baseUrl = imageUrl.split('?')[0]
        return `${baseUrl}?fm=webp&q=75&auto=compress&fit=crop`
    }
    return imageUrl
}