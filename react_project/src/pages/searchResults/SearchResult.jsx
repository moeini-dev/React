import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Item } from './../../components/Item/Item';
import { Navbar } from './../../components/Navbar/Navbar';
import axios from 'axios';
import './searchResults.css';

export function SearchResults() {

  const location = useLocation();
  const [books, setBooks] = useState('');

  useEffect(() => {

    // try {
    //   console.log(location.state.data.searchOption);
    // } catch{
    //   console.log('Nothing')
    // }

    const { searchOption, searchText } = location.state.data;

    axios.get(`/book?${searchOption.toLowerCase()}=${searchText}`)
      .then(result => setBooks(result.data.books))
      .catch(err => setBooks(''))
  }, [])


  return (
    <>
      <Navbar />
      <div className="main">
        {books.length == 1 ?
          <div className="nBooksFound">{books.length} result for you</div> :
          <div className="nBooksFound">{books.length} results for you</div>}
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
                    author={
                      book['author']['firstName'] + ' ' + book['author']['lastName']} key={book.title} />
                }</div>
              })}
            </div> : books[0] ? <div>{
              <Item
                link={'/book/' + books[0].isbn}
                image={books[0].image}
                name={books[0].title}
                author={
                  books[0]['author']['firstName'] + ' ' + books[0]['author']['lastName']} key={books[0].title} />
            }</div> : <div>Nothing Found! Make sure to type correctly</div>}
        </div>
      </div>

    </>
  );
}