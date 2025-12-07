import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-10 text-4xl font-bold text-purple-600 bg-gray-100">
      Tailwind + DaisyUI working! 🌸
      <button className="btn btn-primary ml-4">DaisyUI Button</button>
    </div>
  );
}

export default App
