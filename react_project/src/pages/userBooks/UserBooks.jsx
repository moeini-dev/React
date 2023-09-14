import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { useEffect, useState } from 'react';
import { Navbar } from './../../components/Navbar/Navbar';
import { Item } from './../../components/Item/Item';
import axios from "axios";

export function UserBooks() {

  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  const getUserBooks = async () => {
    try {
      const books = await axios.get(`/user/${user?.user?.uuid}/books`);
      console.log('===== Books from axios: ', books.data);
      setBooks(books.data);
    } catch (err) {

    }
  }

  useEffect(() => {
    getUserBooks();
    console.log('== This is User books ==', books);
  }, [])


  return (
    <>
      <Navbar />
      <div className="main">

        <div className="foundBooksContainer">
          {books.length > 1 ?
            <div className="multipleFoundBooks">
              {books.map(book => {
                console.log(book);
                return <div>{
                  <Item
                    link={'/book/' + book.isbn}
                    image={book.image}
                    name={book.title}
                    author={' '} key={book.title} />
                }</div>
              })}
            </div> : books[0] ? <div>{
              <Item
                link={'/book/' + books[0].isbn}
                image={books[0].image}
                name={books[0].title}
                author={' '} key={books[0].title} />
            }</div> : <div>You have no books yet</div>}
        </div>
      </div>

    </>
  );
}