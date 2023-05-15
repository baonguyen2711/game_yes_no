import TextHome from '../TextHome'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  players: any
  setPlayers: React.Dispatch<any>
}

const NewPlayer: React.FC<Props> = (props) => {
  const { players, setPlayers } = props

  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleAdd = () => {
    if (name.length !== 0) {
      setPlayers((newData: any) => [...newData, name])
      setName('')
      window.localStorage.setItem('allData', JSON.stringify([...players, name]))
      navigate('/name-player')
    }
  }

  return (
    <div>
      <div>
        <TextHome />
        <div>
          <h3>Please enter a new name</h3>
          <h5>New Game</h5>
          <input type='text' onChange={(e) => setName(e.target.value)} />
          <button onClick={handleAdd}>OK</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default NewPlayer
