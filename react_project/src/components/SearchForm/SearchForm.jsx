import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchForm.css';

export function SearchForm() {

  const [searchOption, setSearchOption] = useState('Title');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  function handleOption(event) {
    setSearchOption(event.target.value);
  }

  function handleText(event) {
    setSearchText(event.target.value);
  }

  function handleSubmit(event) {

    event.preventDefault();

    const data = {
      searchOption,
      searchText
    }
    console.log(data);
    navigate('/searchresults', { state: { data } });
  }


  return (
    <>
      <div className="searchBox" onSubmit={handleSubmit}>
        <form className="optionForm">
          <select value={searchOption} name="searchOptions" id="searchOptions" onChange={handleOption}>
            <option value="Title">Title</option>
            <option value="Author">Author</option>
            <option value="Translator">Translator</option>
            <option value="Publisher">Publisher</option>
          </select>
          <input className="searchText" type="text" value={searchText} onChange={handleText} placeholder="Search name, author ..." />
          <button type="submit" className="searchFormButton">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z" /></svg>
          </button>
        </form>
        {/* <form className="textForm">
          <input className="searchText" type="text" value={searchText} onChange={handleText} placeholder="Search name, author ..." />
        </form> */}
        {/* <button className="searchFormButton">
          <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z" /></svg>
        </button> */}
      </div>
    </>
  );
}
