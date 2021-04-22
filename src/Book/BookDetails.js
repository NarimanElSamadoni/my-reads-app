import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import AppHeader from '../Shared/AppHeader';
import { Link } from 'react-router-dom';

class BookDetails extends Component {
  constructor() {
    super();
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    const bookId = this.props.match.params.bookId;
    BooksAPI.get(bookId).then(bk => {
      this.setState(() => ({
        book: bk
      }));
    });
  }

  render() {
    return (
      <div>
        <AppHeader />
        <div className="book-details-content">
          <Link to='/' className="close-details"> Close </Link>
          <div
            className="book-cover"
            style={{ margin: "auto", width: 128, height: 193, backgroundImage: `url(${this.state.book.imageLinks && this.state.book.imageLinks.smallThumbnail})` }}>
          </div>
          <h2 className="book-details-title">{this.state.book.title}</h2>
          <h4 className="book-details-subtitle">{this.state.book.subtitle}</h4>
          <h5 className="book-details-author">
            <span style={{textDecoration: "underline"}}>By</span>:
            {this.state.book.authors ? ' ' + this.state.book.authors.join(', ') : ''}
          </h5>
          <p className="book-details-desc">{this.state.book.description}</p>
        </div>
      </div>
    );
  }
}

export default BookDetails;