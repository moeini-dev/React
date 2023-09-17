import './home.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { FeaturedBooks } from '../../components/FeaturedBooks/FeaturedBooks';
import { BookWindow } from '../../components/bookWindow/BookWindow';
import { AuthContext } from '../../authContext/AuthContext';
import { useContext } from 'react';
import { StoreBookList } from '../../components/storeBookList/StoreBookList';

export function Home() {

  const { user } = useContext(AuthContext);
  console.log('User from Context: ', user);
  return (
    <div className="home">
      <Navbar />
      <div className="main">
        <FeaturedBooks />
        <BookWindow />
        <StoreBookList></StoreBookList>
      </div>
      <div className="footer"></div>
    </div>
  );
}