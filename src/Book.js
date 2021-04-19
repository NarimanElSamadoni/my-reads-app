import React, { Component } from 'react';
import BookCtrl from './BookCtrl';

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
            style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.smallThumbnail})` }}>
          </div>
          <BookCtrl 
            currentShelf={this.props.shelf}
            updateShelf={this.updateShelf} />
        </div>
        <div className="book-title">{this.props.book.title ? this.props.book.title : ''}</div>
        <div className="book-authors">{this.props.book.authors ? this.props.book.authors.join(', ') : ''}</div>
      </div>
    );
  }
}

export default Book;