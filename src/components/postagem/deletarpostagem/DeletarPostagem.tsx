import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type Postagem from "../../../models/Postagem"
import { AuthContext } from "../../../contexts/AuthContext"
import { buscar, deletar } from "../../../services/Service"
import { ClipLoader } from "react-spinners"
import { ToastAlert } from "../../../utils/ToastAlerta"

function DeletarPostagem() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    //retorna um objeto com os parâmetros da rota atual
    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlert('Postagem apagada com sucesso', 'sucesso')

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }else {
                ToastAlert('Erro ao deletar a postagem.', 'erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }
    return (
        <div className="container w-1/3 mx-auto">
            <h1 className="text-4x1 text-center my-4">Deletar Postagem</h1>
            <p className="text-center font-semibold mb-4">Voce tem certeza que deseja apagar a mensagem a seguir?</p>

            <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
                <header
                className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
                    Postagem 
                </header>
                <div className="p-4">
                    <p className="text-xl h-full">{postagem.titulo}</p>
                    <p>{postagem.texto}</p>
                </div>
                <div className="flex">
                    <button
                    className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
                    onClick={retornar}>
                        Nao
                    </button>
                    <button
                    className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center"
                    onClick={deletarPostagem}>
                        
                        { isLoading ? 
                            <ClipLoader 
                                color="#ffffff" 
                                size={24}
                            /> : 
                            <span>Sim</span>
                        }

                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarPostagem