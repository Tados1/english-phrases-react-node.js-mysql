import '../styles/Update.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [phrase, setPhrase] = useState({
        slovak_word: "",
        english_word: "",
    });

    const navigate = useNavigate()
    const location = useLocation()

    const phraseId = location.pathname.split("/")[2]

    useEffect(() => {
        const fetchPhrase = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/words/${phraseId}`);
                setPhrase(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchPhrase();
    }, [phraseId]);

    const handleChange = (e) => {
        setPhrase((prev) => ({...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:8800/words/${phraseId}`, phrase)
            navigate("/words")
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleClick} className='update-phrase'>
            <h1>EDIT THE PHRASE</h1>
            <input type="text" placeholder='slovak word' onChange={handleChange} name='slovak_word' value={phrase.slovak_word}/>
            <input type="text" placeholder='english word' onChange={handleChange} name='english_word' value={phrase.english_word}/>

            <button>Update</button>
        </form>
    )
}

export default Update;