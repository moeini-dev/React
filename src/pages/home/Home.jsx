import './home.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { FeaturedBooks } from '../../components/FeaturedBooks/FeaturedBooks';

window.onscroll = function () {
  console.log(window.scrollY);
}

export function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="main">
        <div className="wrapper">
          <FeaturedBooks />
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}