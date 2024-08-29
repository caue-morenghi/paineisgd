import { useForm } from "react-hook-form"

export type TEditBD = {
    id: number
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
        criteriaMode: 'all'
    })

    const handleDataSubmit = (data: any) => {
        console.log(data)
    }

    return {
        register, handleSubmit, errors, setValue, handleDataSubmit
    }
}

export default EditFormBD