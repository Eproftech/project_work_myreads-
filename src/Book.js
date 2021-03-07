import React from 'react';

const Book = ({book, handleChange}) => {
    let urlPath = book.imageLinks ? book.imageLinks.smallThumbnail || book.imageLinks.Thumbnail : "./icons/no-photo.svg";

    return (
        <li>
            <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${ urlPath })`}}></div>
                <div className="book-shelf-changer">
                <select onChange = {(event) => handleChange(event,book)} defaultValue = {book.shelf || 'none'} >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">
                <ul> 
                {
                  book.authors ?  book.authors.map((author,index)=> (
                        <li key={author+index}>{author}</li>
                    )) : null
                    }
                </ul>
            </div>
            </div>
    </li>
    );
};

export default Book;
