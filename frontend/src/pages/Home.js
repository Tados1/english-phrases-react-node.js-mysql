import '../styles/Home.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {
  const [randomWord, setRandomWord] = useState('')
  const [guessWord, setGuessWord] = useState('')
  const [isCorrectGuess, setIsCorrectGuess] = useState(false)
  const [isNotCorrectGuess, setIsNotCorrectGuess] = useState(false)
  const [readyToGuessing, setReadyToGuessing] = useState(false)
  const [hideStartGuessing, setHideStartGuessing] = useState(true)
  const [noPhrases, setNoPhrases] = useState(false)
  const [correctWord, setCorrectWord] = useState('')
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8800/words");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  const startGuessing = () => {
    if (!data || data.length === 0) {
      setNoPhrases(true);
      return;
    } 
    setReadyToGuessing(true);
    const randomIndex = Math.floor(Math.random() * data.length);
    setRandomWord(data[randomIndex].slovak_word);
    setCorrectWord(data[randomIndex].english_word); 
    setHideStartGuessing(false);
  }

  const sendGuessWord = (e) => {
    e.preventDefault();
    
    if (guessWord.toLowerCase() === correctWord.toLowerCase()) {
      setIsCorrectGuess(true);
    } else {
      setIsNotCorrectGuess(true);
    }

    setTimeout(() => {
      setIsCorrectGuess(false);
      setIsNotCorrectGuess(false);
      setGuessWord('');
      startGuessing();
    }, 1200);
  }

  return (
    <div className="content">
      {hideStartGuessing && <button onClick={startGuessing} className='start-button'>Start Guessing</button>}
      {noPhrases ? (
        <div>There are no more phrases...</div>
      ) : readyToGuessing && (
        <div className="guess-word">
          <div className='english-guess-word'><p>{randomWord}</p></div>
          <form>
            <input
              type="text"
              placeholder="Guess the phrase"
              onChange={(e) => setGuessWord(e.target.value)}
              value={guessWord}
            />
            <button onClick={sendGuessWord}>SUBMIT</button>
          </form>
          
          {isCorrectGuess && 
            <div className='right-answer'>
              <h1>You guessed it!</h1>
            </div>
          }

          {isNotCorrectGuess && 
            <div className='wrong-answer'>
              <h1>You didn't guess!</h1>
              <p>{correctWord}</p>
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default Home;