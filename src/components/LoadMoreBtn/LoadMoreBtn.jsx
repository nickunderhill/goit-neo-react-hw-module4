import css from './LoadMoreBtn.module.css';
import { FaUser, FaPhone } from 'react-icons/fa6';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={css.loadMore}>
      <button className={css.loadMoreBtn} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
