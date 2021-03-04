import React from 'react';
import Book from './Book';

const Shelf = ({title,handleChange,shelf,books,filter,loading}) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                     loading ? <div>Loading.....</div> : books.map(book => (book.shelf === filter ? <Book book={book}
                        key={
                            book.id
                        }
                        handleChange={
                            handleChange
                        }
                        shelf={
                            shelf
                        }/> : null))
                } </ol>
            </div>
        </div>
    );
}

export default Shelf;
