import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const SearchBookResult = (props) => {
  return (
    <div className="search-books-results">
      {props.filteredBooks && props.filteredBooks.length > 0 ?
        (<ol className="books-grid">
          {
            props.filteredBooks && (props.filteredBooks.map((bk) => (
              <Book
                key={bk.id}
                book={bk}
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
  updateShelf: PropTypes.func.isRequired
}

export default SearchBookResult;