import React from 'react';
import Book from './Book';

const SearchBookResult = (props) => {
  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {
          props.filteredBooks && props.filteredBooks.map((bk) => (
            <Book 
              key={bk.id} 
              book={bk}
              updateShelf={props.updateShelf} />
          ))
        }
      </ol>
    </div>
  );
}

export default SearchBookResult;