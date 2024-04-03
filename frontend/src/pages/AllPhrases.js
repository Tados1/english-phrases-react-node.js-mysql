import "../styles/AllPhrases.css";
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios';

const Phrases = () => {
    const [phrases, setPhrases] = useState([])
    const [searchPhrase, setSearchPhrase] = useState('');
    const [filteredData, setFilteredData] = useState(phrases);

    const searchPhraseFunction = (e) => {
        setSearchPhrase(e.target.value.toLowerCase())
    }    

    useEffect(()=> {
        const fetchAllPhrases = async () => {
            try { 
                const res = await axios.get("http://localhost:8800/words")
                setPhrases(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllPhrases()
    }, [])

    useEffect(() => {
        const filteredResults = phrases.filter((phrase) => {
          const { slovak_word, english_word } = phrase;
          return slovak_word.toLowerCase().includes(searchPhrase) || english_word.toLowerCase().includes(searchPhrase);
        });
        setFilteredData(filteredResults);
      }, [searchPhrase, phrases]);
    

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/words/"+id)
            window.location.reload()
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="all-phrases-container">
            <form className="search-form">
                <input
                type="text"
                placeholder='Search phrase'
                value={searchPhrase}
                onChange={searchPhraseFunction}
                />
            </form>

            <div className="all-phrases">
                {filteredData.map((phrase) => (
                    <div className="one-phrase" key={phrase.id}>
                        <div className="phrases">
                            {phrase.slovak_word && <p>{phrase.slovak_word}</p>}
                            {phrase.english_word && <p>{phrase.english_word}</p>}
                        </div>
                        <div className="btns">
                            <button className="delete" onClick={() => handleDelete(phrase.id)}>Delete</button>
                            <button className="edit"><Link to={`/update/${phrase.id}`}>Edit</Link></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Phrases;