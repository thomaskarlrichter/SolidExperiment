import './App.css'
import { Box } from "./components/Box"

export default function App() {
  return (
    <div className="App">
      <Box value="O" onClick={null} />
      <Box value="X" onClick={null} />
    </div>
  )
}
