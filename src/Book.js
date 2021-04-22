import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookCtrl from './BookCtrl';
import { Link } from 'react-router-dom';

class Book extends Component {
  constructor() {
    super();
    this.updateShelf = this.updateShelf.bind(this);
  }

  updateShelf = (shelf) => {
    this.props.updateShelf(this.props.book, shelf);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book && this.props.book.imageLinks.smallThumbnail})` }}>
          </div>
          <BookCtrl
            currentShelf={this.props.shelf}
            updateShelf={this.updateShelf} />
        </div>
        <div className="book-title">
          <Link to={`/books/${this.props.book && this.props.book.id}`} className="book-link">
            {this.props.book && this.props.book.title ? this.props.book.title : ''}
          </Link>
        </div>
        <div className="book-authors">
          {this.props.book && this.props.book.authors ? this.props.book.authors.join(', ') : ''}
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelf: PropTypes.string,
  updateShelf: PropTypes.func.isRequired
}

export default Book;