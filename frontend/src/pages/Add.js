import '../styles/Add.css'
import React, { useState } from 'react'
import axios from 'axios';

const Add = () => {
    const [phrase, setPhrase] = useState({
        slovak_word: "",
        english_word: "",
    });

    const handleChange = (e) => {
        setPhrase((prev) => ({...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8800/words", phrase)
            
            setPhrase({
                slovak_word: "",
                english_word: "",
            });

        } catch(err) {
            console.log(err);
        }
    }

    return (
            <form onSubmit={handleClick} className='add-phrase'>
                <h1>ADD NEW WORD</h1>
                <input type="text" placeholder='Slovak' onChange={handleChange} name='slovak_word' value={phrase.slovak_word} required/>
                <input type="text" placeholder='English' onChange={handleChange} name='english_word' value={phrase.english_word} required/>
                <button>Submit</button>
           </form>
    )
}

export default Add;