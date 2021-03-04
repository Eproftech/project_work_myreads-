import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book';
import Shelf from './Shelf';

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: [],
    loading: false,
    shelf: '',
    search: "",
    searchResult: []
  }

  componentDidMount() {
    window.history.replaceState('', '', '/')
    this.setState({loading: true})
    BooksAPI.getAll().then(books => {

      this.setState({
        loading: false
      }, () => {
          if (books.error) {
              this.setState({book: books.items});
          } else {
              this.setState({books: books});
          }
        });
      });
    }

    handleChange = (event, book) => {

        const Books = this.state.books.filter(item => item.id !== book.id)
        book.shelf = event.target.value
        Books.push(book)

        this.setState({books: Books})

    }

    handleSearch = (event) => {
        this.setState({loading: true});
        this.setState({
            search: event.target.value
        }, () => {
            BooksAPI.search(this.state.search).then(result => {
                this.setState({
                    searchResult: result.error ? [] : result
                }, () => {
                    this.setState({loading: false});
                });
            });
        });
    };

    render() {

        return (
            <div className="app">
                {
                this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <button className="close-search"
                                onClick={
                                    () => this.setState({
                                      showSearchPage: false
                                    },  window.history.replaceState('', '', '/'))
                            }>Close</button>
                            <div className="search-books-input-wrapper">
                                <input type="text" placeholder="Search by title or author"
                                    value={
                                        this.state.search
                                    }
                                    onChange={
                                        this.handleSearch
                                    }/>

                            </div>
                        </div>
                        <div className="search-books-results">
                            {
                            this.state.loading ? <h2 className="loading">Loading...</h2> : <ol className="books-grid">
                                {
                                this.state.searchResult.length === 0 ? <h2>Search For Your Favourite Books</h2> : this.state.searchResult.map(book => (
                                    <Book book={book}
                                        handleChange={
                                            this.handleChange
                                        }
                                        shelf={
                                            this.state.shelf
                                        }
                                        key={
                                            book.id
                                        }/>

                                ))
                            } </ol>
                        } </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>My Library</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Shelf handleChange ={this.handleChange} title="Currently Reading"
                                    shelf={
                                        this.state.shelf
                                    }
                                    books={
                                        this.state.books
                                    }
                                    filter="currentlyReading"/>
                                <Shelf handleChange ={this.handleChange} title="Want To Read"
                                    shelf={
                                        this.state.shelf
                                    }
                                    books={
                                        this.state.books
                                    }
                                    filter="wantToRead"/>
                                <Shelf handleChange ={this.handleChange} title="Read"
                                    shelf={
                                        this.state.shelf
                                    }
                                    books={
                                        this.state.books
                                    }
                                    filter="read"/>
                            </div>
                            <div className="open-search">
                                <button onClick={
                                    () => this.setState({
                                        showSearchPage: true
                                    }, window.history.replaceState('', '', '/search'))
                                }>Add a book</button>
                            </div>
                        </div>
                    </div>
                )
            } </div>

        )
    }
}

export default BooksApp