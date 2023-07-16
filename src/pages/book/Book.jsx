import { Navbar } from "../../components/Navbar/Navbar";
import './book.css';

export function Book(props) {
  return (
    <div className="book">
      <div className="bookTop">
        <Navbar />
      </div>
      <div className="bookMain">
        <div className="bookHeader">
          <div className="bookHeaderLeft">
            <div className="bookHeaderImage">
              <img src={require(`./../../assets/${props.image}`)} alt="" className="bookImage" />
            </div>
            <div className="bookHeaderProperties">
              <h1 className="bookTitle">The Old Man And The Sea</h1>
              <div className="bookProperties">
                <div className="bookPropertyKeys">
                  <p className="bookAuthorKey">Author:</p>
                  <p className="bookTranslatorKey">Translator:</p>
                  <p className="bookPublisherKey">Publisher:</p>
                </div>
                <div className="bookPropertyValues">
                  <p className="bookAuthorValue">Ernest Hemingway</p>
                  <p className="bookTranslatorValue">Majid Amigh</p>
                  <p className="bookPublisherValue">Penguain</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bookHeaderRight">
            <div className="price">18 $</div>
            <button className="goodreads">Check on Goodreads</button>
            <button className="addToCart">Add to your cart</button>
          </div>
        </div>
        <div className="bookDescription"></div>
      </div>
    </div>
  );
}