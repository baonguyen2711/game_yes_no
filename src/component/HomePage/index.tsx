import { Link } from 'react-router-dom'
import TextHome from '../TextHome'

const HomePage = () => {
  return (
    <div>
      <div>
        <TextHome />
        <div>
          <Link to='/player'>
            <button>Start Game</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
