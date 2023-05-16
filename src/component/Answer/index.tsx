import { useEffect, useState } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

const Answer = () => {
  const [results, setResults] = useState<{ [key: string]: string[] }>({})
  const [winners, setWinners] = useState<{ [key: string]: string[] }>({})
  const storedData = JSON.parse(localStorage.getItem('allData') || '[]')

  const [finalWinner, setFinalWinner] = useState<string>('')
  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem('results') || '{}')
    setResults(savedResults)
  }, [])

  useEffect(() => {
    const roundWinners: { [key: string]: string[] } = {}
    let finalWinnerName = ''
    Object.entries(results).forEach(([player, result]) => {
      result.forEach((r, i) => {
        if (r.includes('(Win!)')) {
          const winnerName = player
          if (!roundWinners[`Round ${i + 1}`]) {
            roundWinners[`Round ${i + 1}`] = []
          }
          roundWinners[`Round ${i + 1}`].push(winnerName)
        }
      })
    })
    setWinners(roundWinners)

    const playerCounts: { [key: string]: number } = {}
    Object.entries(roundWinners).forEach(([round, winners]) => {
      winners.forEach((winner) => {
        if (!playerCounts[winner]) {
          playerCounts[winner] = 1
        } else {
          playerCounts[winner]++
        }
      })
    })
    let maxCount = 0
    Object.entries(playerCounts).forEach(([player, count]) => {
      if (count > maxCount) {
        finalWinnerName = player
        maxCount = count
      }
    })
    setFinalWinner(finalWinnerName)
  }, [results])
  return (
    <div className='container'>
      <div className='title'>
        <h3>Yes No WTF GAME</h3>
        <h3>Good Luck</h3>
      </div>
      <div className='name'>
        <h3>Players: {storedData.join(', ')}</h3>
      </div>

      <div className='winner'>
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
        {Object.keys(winners)
          .sort()
          .map((round) => (
            <div key={round}>
              <h4>{round}</h4>
              {winners[round] && winners[round].length === 0 ? (
                <p>none</p>
              ) : (
                <div className='player'>
                  <h4>Winner: </h4>

                  <p>{winners[round].sort().join(', ')}</p>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className='button'>
        <Link to='/summary'>
          <button>Summary</button>
        </Link>
      </div>
    </div>
  )
}

export default Answer
