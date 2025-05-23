import { Route, Routes } from 'react-router-dom'
import './App.css'
import Heade from './components/Heade'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Admin from './pages/Admin'
import ReadBlog from './pages/ReadBlog'
import About from './pages/About'

function App() {

  return (
    <>
      <Heade />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path='/login' element={<Auth />} />
            <Route path='/register' element={<Auth />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/read/blogs' element={<ReadBlog />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
