import './featuredBooks.css';
import './../../index.css';

export function FeaturedBooks() {
  return (
    <div className="container">
      <div className="featuredBooksTitle">Item Title</div>
      <div className="itemWrapper">
        <a href="google.com">
          <div className="featuredBookItem">
            <img className="itemImage" src="https://fakeimg.pl/800x915?font=bebas" alt="" />
            <div className="itemName">The old man and the sea this is for text jsal</div>
            <div className="itemAuthor">Ernest Hemingway</div>
          </div>
        </a>
        <a href="google.com">
          <div className="featuredBookItem">
            <img className="itemImage" src="https://fakeimg.pl/800x915?font=bebas" alt="" />
            <div className="itemName">1984</div>
            <div className="itemAuthor">George Orwell</div>
          </div>
        </a>
        <a href="google.com">
          <div className="featuredBookItem">
            <img className="itemImage" src="https://fakeimg.pl/800x915?font=bebas" alt="" />
            <div className="itemName">The Master and Margarita</div>
            <div className="itemAuthor">Mikhail Bulgakov</div>
          </div>
        </a>
      </div>
    </div>
  );
}