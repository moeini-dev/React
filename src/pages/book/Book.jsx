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
              <h1 className="bookTitle">The Old Man And The SeaThe Old Man And The SeaThe Old Man And The Sea</h1>
              <div className="bookAuthor">Author:</div>
              <div className="bookTranslator">Translator:</div>
              <div className="bookPublisher">Publisher:</div>
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