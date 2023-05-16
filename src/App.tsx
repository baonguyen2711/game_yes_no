import './App.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './component/HomePage'
import BlankPlayer from './component/BlankPlayer'
import NewPlayer from './component/NewPlayer'
import ConfirmStart from './component/ConfirmStart'
import SelectQuestion from './component/SelectQuestion'
import Answer from './component/Answer'
import Summary from './component/Summary'

function App() {
  const [players, setPlayers] = useState<any>(localStorage.getItem('name') || [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/player' element={<BlankPlayer />} />
        <Route path='/new-player' element={<NewPlayer players={players} setPlayers={setPlayers} />} />
        <Route path='/name-player' element={<ConfirmStart />} />
        <Route path='/select-question' element={<SelectQuestion />} />
        <Route path='/answer' element={<Answer />} />
        <Route path='/summary' element={<Summary />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
