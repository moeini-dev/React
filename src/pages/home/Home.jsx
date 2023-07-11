import './home.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { FeaturedBooks } from '../../components/FeaturedBooks/FeaturedBooks';
import { BookWindow } from '../../components/bookWindow/BookWindow';

export function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="main">
        <FeaturedBooks />
        <BookWindow />
      </div>
      <div className="footer"></div>
    </div>
  );
}