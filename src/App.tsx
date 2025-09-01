import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import './App.css'
import Cadastro from './pages/cadastro/Cadastro'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Teste from './pages/teste/teste'


function App() {
  return (
    <>
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              {/* representa o componente principal apenas / */}
              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />

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