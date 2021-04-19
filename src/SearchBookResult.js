import React from 'react';
import Book from './Book';

const SearchBookResult = (props) => {
  return (
    <div className="search-books-results">
      {props.filteredBooks && props.filteredBooks.length > 0 ?
        (<ol className="books-grid">
          {
            props.filteredBooks.map((bk) => (
              <Book
                key={bk.id}
                book={bk}
                updateShelf={props.updateShelf} />
            ))
          }
        </ol>) :
        (<div className="search-books-no-data">
          <p>No data found, start typing to search for books</p>
        </div>
        )}
    </div>
  );
}

export default SearchBookResult;