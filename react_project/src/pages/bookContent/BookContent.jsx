import './bookContent.css';
import React, { useState } from 'react';
import { ReactReader } from 'react-reader';
import { useLocation } from 'react-router-dom';
import { Item } from '../../components/Item/Item';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../authContext/AuthContext';
import { useEffect } from 'react';

export function BookContent() {

  const locationState = useLocation();
  const { user } = useContext(AuthContext);

  const [userHasBook, setUserHasBook] = useState(false);

  const checkUserHasBook = async () => {
    try {
      const userHasBook = await axios.get(`/user/check/checkBook?bookIsbn=${locationState?.state?.isbn}&userUuid=${user?.user?.uuid}`);
      setUserHasBook(userHasBook.data.hasBook);
      // console.log('Log from userHasBook: ', userHasBook.data.hasBook);
    } catch (err) {
      console.log('Error from checkUserHasBook: ', err)
    }
  }

  // console.log(locationState?.state);

  // This location is completelly independent of useLocation.
  // It's a variable for react-reader to fuction properly
  const [location, setLocation] = useState(null)
  const locationChanged = epubcifi => { setLocation(epubcifi) }



  useEffect(() => {
    checkUserHasBook();
  }, [])

  return (
    <>
      {userHasBook === true ? <div style={{ height: '100vh' }}>
        <ReactReader
          location={location}
          locationChanged={locationChanged}
          url={`/bookFiles/${locationState?.state?.isbn}.epub`}
        />
      </div> : <div className="main">You do not own this book. Buy it first!</div>}
    </>
  );
}