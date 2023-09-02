import { useState } from 'react';
import axios from 'axios';


export function AddBook() {

    const [image, setImage] = useState('');
    const [isbn, setIsbn] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('isbn', isbn);
        formData.append('image', image);

        await axios.post('/book/testupload', formData)
            .then(res => console.log('File uploaded: '))
    }

    return (
        <>
            <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                <input type="text" name='isbn' onChange={(e) => setIsbn(e.target.value)}></input>
                <input type="file" name='image' onChange={(e) => setImage(e.target.files[0])}></input>
                <button type="submit">Add</button>
            </form>
        </>
    );
}