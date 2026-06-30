import React, { useState } from 'react';

/**
 * OptimizedImage Component
 * Provides lazy loading, error handling, and smooth transitions for images
 * 
 * Props:
 * - src: Image source URL
 * - alt: Alt text for accessibility
 * - className: CSS classes to apply
 * - width: Image width (optional, for preventing layout shift)
 * - height: Image height (optional, for preventing layout shift)
 * - placeholderBg: Background color while loading (default: 'bg-gray-200 dark:bg-slate-800')
 */
export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  placeholderBg = 'bg-gray-200 dark:bg-slate-800'
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div
        className={`${placeholderBg} flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-xs text-gray-500 dark:text-slate-400">Image failed to load</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={width}
      height={height}
      onLoad={handleLoad}
      onError={handleError}
      className={`${className} ${!isLoaded ? placeholderBg : ''} transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
