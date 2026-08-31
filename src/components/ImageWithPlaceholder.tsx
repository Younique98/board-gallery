import Image from "next/image";


/**
 * ImageWithPlaceholder
 * 
 * A wrapper around Next.js <Image /> that provides:
 * - blur placeholder using blurDataURL
 * - responsive image sizing
 * - optional priority loading for above-the-fold content
 * 
 * Props:
 * @param src - the image URL
 * @param alt - the alt text for accessibility
 * @param width - optional width (default 600)
 * @param height - optional height (default 400)
 * @param className - optional styling override
 * @param priority - whether to preload image
 * @param sizes - responsive sizing config
 */

interface IImageWithPlaceholderProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    sizes?: string;
    loading?: "lazy" | "eager";
}

export const ImageWithPlaceholder = ( {
    src,
    alt,
    width = 400,
    height = 300,
    className = "",
    priority = false,
    loading = "eager",
    sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
}: IImageWithPlaceholderProps ) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`object-cover ${ className }`}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PSc1MCUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzEwMCUnIGhlaWdodD0nNTAlJyBmaWxsPSIjZGRkZGRkIi8+PC9zdmc+"
            priority={priority}
            loading={loading}
            sizes={sizes}
        />
    );
}
