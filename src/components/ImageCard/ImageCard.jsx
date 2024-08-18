import { forwardRef } from 'react';
import css from './ImageCard.module.css';

const ImageCard = forwardRef(({ image, onClick }, ref) => {
  return (
    <div className={css.imageCard} onClick={onClick} ref={ref}>
      <img
        className={css.imageCardImg}
        src={image.urls.small}
        alt={image.alt_description || image.description}
      />
    </div>
  );
});

ImageCard.displayName = 'ImageCard';

export default ImageCard;
