import { Navbar } from "../../components/Navbar/Navbar";
import './book.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function Book(props) {

  const [bookDeleted, setBookDeleted] = useState(false);

  const navigate = useNavigate();

  const { isbn } = useParams();
  const [book, setBook] = useState('');
  // const [isAdmin, setIsAdmin] = useState(true);

  const { user } = useContext(AuthContext);

  const getBook = async () => {
    try {
      const response = await axios.get(`/book/${isbn}`);
      setBook(response.data.book);
    } catch {
      setBook(null)
    }
  }

  const handleDeleteBook = async (event) => {
    const confirmDelete = window.confirm('ATTENTION: Delete this book premanently?');
    if (confirmDelete === true) {
      try {
        const response = await axios.delete(`/book/${isbn}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        document.querySelector('.deleteBook').style = 'color: white; background-color:darkgray;';
        document.querySelector('.deleteBook').innerHTML = response.data.msg;
        setBookDeleted(true);
        setTimeout(() => {
          navigate('/');
        }, 4000)

      } catch{ alert('Something went wrong. Login again!') }
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

              {bookDeleted ? <div className="bookDeleteMessage" style={{ 'color': 'rgb(25, 125, 143)', 'marginTop': '3vw' }}>Redirecting to Home Page ...</div> : <div></div>}

              {user?.user?.isAdmin ? <div className="adminFeatures">
                <Link to={`/book/update/${book.isbn}`} state={book} className="editBook">Edit</Link>
                <button className="deleteBook" onClick={handleDeleteBook}>Delete</button>
              </div> : <div className="adminFeatures"></div>}
            </div>
          </div>
          <div className="bookHeaderRight">
            {book && <div className="price">$ {book.price}</div>}
            {/* <button className="goodreads">Check on Goodreads</button> */}
            <button className="addToCart">Buy</button>
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