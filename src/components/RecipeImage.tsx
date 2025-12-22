// Example hybrid approach for recipe images
import { useState, useEffect } from 'react';

interface RecipeImageProps {
  recipeId: number;
  alt: string;
  fallback?: string;
}

export function RecipeImage({ recipeId, alt, fallback = "/images/smallImgs/salad.jpg" }: RecipeImageProps) {
  const [imageSrc, setImageSrc] = useState(fallback);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to load CloudFront image, fallback to local if it fails
    const imageUrl = `${import.meta.env.VITE_CLOUDFRONT_IMG_BASE_URL}/${recipeId}`;
    
    const img = new window.Image();
    img.onload = () => {
      setImageSrc(imageUrl);
      setIsLoading(false);
    };
    img.onerror = () => {
      setImageSrc(fallback);
      setIsLoading(false);
    };
    img.src = imageUrl;

    // Cleanup to prevent memory leaks
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [recipeId, fallback]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={350}
      height={350}
      loading="lazy"
      style={{ opacity: isLoading ? 0.5 : 1, transition: 'opacity 0.3s ease-in-out' }}
    />
  );
}
