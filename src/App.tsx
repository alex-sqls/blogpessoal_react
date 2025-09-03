import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import './App.css'
import Cadastro from './pages/cadastro/Cadastro'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Teste from './pages/teste/teste'
import { AuthProvider } from './contexts/AuthContext'
import ListaTemas from './components/tema/listatemas/ListaTemas'
import FormTema from './components/tema/formtema/FormTema'
import DeletarTema from './components/tema/deletartema/deletarTema'


function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              {/* representa o componente principal apenas / */}
              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />

              <Route path="/home" element={<Home />} />
              <Route path="/teste" element={<Teste />} />
              <Route path='/temas' element={<ListaTemas />} />
              <Route path="/cadastrartema" element={<FormTema />} />
              <Route path="/editartema/:id" element={<FormTema />} />
              <Route path="/deletartema/:id" element={<DeletarTema />} />

            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App