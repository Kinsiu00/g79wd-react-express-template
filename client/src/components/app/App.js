import React, { Component } from 'react';
import './App.css';
import Book from '../book/Book';
import Header from '../header/Header';
import BookForm from '../form/BookForm';

class App extends Component {
  state = {
    loading: true,
    books: [],
    editing: false,
    currentBook: {
      id: null,
      title: "",
      author: "",
      pages: ""
    }
  }

  updateBooks = (books) => {
    this.setState({
      books: books,
      editing: false,
      currentBook: {
        id: null,
        title: "",
        author: "",
        pages: ""
      }
    })

  }

  updateBook = (attribute, value) => {
    this.setState(
      {currentBook: {...this.state.currentBook, [attribute]: value}}
    )
  }

  editBook = (id) => {
    const book = this.state.books.find( (b) => b.id === id)
    this.setState({currentBook: book, editing: true})
  }

  stopEdit = () => {
    this.setState({
      editing: false,
      currentBook: {
        id: null,
        title: "",
        author: "",
        pages: ""
      }
    });
  }

  componentWillMount = async () => {
    const response = await fetch('/api/books')
    const json = await response.json()
    console.log(json.books)
    if (json.books) this.setState({ loading: false, books: json.books})
  }

  render() {
    const books = this.state.books.map( (book) => {
      return (
        <Book
          key={book.id}
          book={book}
          updateBooks={this.updateBooks}
          editBook={this.editBook}
        />
      );
    });
    return (
      <div className="App">
        <Header />
        <BookForm updateBooks={this.updateBooks}
          updateBook={this.updateBook}
          currentBook={this.state.currentBook}
          editing={this.state.editing}
          stopEdit={this.stopEdit}
        />
        {
          !this.state.loading && books
        }
      </div>
    );
  }
}

export default App;
