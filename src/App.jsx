
import { useState } from 'react'
import StartPage from './components/StartPage'
import QuizPage from "./components/QuizPage"
function App() {

  const [hasGameStarted, sethasGameStarted] = useState(false)

  const startGame = ()=>{
    sethasGameStarted(true)

  }

  return (
    <div >
      {!hasGameStarted?<StartPage startGame={startGame}/>:
      <QuizPage  />}
    </div>
  )
}

export default App
