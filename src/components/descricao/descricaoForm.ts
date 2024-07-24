import { useForm } from "react-hook-form"

type TFEditForm = {
    numero: string
    data: string
    cnpj: string
    valor: string
    descricao: string
}

const FDescricaoForm = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<TFEditForm>({
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

export default FDescricaoForm