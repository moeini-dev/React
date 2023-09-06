import { Navbar } from "../../components/Navbar/Navbar";
import './book.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export function Book(props) {

  const { isbn } = useParams();
  const [book, setBook] = useState('');

  const getBook = async () => {
    try {
      const response = await axios.get(`/book/${isbn}`);
      setBook(response.data.book);
    } catch {
      setBook(null)
    }

  }

  useEffect(() => {
    getBook();
  }, [])

  console.log(book)

  return (
    <div className="book">
      <div className="bookTop">
        <Navbar />
      </div>
      <div className="bookMain">
        <div className="bookHeader">
          <div className="bookHeaderLeft">
            <div className="bookHeaderImage">
              {book ?
                <img src={`http://localhost:3000/images/${book.image}`} alt="" className="bookImage" /> :
                <img src={'http://localhost:3000/images/noImage.png'} alt="" className="bookImage" />}
            </div>
            <div className="bookHeaderProperties">
              {book ? <h1 className="bookTitle">{book.title}</h1> : 'Not found'}
              <div className="bookProperties">
                <div className="bookPropertyKeys">
                  <p className="bookAuthorKey">Author:</p>
                  {book && book.translator && <p className="bookTranslatorKey">Translator:</p>}
                  {book && book.publisher && <p className="bookPublisherKey">Publisher:</p>}
                </div>
                <div className="bookPropertyValues">
                  {book && book.author ? <p className="bookAuthorValue">{book.author.firstName + ' ' + book.author.lastName}</p> : 'no body'}                  {book && book.translator && <p className="bookTranslatorValue">{book.translator.firstName + ' ' + book.translator.lastName}</p>}
                  {book && book.publisher && <p className="bookPublisherValue">{book.publisher.name}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="bookHeaderRight">
            {book && <div className="price">$ {book.price}</div>}
            <button className="goodreads">Check on Goodreads</button>
            <button className="addToCart">Add to your cart</button>
          </div>
        </div>
        <div className="bookDescription">
          {book && <h2 className="bookDescriptionHeader">{book.title + ' by ' + book.author.firstName + ' ' + book.author.lastName}</h2>}
          <div className="bookDescriptionMain">
            {book && <article>{book.about}</article>}
          </div>
        </div>
        <div className="bookComments">

        </div>
      </div>
    </div >
  );
}