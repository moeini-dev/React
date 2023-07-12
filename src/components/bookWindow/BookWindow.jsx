import './bookWindow.css';
import { Item } from './../Item/Item';
import { useRef } from 'react';

export function BookWindow() {

  const listRef = useRef();

  return (
    <div className="windowContainer">
      <div className="windowTitle">
        <span className="title">Classic Novels</span>
        <a className="windowItemLink" href="google.com">
          <div className="seeAll">
            <span className="text">See all</span>
            <svg className="windowRightArrow" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m375-240-43-43 198-198-198-198 43-43 241 241-241 241Z" /></svg>
          </div></a>
      </div>
      <div className="arrowLeft">
        <svg className="arrowLeftIcon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z" /></svg>
      </div>
      <div className="windowItems" ref={listRef}>
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
      <div className="arrowRight">
        <svg className="arrowRightIcon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m375-240-43-43 198-198-198-198 43-43 241 241-241 241Z" /></svg>
      </div>
    </div >
  );
}