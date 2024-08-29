import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registroBanco } from "./schemas"

export type TBDForm = {
    cnpj: string
    ip: string
    porta: string
    usuario: string
    senha: string
    nome: string
    situacao: string
}

const FBDForm = () => {

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<TBDForm>({
        mode: 'all',
        criteriaMode: 'all',
        resolver: zodResolver(registroBanco),
        defaultValues: {
            cnpj: '',
            ip: '',
            porta: '',
            usuario: '',
            senha: '',
            nome: '',
            situacao: '1'
        }
    })

    const handleDataSubmit = (data: any) => {
        console.log(data)
    }

    return {
        register, handleSubmit, errors, setValue, handleDataSubmit, watch
    }
}

export default FBDForm