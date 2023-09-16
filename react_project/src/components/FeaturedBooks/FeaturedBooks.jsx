import './featuredBooks.css';
import './../../index.css';
import { Item } from './../Item/Item';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
export function FeaturedBooks() {

  const [featuredBooks, setfeaturedBooks] = useState();


  const listRef = useRef();

  const [slideNumber, setSlideNumber] = useState(0);
  const [xAxis, setXAxis] = useState(0);

  function handleClick(direction) {

    if (direction === "left" && slideNumber < 3) {
      const newXAxis = xAxis - 180;     //For being able to use new state value 
      setXAxis(newXAxis);
      listRef.current.style.transform = `translateX(${newXAxis}px)`;
      setSlideNumber(slideNumber + 1);
    }

    if (direction === "right" && slideNumber > 0) {
      const newXAxis = xAxis + 180;
      setXAxis(newXAxis);
      listRef.current.style.transform = `translateX(${newXAxis}px)`;
      setSlideNumber(slideNumber - 1);
    }
  }



  useEffect(() => {

    axios.get('/book/featured')
      .then(result => {
        setfeaturedBooks(result)
      })
      .catch(err => console.log('Error: ', err))
  }, []);


  return (
    <div className="container">
      <div className="featuredBooksTitle">
        <div className="titleText">Top Books <br /><br />MAKE SUMMER SHINY</div>
        <div className="offPersentage">80% OFF</div>
      </div>
      <div className="itemWrapper" style={{ 'marginLeft': 40 }}>
        {(typeof featuredBooks == 'undefined') ? (
          <div>No featured Books</div>
        ) : (
            <>
              <div className="featuredWindowContainer">
                <div className="wapperWindow" style={{ overflow: 'hidden' }}>
                  <div className="arrowLeft" style={{ zIndex: 80 }} onClick={() => handleClick("left")}>
                    <svg className="arrowLeftIcon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z" /></svg>
                  </div>
                  <div className="windowItems" ref={listRef}>
                    {featuredBooks.data.books.map(book => {

                      const authorData = book['author'];
                      return (
                        <Item
                          link={'/book/' + book.isbn}
                          image={book.image}
                          name={book.title}
                          author={
                            authorData['firstName'] + ' ' + authorData['lastName']} key={book.isbn} />
                      )
                    })}
                  </div>
                  <div className="arrowRightF" onClick={() => handleClick("right")}>
                    <svg className="arrowRightIcon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m375-240-43-43 198-198-198-198 43-43 241 241-241 241Z" /></svg>
                  </div>
                </div>
              </div >
            </>
          )}
      </div>
    </div >
  );
}