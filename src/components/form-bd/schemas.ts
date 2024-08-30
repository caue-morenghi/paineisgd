import { z } from "zod";

export const registroBanco = z.object({
    cnpj: z.string(),
    ip: z.string().regex(/^[0-9.]+$/, 'IP deve conter apenas números e pontos'),
    porta: z.string().length(4, 'Porta deve conter 4 dígitos'),
    usuario: z.string().regex(/^[a-zA-Z0-9.]+$/, 'Usuário deve conter apenas letras, números ou ponto'),
    senha: z.string().regex(/^[a-zA-Z0-9.]+$/, 'Senha deve conter apenas letras, números ou ponto'),
    nome: z.string().regex(/^[a-zA-Z0-9.]+$/, 'Nome deve conter apenas letras, números ou ponto'),
    situacao: z.string(),
});