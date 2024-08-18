import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({
  images,
  onImageClick,
  firstImageOnPageRef,
  pageSize,
}) => {
  return (
    <ul className={css.imageGallery}>
      {images.map((image, index) => (
        <li className={css.imageGalleryItem} key={image.id}>
          <ImageCard
            image={image}
            onClick={() => onImageClick(image)}
            ref={
              index === images.length - pageSize ? firstImageOnPageRef : null
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
