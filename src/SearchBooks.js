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
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.query !== this.state.query) {
      this.searchBooks(this.state.query);
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search"> Close </Link>
          <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
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