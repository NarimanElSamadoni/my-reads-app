import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
  constructor() {
    super();
    this.updateShelf = this.updateShelf.bind(this);
  }

  updateShelf(book, shelf) {
    this.props.updateShelf(book, shelf);
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.shelfBooks && (this.props.shelfBooks.map(bk => (
                <li key={bk.id}>
                  <Book
                    book={bk}
                    shelf={this.props.shelf}
                    updateShelf={this.updateShelf} />
                </li>
              )))
            }
          </ol>
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  shelfBooks: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default BookShelf;