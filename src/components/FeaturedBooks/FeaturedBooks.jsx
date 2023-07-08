import './featuredBooks.css';
import './../../index.css';

export function FeaturedBooks() {
  return (
    <div className="container">
      <div className="featuredBooksTitle">
        <div className="titleText">Top Books <br /><br />MAKE SUMMER SHINY</div>
        <div className="offPersentage">80% OFF</div>
      </div>
      <div className="itemWrapper">
        <a href="google.com">
          <div className="featuredBookItem">
            <img className="itemImage" src={require("../../pics/the-old-man-and-the-sea2.jpg")} alt="" />
            <div className="itemName">The old man and the sea</div>
            <div className="itemAuthor">Ernest Hemingway</div>
          </div>
        </a>
        <a href="google.com">
          <div className="featuredBookItem">
            <img className="itemImage" src={require("../../pics/1984.jpg")} alt="" />
            <div className="itemName">1984</div>
            <div className="itemAuthor">George Orwell</div>
          </div>
        </a>
        <a href="google.com">
          <div className="featuredBookItem">
            <img className="itemImage" src={require("../../pics/the-midnight-library.jpg")} alt="" />
            <div className="itemName">The Midnight Library</div>
            <div className="itemAuthor">Matt Haig</div>
          </div>
        </a>
      </div>
    </div>
  );
}