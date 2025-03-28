
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Component/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <div className="pt-3">
        <Outlet />
      </div>
    </>
  )
}

export default App
