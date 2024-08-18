import css from './ImageModal.module.css';

import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImageModal = ({ image, onClose, isOpen }) => {
  return (
    <Modal
      className={css.imageModal}
      overlayClassName={css.imageModalOverlay}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className={css.imageDescription}>
        {image.description || image.alt_description}
      </div>
      <img
        src={image.urls.regular}
        alt={image.alt_description || image.description}
      />

      <div className={css.imageAuthor}>
        Author: {image.user.name || image.alt_description}
      </div>
    </Modal>
  );
};
export default ImageModal;
