import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-screen w-screen bg-blue-200'>
        <h1 className='text-4xl'>
          chatty
        </h1>
      </div>
    </>
  )
}

export default App
