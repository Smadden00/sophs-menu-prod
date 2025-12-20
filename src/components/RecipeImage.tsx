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
    // Try to load S3 image, fallback to local if it fails
    const s3Url = `https://sophs-menu-bucket.s3.amazonaws.com/${recipeId}`;
    
    const img = new window.Image();
    img.onload = () => {
      setImageSrc(s3Url);
      setIsLoading(false);
    };
    img.onerror = () => {
      setImageSrc(fallback);
      setIsLoading(false);
    };
    img.src = s3Url;
  }, [recipeId, fallback]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={350}
      height={350}
      loading="lazy"
      className={isLoading ? 'opacity-50' : 'opacity-100'}
    />
  );
}
