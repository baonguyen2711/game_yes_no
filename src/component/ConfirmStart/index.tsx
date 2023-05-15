import TextHome from '../TextHome'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const ConfirmStart = () => {
  const [storedData, setStoredData] = useState(JSON.parse(localStorage.getItem('allData') || ''))
  const [inputCount, setInputCount] = useState(0)
  const [showInputs, setShowInputs] = useState(false)
  const handleInputChange = (event: any) => {
    const count = parseInt(event.target.value)
    setShowInputs(false)
    setInputCount(count)
    localStorage.setItem('inputCount', count.toString())
  }

  const renderInputs = () => {
    const inputs = []
    for (let i = 0; i < inputCount; i++) {
      inputs.push(
        <div key={i}>
          <h5>Round {i + 1}</h5>
          <button>Yes</button>
          <button>No</button>
        </div>
      )
    }
    return inputs
  }
  const handleDelete = (index: number) => {
    const newData = [...storedData]
    const deletedData = newData.splice(index, 1)[0]
    localStorage.setItem('allData', JSON.stringify(newData))
    localStorage.removeItem(deletedData)
    setStoredData(newData.filter((item) => item !== deletedData))
  }
  return (
    <div>
      <div>
        <TextHome />
        <div>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Player Name</th>
              </tr>
            </thead>
            <tbody>
              {storedData.map((playerName: any, index: number) => (
                <tr key={index}>
                  <td>
                    {index + 1}
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                  <td>{playerName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <Link to='/new-player'>
            <button>Add more player</button>
          </Link>
        </div>
        <div>
          <h5>Total</h5>
          <input type='text' onChange={handleInputChange} />
          <Link to='/select-question'>
            <button onClick={() => setShowInputs(true)}>Start</button>
          </Link>
        </div>
        {showInputs && <div>{renderInputs()}</div>}
      </div>
    </div>
  )
}

export default ConfirmStart
