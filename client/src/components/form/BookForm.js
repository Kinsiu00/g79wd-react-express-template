import React, { Component } from 'react';
import './BookForm.css';
import axios from 'axios';

class BookForm extends Component {

  onSubmit = (e) => {
    e.preventDefault();
    const {author, title, pages, id} = this.props.currentBook
    if (this.props.editing) {
      // update
      axios.patch(`/api/books/${id}`, { author, title, pages })
        .then((result) => {
          this.props.updateBooks(result.data)
        })
    } else {
      // create a new record
      axios.post('/api/books', { author, title, pages })
        .then((result) => {
          this.props.updateBooks(result.data)
        })
    }
  }

  onChange = (e) => {this.props.updateBook(e.target.name, e.target.value)}

  render() {
    const {author, title, pages, id} = this.props.currentBook
    return (
      <form className="Book" onSubmit={this.onSubmit} >
        <h3>{this.props.editing ? "Update Book" : "Add A Book"}</h3>
        <p className="form-group">
          <label htmlFor="author">Author</label>
          <input
              type="text"
              name="author"
              required
              className="form-control"
              onChange={this.onChange}
              value={author}
          />
        </p>
        <p className="form-group">
          <label htmlFor="title">Title</label>
          <input
              type="text"
              name="title"
              required
              className="form-control"
              onChange={this.onChange}
              value={title}
          />
        </p>
        <p className="form-group">
          <label htmlFor="pages">Pages</label>
          <input
              type="text"
              name="pages"
              required
              className="form-control"
              onChange={this.onChange}
              value={pages}
          />
        </p>
        <p className="form-group">
          {
            this.props.editing &&
            <a className="btn btn-default"
              style={{marginRight: ".5em"}}
              onClick={this.props.stopEdit}
            >Cancel</a>
          }
          <input
            type="submit"
            value={this.props.editing ? "Update Book" : "Add Book"}
            className="btn btn-primary"
          />
        </p>
      </form>
    )
  }
}

export default BookForm;
