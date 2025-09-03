import { Link } from "react-router-dom";
import type Tema from "../../../models/Tema";

//O que componente cardTema espera receber
interface CardTemaProps{
    tema: Tema
}

function CardTema( {tema} : CardTemaProps) {
    return (
        <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
            <header className="py-2 px-6 bg-indigo-800 text-white font-bold text-2xl">Tema</header>
            <p className="p-8 text-3xl bg-slate-200 h-full">{tema.descricao}</p>

            <div className="flex">
                <Link to={`/editartema/${tema.id}`}  className='w-full text-slate-100 bg-indigo-400 hover:bg-amber-800 flex flex-items-center justify-center py-2'>
                <button>Editar</button>
                </Link>

                <Link to={`/deletartema/${tema.id}`}  className="text-slate-100 bg-red-400 hover:bg-red-700 w-full flex items-center justify-center">Deletar</Link>
            </div>
        </div>
    )
}

export default CardTema