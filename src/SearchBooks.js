import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBookResult from './SearchBookResult';

class SearchBooks extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      filteredBooks: []
    }
  }

  changeHandler = (event) => {
    const { value } = event.target;
    this.setState(() => ({
      query: value
    }));
  }

  searchBooks(query) {
    BooksAPI.search(query).then((books) => {
      this.setState((curState) => ({
        ...curState,
        filteredBooks: books
      }));
    }).catch(error => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.query !== this.state.query && this.state.query !== '') {
      this.searchBooks(this.state.query);
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search"> Close </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.changeHandler} />
          </div>
        </div>
        <SearchBookResult 
          filteredBooks={this.state.filteredBooks}
          updateShelf={this.props.updateShelf} />
      </div>
    );
  }
}

export default SearchBooks;