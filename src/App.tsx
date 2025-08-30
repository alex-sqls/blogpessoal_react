import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import './App.css'
import Home from './assets/pages/home/Home'
import Teste from './assets/pages/teste/teste'

function App() {
  return (
    <>
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              {/* reppresenta o componente principal apenas / */}
              <Route path="/" element={<Home />} />

              <Route path="/home" element={<Home />} />
              <Route path="/teste" element={<Teste />} />

            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  )
}

export default App