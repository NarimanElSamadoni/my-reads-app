import React, { Component } from 'react';

class BookCtrl extends Component {
  constructor() {
    super();
    this.state = {
      value: 'none',
      updateBook: false
    }

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(event) {
    const { value } = event.target;
    this.setState(() => ({
      value: value,
      updateBook: true
    }));
  }

  componentDidMount() {
    const currentShelf = (this.props.currentShelf) ? this.props.currentShelf : 'none';
    this.setState((curState) => ({
      ...curState,
      value: currentShelf
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.updateBook && prevState.value !== this.state.value) {
      this.props.updateShelf(this.state.value);
    }
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.value} onChange={this.changeHandler}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }

}

export default BookCtrl;