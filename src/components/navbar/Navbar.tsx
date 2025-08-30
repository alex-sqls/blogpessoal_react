import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full bg-indigo-900 text-white flex justify-center py-4">
      <div className="container flex justify-between text-lg">
        <Link to="/home" className="text-2xl font-bold">
          Blog Pessoal
        </Link>
        <div className="flex gap-4">
           <Link to="/teste">teste</Link>
          <Link to="/postagens">Postagens</Link>
          <Link to="/temas">Temas</Link>
          <Link to="/cadastrarTema">Cadastrar tema</Link>
          <Link to="/perfil">Perfil</Link>
          <Link to="/login">Sair</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
