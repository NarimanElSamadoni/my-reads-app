import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import AppHeader from './AppHeader';
import SearchBooks from './SearchBooks';
import AddBook from './AddBook';

const bookShelves = [
  {id: 1, title: 'Currently Reading'},
  {id: 2, title: 'Want to Read'},
  {id: 3, title: 'Read'}
];

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books
      }));
      console.log(this.state.books);
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
                    shelfBooks={this.state.books.filter(b => b.shelf.toLowerCase() === shelf.title.replace(' ', '').toLowerCase())} 
                  />
                ))
              }
            </div>
          </div>
          <AddBook />
        </div>
        )} />
        <Route path='/search' component={SearchBooks}/>
      </div>
    )
  }
}

export default BooksApp
