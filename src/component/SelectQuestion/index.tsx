import { useState, useEffect } from 'react'

const SelectQuestion = () => {
  const storedData = JSON.parse(localStorage.getItem('allData') || '')
  const [inputs, setInputs] = useState<JSX.Element[]>([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [showInputs, setShowInputs] = useState(false)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const countFromStorage = localStorage.getItem('inputCount')
    if (countFromStorage) {
      const count = parseInt(countFromStorage)
      const newInputs = []
      for (let i = 0; i < count; i++) {
        newInputs.push(
          <div key={i}>
            <h5>Round {i + 1}</h5>
            <button>Yes</button>
            <button>No</button>
          </div>
        )
      }
      setInputs(newInputs)
    }
  }, [])

  const handleYesNoClick = () => {
    const nextPlayerIndex = currentPlayerIndex + 1
    if (nextPlayerIndex >= storedData.length) {
      setShowInputs(false)
      setShowResult(true)
    } else {
      setCurrentPlayerIndex(nextPlayerIndex)
    }
  }

  return (
    <div>
      <div>
        <h3>Yes No WTF GAME</h3>
        <h3>Good Luck</h3>
      </div>

      <div>
        <h3>Player: {storedData[currentPlayerIndex]}</h3>
      </div>

      {showInputs && (
        <div>
          {inputs}
          <div>
            <button onClick={handleYesNoClick}>Yes</button>
            <button onClick={handleYesNoClick}>No</button>
          </div>
        </div>
      )}

      {!showInputs && !showResult && (
        <div>
          <button onClick={() => setShowInputs(true)}>Start Game</button>
        </div>
      )}
    </div>
  )
}

export default SelectQuestion
