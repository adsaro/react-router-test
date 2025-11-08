import {BrowserRouter as Router} from 'react-router-dom'
import RankingTable from './RankingTable'
import './App.css'

function App() {
  return (
    <>
      <Router>
        <RankingTable/>
      </Router>
    </>
  )
}

export default App
