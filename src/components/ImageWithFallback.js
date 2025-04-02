import React, { useState } from 'react';

const ImageWithFallback = ({ src, alt, ...props }) => {
  const [error, setError] = useState(false);
  const fallbackImage = 'https://via.placeholder.com/150x100/eee?text=Food+Image';

  const handleError = () => {
    setError(true);
  };

  return (
    <img
      src={error ? fallbackImage : src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback; 