import { z } from "zod";

export const registroBanco = z.object({
    cnpj: z.string(),
    ip: z.string().regex(/^[0-9.]+$/, 'IP deve conter apenas números e pontos').min(1, 'Esse campo deve ser preenchido').max(30, 'IP deve ter no máximo 30 caracteres'),
    porta: z.string().min(3, 'Porta deve conter no mínimo 3 dígitos').max(4, 'Porta deve conter no máximo 4 dígitos').min(1, 'Esse campo deve ser preenchido'),
    usuario: z.string().regex(/^\S+$/, 'O usuário não pode conter espaços em branco').regex(/^[a-zA-Z0-9_.]+$/, 'O usuário não pode ter caracteres especiais').min(1, 'Esse campo deve ser preenchido').max(225, 'Usuário campo deve ter no máximo 225 caracteres'),
    senha: z.string().regex(/^\S+$/, 'A senha não pode conter espaços em branco').min(1, 'Esse campo deve ser preenchido').max(225, 'A senha deve ter no máximo 225 caracteres'),
    nome: z.string().regex(/^\S+$/, 'O nome não pode conter espaços em branco').min(1, 'Esse campo deve ser preenchido').regex(/^[a-zA-Z0-9.]+$/, 'O nome não pode ter caracteres especiais').max(225, 'O nome deve ter no máximo 225 caracteres'),
    situacao: z.string(),
});

export const editBancoSchema = z.object({
    id: z.string(),
    cnpj: z.string(),
    ip: z.string().regex(/^[0-9.]+$/, 'IP deve conter apenas números e pontos').min(1, 'Esse campo deve ser preenchido').max(30, 'IP deve ter no máximo 30 caracteres'),
    porta: z.string().min(3, 'Porta deve conter no mínimo 3 dígitos').max(4, 'Porta deve conter no máximo 4 dígitos').min(1, 'Esse campo deve ser preenchido'),
    usuario: z.string().regex(/^\S+$/, 'O usuário não pode conter espaços em branco').regex(/^[a-zA-Z0-9_.]+$/, 'O usuário não pode ter caracteres especiais').min(1, 'Esse campo deve ser preenchido').max(225, 'Usuário campo deve ter no máximo 225 caracteres'),
    senha: z.string().regex(/^\S+$/, 'A senha não pode conter espaços em branco').min(1, 'Esse campo deve ser preenchido').max(225, 'A senha deve ter no máximo 225 caracteres'),
    nome: z.string().regex(/^\S+$/, 'O nome não pode conter espaços em branco').min(1, 'Esse campo deve ser preenchido').regex(/^[a-zA-Z0-9.]+$/, 'O nome não pode ter caracteres especiais').max(225, 'O nome deve ter no máximo 225 caracteres'),
    situacao: z.string(),
})