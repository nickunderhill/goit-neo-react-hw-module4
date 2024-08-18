import { useState } from 'react';
import css from './SearchBar.module.css';
import toast from 'react-hot-toast';

function SearchBar({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (input.trim() === '') {
      toast.error('Please enter a search term!');
      return;
    }

    onSubmit(input);
    setInput('');
  };

  return (
    <header className={css.header}>
      <form className={css.headerForm} onSubmit={handleSubmit}>
        <input
          className={css.headerFormInput}
          type="text"
          value={input}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setInput(e.target.value)}
        />
        <button className={css.headerSubmitBtn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}

export default SearchBar;
