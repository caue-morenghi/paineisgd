import { AxiosError } from "axios"

export const errorInterceptor = (error: AxiosError) => {

    if (error.message === 'Network Error') {
        return Promise.reject(new Error('Erro de conexão'))
    }

    if (error.response?.status === 401) {
        return 'Erro: você não está mais autenticado. Logue novamente'
    }

    return Promise.reject(error)

}