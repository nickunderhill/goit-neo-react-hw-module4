import css from './Loader.module.css';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={css.loader}>
      <ThreeDots color={'#007bff'} height={80} width={80} />
    </div>
  );
};

export default Loader;
