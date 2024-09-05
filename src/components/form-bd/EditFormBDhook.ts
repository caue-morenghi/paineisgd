import { useForm } from "react-hook-form"
import { editBancoSchema } from "./schemas"
import { zodResolver } from "@hookform/resolvers/zod"

export type TEditBD = {
    id: string
    cnpj: string
    ip: string
    porta: string
    usuario: string
    senha: string
    nome: string
    situacao: string
}

const EditFormBD = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<TEditBD>({
        mode: 'all',
        criteriaMode: 'all',
        resolver: zodResolver(editBancoSchema),
        defaultValues: {
            id: '',
            cnpj: '',
            ip: '',
            porta: '',
            usuario: '',
            senha: '',
            nome: '',
            situacao: ''
        }
    })

    const handleDataSubmit = (data: any) => {
        console.log(data)
    }

    return {
        register, handleSubmit, errors, setValue, handleDataSubmit
    }
}

export default EditFormBD