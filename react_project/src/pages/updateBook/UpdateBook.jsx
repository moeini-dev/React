import { useContext, useState, useRef } from 'react';
import { AuthContext } from './../../authContext/AuthContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export function UpdateBook() {

  const locationState = useLocation();

  //A new way to convert String to Boolean! Because Boolean('blablabla') always return 'true' !!!!
  const isFeaturedFromDefault = JSON.stringify(locationState.state.isFeatured) === 'true';


  console.log('+++ isFeaturedFromDefault: ', isFeaturedFromDefault)

  console.log('+++ location state: ', locationState.state)

  const user = useContext(AuthContext);


  const [imageUpdate, setImageUpdate] = useState('');
  const [bookFileUpdate, setBookFileUpdate] = useState('');
  const isbn = useRef('');
  // const [title, setTitle] = useState('');
  const title = useRef('');
  const authorName = useRef('');
  const translatorName = useRef('');
  const publisherName = useRef('');
  const price = useRef('');
  const about = useRef('');
  const [isFeatured, setIsFeatured] = useState(isFeaturedFromDefault);
  const publicationYear = useRef('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  let translatorDefaultValue = '';
  if (locationState.state.translator?.firstName) {
    translatorDefaultValue = JSON.stringify(locationState.state.translator?.firstName).replace(/['"]+/g, '') + ' ' + JSON.stringify(locationState.state.translator?.lastName).replace(/['"]+/g, '')
  } else { translatorDefaultValue = ''; }


  let publicationYearDefualtValue = (locationState.state.publicationYear !== null ? `${JSON.stringify(locationState.state.publicationYear).replace(/['"]+/g, '')}` : '')


  let aboutDefaultValue = (locationState.state.about !== null ? `${JSON.stringify(locationState.state.about).replace(/['"]+/g, '')}` : '-- Add a description for This book --')

  // const data = {
  //   imageUpdate,
  //   isbn,
  //   title,
  //   authorName,
  //   translatorName,
  //   publisherName,
  //   price,
  //   about,
  //   isFeatured,
  //   publicationYear
  // }


  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('isbn', isbn.current?.value);
    formData.append('imageUpdate', imageUpdate);
    formData.append('bookFileUpdate', bookFileUpdate);
    // formData.append('title', title.current?.value);
    formData.append('title', title.current?.value);
    formData.append('authorName', authorName.current?.value);
    formData.append('translatorName', translatorName.current?.value);
    formData.append('publisherName', publisherName.current?.value);
    formData.append('price', price.current?.value);
    formData.append('about', about.current?.value);
    formData.append('isFeatured', isFeatured);
    formData.append('publicationYear', publicationYear.current?.value);

    /**!!! Surprisingly this little line of code makes axios to return 'request aborted' error !!! */
    // console.log('=== Data: ', formData);   

    // if (isbn == (undefined || null) || title == (undefined || null) || price == (undefined || null) || publisherName == (undefined || null)){
    //     setError('ISBN, Title, Author, ')
    // }
    if (isbn === '') {
      setError('ISBN is required')
      return
    }


    // await axios.put(`/book/${isbn.current.value}`, formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // })



    await axios.put(`/book/${isbn.current.value}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        setSuccess(res.data.msg)
        setTimeout(() => { setError('') }, 3000)

        return
      })
      .catch(err => {
        if (err.code === 'ECONNABORTED') {
          console.log(err)
        } else {
          setError(err.response.data.msg)
          console.log(err)
          setTimeout(() => { setError('') }, 50000)
        }
      })
  }

  return (
    <>
      <div className="mainForm">
        {(error !== '' ? <div className='errorMessage' >{error}</div> : <div className='error'></div>)}
        {(success !== '' ? <div className='successMessage'>{success}</div> : <div className='success'></div>)}
        <form className="addBookForm" method="POST" encType="multipart/form-data">
          <input type="text" ref={isbn} name='isbn' placeholder="ISBN" defaultValue={`${JSON.stringify(locationState.state.isbn)}`}></input>
          <input type="text" ref={title} name='title' placeholder="Title" defaultValue={`${JSON.stringify(locationState.state.title).replace(/['"]+/g, '')}`}></input>
          <div className="twinGroup">
            <input type="text" ref={authorName} name='authorName' placeholder="Author"
              defaultValue={`${JSON.stringify(locationState.state.author.firstName).replace(/['"]+/g, '')} ${JSON.stringify(locationState.state.author.lastName).replace(/['"]+/g, '')}`}></input>
            <input type="text" ref={translatorName} name='translatorName' placeholder="Translator" defaultValue={translatorDefaultValue}></input>
          </div>
          <div className="twinGroup">
            <input type="text" ref={price} name='price' placeholder="Price" defaultValue={`${JSON.stringify(locationState.state.price).replace(/['"]+/g, '')}`}></input>
            <input type="text" ref={publicationYear} name='publicationYear' placeholder="Publication Year" defaultValue={publicationYearDefualtValue}></input>
          </div>
          <input type="text" ref={publisherName} name='publisherName' placeholder="Publisher" defaultValue={`${JSON.stringify(locationState.state.publisher.name).replace(/['"]+/g, '')}`}></input>
          <textarea rows="10" cols="25" ref={about} name='about' defaultValue={aboutDefaultValue}></textarea>
          <div className="checkboxDiv">
            <input type="checkbox" name='isFeatured' id="isFeaturedCheck" checked={isFeatured} style={{ width: 15, marginRight: 10 }} onChange={(e) => setIsFeatured(!isFeatured)}></input>
            <label htmlFor="isFeaturedCheck">Featured book</label>
          </div>
          <div>
            <label htmlFor="fileUpload" id="imageUploadLabel">Choose the cover</label>
            <input className="imageUpload" type="file" name="imageUpdate" id="fileUpload" onChange={(e) => {
              setImageUpdate(e.target.files[0])
              if (document.querySelector('#imageUploadLabel')) {
                document.querySelector('#imageUploadLabel').id = "imageUploadLabelSELECTED";
                document.querySelector('#imageUploadLabelSELECTED').childNodes[0].textContent = "Cover image selected";
              }
            }}></input>
          </div>
          <div>
            <label htmlFor="bookFileUpload" id="bookFileUploadLabel">Choose book file</label>
            <input className="bookUpload" type="file" name="bookFileUpdate" id="bookFileUpload" onChange={(e) => {
              setBookFileUpdate(e.target.files[0])
              if (document.querySelector('#bookFileUploadLabel')) {
                document.querySelector('#bookFileUploadLabel').id = "bookFileUploadSELECTED";
                document.querySelector('#bookFileUploadSELECTED').childNodes[0].textContent = "Book file selected";
              }
            }}></input>
          </div>
          <button className="addBook" type="button" onClick={handleSubmit}>Add</button>
        </form>
      </div>
    </>
  );
}


