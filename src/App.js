import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import AppHeader from './AppHeader';
import SearchBooks from './SearchBooks';
import AddBook from './AddBook';

const bookShelves = [
  {id: 1, key: 'currentlyReading', title: 'Currently Reading'},
  {id: 2, key: 'wantToRead', title: 'Want to Read'},
  {id: 3, key: 'read', title: 'Read'}
];

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      books: [],
      reloadData: false
    }

    this.updateBookShelf = this.updateBookShelf.bind(this);
  }

  componentDidMount() {
    this.loadBooks();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.reloadData) {
      this.loadBooks();
    }
  }

  loadBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books
      }));
    });
  }

  updateBookShelf(book, newShelf) {
    BooksAPI.update(book, newShelf).then((res) => {
      this.setState((curState) => ({
        ...curState,
        reloadData: true
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
          <AppHeader />
          <div className="list-books-content">
            <div>
              {
                bookShelves.map(shelf => (
                  <BookShelf 
                    key={shelf.id}
                    title={shelf.title}
                    shelf={shelf.key}
                    shelfBooks={this.state.books.filter(b => b.shelf.toLowerCase() === shelf.key.toLowerCase())}
                    updateShelf={this.updateBookShelf}
                  />
                ))
              }
            </div>
          </div>
          <AddBook />
        </div>
        )} />
        <Route path='/search' render={() => (
          <SearchBooks updateShelf={this.updateBookShelf} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
