import './navbar.css';
import { SearchForm } from '../SearchForm/SearchForm';

export function Navbar() {
  return (
    <>
      <div className="top">
        <div className="logo">logo</div>
        <SearchForm />
      </div>

      <div className="bottom">
        <div className="userStuff">userStuff</div>
        <div className="category">category</div>
      </div>
    </>
  );
}


