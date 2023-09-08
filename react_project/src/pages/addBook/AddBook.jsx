import './addBook.css';
import { useState, useRef } from 'react';
import axios from 'axios';


export function AddBook() {

    // // const [image, setImage] = useState('');
    // const image = useRef('');
    // const [bookFile, setBookFile] = useState('');
    // const [isbn, setIsbn] = useState('');
    // // const [title, setTitle] = useState('');
    // const title = useRef('');
    // const [authorName, setAuthorName] = useState('');
    // const [translatorName, setTranslatorName] = useState(null);
    // const [publisherName, setPublisherName] = useState('');
    // const [price, setPrice] = useState('');
    // const [about, setAbout] = useState('');
    // const [isFeatured, setIsFeatured] = useState(false);
    // const [publicationYear, setPublicationYear] = useState('');


    const [image, setImage] = useState('');
    const [bookFile, setBookFile] = useState('');
    const isbn = useRef('');
    // const [title, setTitle] = useState('');
    const title = useRef('');
    const authorName = useRef('');
    const translatorName = useRef(null);
    const publisherName = useRef('');
    const price = useRef('');
    const about = useRef('');
    const [isFeatured, setIsFeatured] = useState(false);
    const publicationYear = useRef('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const data = {
        image,
        isbn,
        title,
        authorName,
        translatorName,
        publisherName,
        price,
        about,
        isFeatured,
        publicationYear
    }


    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('isbn', isbn.current?.value);
        formData.append('image', image);
        formData.append('bookFile', bookFile);
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

        await axios.post('/book/addbook', formData, {
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
                    setError('Error: This ISBN maybe already exists!')
                    console.log(err)
                } else {
                    setError(err.response.data.msg)
                    setTimeout(() => { setError('') }, 3000)
                }
            })
    }

    return (
        <>
            <div className="mainForm">
                {(error !== '' ? <div className='errorMessage' >{error}</div> : <div className='error'></div>)}
                {(success !== '' ? <div className='successMessage'>{success}</div> : <div className='success'></div>)}
                <form className="addBookForm" method="POST" encType="multipart/form-data">
                    <input type="text" ref={isbn} name='isbn' placeholder="ISBN"></input>
                    <input type="text" ref={title} name='title' placeholder="Title"></input>
                    <div className="twinGroup">
                        <input type="text" ref={authorName} name='authorName' placeholder="Author"></input>
                        <input type="text" ref={translatorName} name='translatorName' placeholder="Translator"></input>
                    </div>
                    <div className="twinGroup">
                        <input type="text" ref={price} name='price' placeholder="Price" ></input>
                        <input type="text" ref={publicationYear} name='publicationYear' placeholder="Publication Year"></input>
                    </div>
                    <input type="text" ref={publisherName} name='publisherName' placeholder="Publisher"></input>
                    <textarea rows="10" cols="25" ref={about} name='about' defaultValue="A description about the book..." ></textarea>
                    <div className="checkboxDiv">
                        <input type="checkbox" name='isFeatured' id="isFeaturedCheck" style={{ width: 15, marginRight: 10 }} onChange={(e) => setIsFeatured(!isFeatured)}></input>
                        <label htmlFor="isFeaturedCheck">Featured book</label>
                    </div>
                    <div>
                        <label htmlFor="fileUpload" id="imageUploadLabel">Choose the cover</label>
                        <input className="imageUpload" type="file" name="image" id="fileUpload" onChange={(e) => {
                            setImage(e.target.files[0])
                            if (document.querySelector('#imageUploadLabel')) {
                                document.querySelector('#imageUploadLabel').id = "imageUploadLabelSELECTED";
                                document.querySelector('#imageUploadLabelSELECTED').childNodes[0].textContent = "Cover image selected";
                            }
                        }}></input>
                    </div>
                    <div>
                        <label htmlFor="bookFileUpload" id="bookFileUploadLabel">Choose book file</label>
                        <input className="bookUpload" type="file" name="bookFile" id="bookFileUpload" onChange={(e) => {
                            setBookFile(e.target.files[0])
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