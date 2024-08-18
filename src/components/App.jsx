import { useState, useEffect, useRef } from 'react';

import css from './App.module.css';
import SearchBar from './SearchBar/SearchBar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ImageModal from './ImageModal/ImageModal.jsx';
import Loader from './Loader/Loader.jsx';
import ErrorMessage from './ErrorMessage/ErrorMessage.jsx';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn.jsx';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'H9gtlkVbBGjpvbTpqeBrgoHHIzDwDLhMJVRmx8h0_Rg';
const IMAGES_PER_PAGE = 15;

function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const firstImageOnPageRef = useRef(null);

  useEffect(() => {
    if (!query) return;
    async function fetchImages() {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos`,
          {
            params: {
              query,
              page,
              per_page: IMAGES_PER_PAGE,
              orientation: 'landscape',
            },
            headers: {
              Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
          }
        );
        setImages(prevImages => [...prevImages, ...response.data.results]);
        if (response.data.total === 0) {
          setError('No images matching your query. Please, try another.');
        }
      } catch (error) {
        setError('Ooops... Something went wrong. Please, try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [query, page]);

  useEffect(() => {
    if (firstImageOnPageRef.current && page > 1) {
      firstImageOnPageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [images, page]);

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    if (!showModal) {
      setSelectedImage(image);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Toaster position="top-right" toastOptions={{ duration: 1000 }} />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery
        images={images}
        onImageClick={openModal}
        firstImageOnPageRef={firstImageOnPageRef}
        pageSize={IMAGES_PER_PAGE}
      />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {showModal && (
        <ImageModal
          image={selectedImage}
          onClose={closeModal}
          isOpen={showModal}
        />
      )}
    </div>
  );
}

export default App;
