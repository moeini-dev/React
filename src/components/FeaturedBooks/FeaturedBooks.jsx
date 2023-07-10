import './featuredBooks.css';
import './../../index.css';
import { Item } from './../Item/Item';

export function FeaturedBooks() {
  return (
    <div className="container">
      <div className="featuredBooksTitle">
        <div className="titleText">Top Books <br /><br />MAKE SUMMER SHINY</div>
        <div className="offPersentage">80% OFF</div>
      </div>
      <div className="itemWrapper">
        <Item
          link="google.com"
          image="the-old-man-and-the-sea2.jpg"
          name="The old man and the sea"
          author="Ernest Hemigway" />

        <Item
          link="google.com"
          image="1984.jpg"
          name="1984"
          author="George Orwell" />

        <Item
          link="google.com"
          image="the-midnight-library.jpg"
          name="The Midnight Library"
          author="Matt Haig" />
      </div>
    </div>
  );
}