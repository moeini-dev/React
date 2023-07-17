import './featuredBooks.css';
import './../../index.css';
import { Item } from './../Item/Item';
import { useEffect, useState } from 'react';

export function FeaturedBooks() {

  const [featuredBookData, setfeaturedBookData] = useState();

  useEffect(() => {
    fetch("/api/featuredBooks")
      .then(res => res.json())
      .then(data => {
        setfeaturedBookData(data);
        console.log(featuredBookData);
      })
  }, []);


  return (
    <div className="container">
      <div className="featuredBooksTitle">
        <div className="titleText">Top Books <br /><br />MAKE SUMMER SHINY</div>
        <div className="offPersentage">80% OFF</div>
      </div>
      <div className="itemWrapper">
        {(typeof featuredBookData === 'undefined') ? (
          <div></div>
        ) : (
            <>
              <Item
                link={featuredBookData.link}
                image={featuredBookData.image}
                name={featuredBookData.name}
                author={featuredBookData.author} />

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
            </>
          )}
      </div>
    </div>
  );
}