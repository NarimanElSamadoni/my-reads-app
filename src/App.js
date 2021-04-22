import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './book/BookShelf';
import AppHeader from './shared/AppHeader';
import SearchBooks from './search/SearchBooks';
import AddBook from './book/AddBook';
import BookDetails from './book/BookDetails';

const shelves = [
  { id: 1, key: 'currentlyReading', title: 'Currently Reading' },
  { id: 2, key: 'wantToRead', title: 'Want to Read' },
  { id: 3, key: 'read', title: 'Read' }
];

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      booksInShelves: {
        currentlyReading: [],
        wantToRead: [],
        read: []
      },
      reloadData: false
    }
    this.updateBookShelf = this.updateBookShelf.bind(this);
  }

  loadBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState((curState) => ({
        ...curState,
        books: books,
        reloadData: false
      }));
    });
  }

  initializeBooksInShelves() {
    let result = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
    this.state.books.forEach(bk => {
      result[bk.shelf] = result[bk.shelf].concat([bk.id]);
    });
    if (!this.isEqual(this.state.booksInShelves, result)) {
      this.setState((curState) => ({
        ...curState,
        booksInShelves: result
      }));
    }
  }

  updateBookShelf(book, newShelf) {
    BooksAPI.update(book, newShelf).then((res) => {
      this.setState((curState) => ({
        ...curState,
        booksInShelves: res,
        reloadData: true
      }));
    });
  }

  isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  componentDidMount() {
    this.loadBooks();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.reloadData) {
      this.loadBooks();
    } else {
      if (this.state.books.length !== prevState.books.length
        || !this.isEqual(this.state.booksInShelves, prevState.booksInShelves)) {
        this.initializeBooksInShelves();
      }
    }
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
                  shelves.map(shelf => (
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
        <Route path="/search" render={() => (
          <SearchBooks
            booksInShelves={this.state.booksInShelves}
            updateShelf={this.updateBookShelf}
          />
        )} />
        <Route path="/books/:bookId" component={BookDetails} />
      </div>
    )
  }
}

export default BooksApp
