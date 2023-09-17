import './storeBookList.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { Item } from "../Item/Item";

export function StoreBookList() {
  const [books, setBooks] = useState({});

  useEffect(() => {

    axios.get('/book', {
      params: {
        limit: 17
      }
    })
      .then(result => {
        setBooks(result)
      })
      .catch(err => console.log('Error: ', err))
  }, []);


  return (
    <>
      <div className="bookListContainer">
        <div className="bookListTitle">Explore Wisdom ...</div>
        <div className="bookListItems">

          {
            (typeof books.data == 'undefined') ? (<div>Nothing</div>) :
              (books.data.books.map(book => {
                let authorData = book['author'];
                if (authorData == null) { authorData = { firstName: 'No', lastName: ' Author' } }
                return (
                  <Item
                    link={'/book/' + book.isbn}
                    image={book.image}
                    name={book.title}
                    author={
                      authorData['firstName'] + ' ' + authorData['lastName']} key={book.isbn} />);
              }))
          }
        </div>
      </div>
    </>
  );

}