import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Lobby from './components/Lobby.tsx'
import Chat from './components/Chat.tsx'
import Dashboard from './components/Dashboard.tsx'
import Test from './components/test.tsx'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/lobby" element={<Lobby/>} />
        <Route path="/chat/*" element={<Chat/>} />
        {/* <Route path="/test" element={<Test/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
