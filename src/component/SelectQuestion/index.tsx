import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import './style.scss'
const SelectQuestion = () => {
  const navigate = useNavigate()
  const storedData = JSON.parse(localStorage.getItem('allData') || '[]')
  const [inputs, setInputs] = useState<JSX.Element[]>([])
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0)
  const [showInputs, setShowInputs] = useState(false)
  const [results, setResults] = useState<{ [key: string]: string[] }>({})
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [apiAnswer, setApiAnswer] = useState<string>('')

  useEffect(() => {
    const fetchAPIAnswer = async () => {
      try {
        const response = await axios.get('https://yesno.wtf/api/')
        const answer = response.data.answer.toLowerCase()
        setApiAnswer(answer)
      } catch (error) {
        console.error(error)
      }
    }
    fetchAPIAnswer()
  }, [])

  useEffect(() => {
    const inputCount = parseInt(localStorage.getItem('inputCount') || '0')
    const savedResults = JSON.parse(localStorage.getItem('results') || '{}')
    const newResults: { [key: string]: string[] } = {}
    for (let i = 0; i < storedData.length; i++) {
      const player = storedData[i]
      const playerResults = savedResults[player] || new Array(inputCount).fill('Not selected')
      newResults[player] = playerResults.slice(0, inputCount)
    }
    setResults(newResults)

    const newInputs = []
    for (let i = 0; i < inputCount; i++) {
      const roundInputs = []
      for (let j = 0; j < storedData.length; j++) {
        const player = storedData[j]
        roundInputs.push(<div key={`${player}-${i}`}></div>)
      }
      newInputs.push(
        <div key={i}>
          <h5>Round {i + 1}</h5>
          {roundInputs}
        </div>
      )
    }
    setInputs(newInputs)
  }, [])

  const handleAnswer = async (answer: string, player: string, round: number) => {
    const newResults = { ...results }
    let win = false

    if (answer.toLowerCase() === apiAnswer) {
      win = true
    }

    newResults[player][round] = win ? `${answer} (Win!)` : answer
    setResults(newResults)
    try {
      const response = await axios.get('https://yesno.wtf/api/')
      const apiAnswer = response.data.answer.toLowerCase()
      if (answer.toLowerCase() === apiAnswer) {
        const newResults = { ...results }
        newResults[player][round] = `${answer} (Win!)`
        setResults(newResults)
        localStorage.setItem('winner', player)
      }
    } catch (error) {
      console.error(error)
    }
    if (currentPlayerIndex === storedData.length - 1) {
      if (currentRoundIndex === inputs.length - 1) {
      } else {
        setCurrentRoundIndex(currentRoundIndex + 1)
        setCurrentPlayerIndex(0)
      }
    } else {
      setCurrentPlayerIndex(currentPlayerIndex + 1)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const currentResult = results[storedData[currentPlayerIndex]][currentRoundIndex]
    if (currentResult === 'Not selected') {
      return
    } else {
      if (currentPlayerIndex === storedData.length - 1) {
        if (currentRoundIndex === inputs.length - 1) {
        } else {
          setCurrentRoundIndex(currentRoundIndex + 1)
          setCurrentPlayerIndex(0)
        }
      } else {
        setCurrentPlayerIndex(currentPlayerIndex + 1)
      }
    }
  }

  localStorage.setItem('results', JSON.stringify(results))

  const handleStart = () => {
    setShowInputs(true)
  }

  return (
    <div className='container'>
      <div className='title'>
        <h3>Yes No WTF GAME</h3>
        <h3>Good Luck</h3>
      </div>
      <div className='name'>
        <h3>Players: {storedData.join(', ')}</h3>
      </div>
      {showInputs && (
        <div className='round'>
          <h4>Player: {storedData[currentPlayerIndex]}</h4>
          <form onSubmit={handleSubmit}>
            {inputs.map((input, index) => (
              <div key={index}>
                {input}
                <div>
                  <button
                    style={{ color: '#2DA840' }}
                    onClick={() => handleAnswer('Yes', storedData[currentPlayerIndex], index)}
                  >
                    Yes
                  </button>
                  <button
                    style={{ color: '#FF0000' }}
                    onClick={() => handleAnswer('No', storedData[currentPlayerIndex], index)}
                  >
                    No
                  </button>
                </div>
              </div>
            ))}
          </form>
          <Link to='/answer'>
            <button style={{ background: '#FF479A', color: '#FFF4F9' }} type='submit'>
              Submit
            </button>
          </Link>
        </div>
      )}

      {!showInputs && (
        <div>
          <button onClick={handleStart}>Start</button>
        </div>
      )}
      {Object.keys(results)
        .sort()
        .reverse()
        .map((player) => (
          <div key={player}>
            <h4>Player: {player}</h4>
            <div>
              {results[player].map((result, index) => (
                <div key={index}>
                  Round {index + 1}: {result}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}

export default SelectQuestion
