import React from 'react';
import PropTypes from 'prop-types';
import Book from '../book/Book';

const SearchBookResult = (props) => {
  const findShelf = (bookId) => {
    for (const key in props.booksInShelves) {
      if (props.booksInShelves.hasOwnProperty(key)) {
        const books = props.booksInShelves[key];
        if (books.includes(bookId)) {
          return key;
        }
      }
    }
    return 'none';
  }

  return (
    <div className="search-books-results">
      {props.filteredBooks && props.filteredBooks.length > 0 ?
        (<ol className="books-grid">
          {
            props.filteredBooks && (props.filteredBooks.map((bk) => (
              <Book
                key={bk.id}
                book={bk}
                shelf={findShelf(bk.id)}
                updateShelf={props.updateShelf} />
            )))
          }
        </ol>) :
        (<div className="search-books-no-data">
          <p>No data found, start typing to search for books</p>
        </div>
        )}
    </div>
  );
}

SearchBookResult.propTypes = {
  filteredBooks: PropTypes.array.isRequired,
  booksInShelves: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default SearchBookResult;