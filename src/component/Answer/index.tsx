import { useEffect, useState } from 'react'

const Answer = () => {
  const [results, setResults] = useState<{ [key: string]: string[] }>({})
  const [winners, setWinners] = useState<{ [key: string]: string[] }>({})
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
          const winnerName = player // Lưu tên người chơi là người chiến thắng
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
    <div>
      <h3>Results:</h3>
      {Object.keys(results)
        .sort()
        .map((player) => (
          <div key={player}>
            <h4>{player}</h4>
            <ul>
              {results[player].map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        ))}
      <h3>Winners:</h3>
      {Object.keys(winners)
        .sort()

        .map((round) => (
          <div key={round}>
            <h4>{round}</h4>
            <ul>
              {winners[round].sort().map((winner, index) => (
                <li key={index}>{winner}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  )
}

export default Answer
