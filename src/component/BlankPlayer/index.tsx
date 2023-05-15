import TextHome from '../TextHome'
import { Link } from 'react-router-dom'

const BlankPlayer = () => {
  return (
    <div>
      <div>
        <TextHome />
        <div>
          <Link to='/new-player'>
            <button>Add Player</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlankPlayer
