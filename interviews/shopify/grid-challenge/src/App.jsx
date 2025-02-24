import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Grid } from './components/Grid';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Grid />
  );
}

export default App
