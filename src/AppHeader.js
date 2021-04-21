import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';

const AppHeader = () => {
  return (
    <div className="list-books-title">
      <h1>
        <span className="fa-icons">
          <FontAwesomeIcon icon={faBookReader} />
        </span>
        My Reads: A Book Tracking App
      </h1>
    </div>
  );
}

export default AppHeader;