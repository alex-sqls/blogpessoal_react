import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import type Tema from "../../../models/Tema"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import type Postagem from "../../../models/Postagem"
import { ClipLoader } from "react-spinners"

function FormPostagem() {

    const navigate = useNavigate()

    const [temas, setTemas] = useState<Tema[]>([])

    const [tema, setTema] = useState<Tema>({id: 0, descricao: '', })

    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {usuario, handleLogout} = useContext(AuthContext)
    const token = usuario.token

    const {id} = useParams<{id: string}>();

    async function  buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token}
            })
        } catch (error: any) {
            if (error.toString.includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token}
            })
        } catch (error: any) {
            if (error.toString.includes('401')) {
                handleLogout()
            }
        }
    }

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token}
            })
        } catch (error: any) {
            if (error.toString.includes('401')) {
                handleLogout()
            }
        }
    }

    //validacao de token
    useEffect(() => {
        if (token === '') {
            alert('voce precisa estar logado!')
            navigate('/')
        }
    }, [token])

    // useEffect(() => {
    //     if (id !== undefined) {
    //         buscaPorId(id)
    //     }
    // }, [id])

    //carregamento de temas no select e busca postagem por id
    useEffect(() => {
        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])

    //sincronizacao do tema com a postagem
    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        })
    }

    function retornar() {
        navigate("/postagens")
    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token}
                })
                alert('postagem foi atualizado com sucesso!')
            } catch (error: any) {
                if(error.toString().includes('401')) {
                    handleLogout()
                } else {
                    alert('erro ao atualizar postagem')
                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: { Authorization: token}
                })
                alert('postagem foi cadastrado com sucesso!')
            } catch (error: any) {
                if(error.toString().includes('401')) {
                    handleLogout();
                } else {
                    alert('erro ao cadastrar postagem')
                }
            }
        }
        //true: o loader fica visivel na tela
        setIsLoading(false)
        retornar()
    }
    const carregandoTema = tema.descricao === ''

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'editar postagem' : 'cadastrar postagem'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4"
            onSubmit={gerarNovaPostagem}>
            <div className="flex flex-col gap-2">
                <label htmlFor="titulo">Titulo da postagem</label>
                <input 
                type="text" 
                placeholder="Titulo"
                name="titulo"
                required
                className="border=2 border-slate-700 rounded p-2"
                value={postagem.titulo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                />
            </div>
            <div className="flex flex-col gap-2">
                 <label htmlFor="titulo">Texto da postagem</label>
                <input 
                type="text" 
                placeholder="texto"
                name="texto"
                required
                className="border=2 border-slate-700 rounded p-2"
                value={postagem.texto}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                />
                <div className="flex flex-col gap-2">
                    <p>Tema da postagem</p>
                    <select name="tema" id="tema" className="border p-2 border-slate-800 rounded"
                    onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione um tema</option>

                        {temas.map((tema) => (
                            <>
                            <option value={tema.id}>{tema.descricao}</option>
                            </>
                        ))}
                    </select>
                </div>
                <button
                type="submit"
                className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
                disabled={carregandoTema}
                >
                    {isLoading ? 
                    <ClipLoader
                    color="#ffffff"
                    size={24} />:
                    <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>    
                }
                </button>
            </div>

            </form>
        </div>
    )
}
export default FormPostagem;