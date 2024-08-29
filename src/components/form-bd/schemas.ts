import { z } from "zod";

export const registroBanco = z.object({
    cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ deve estar no formato 99.999.999/9999-99'),
    ip: z.string().regex(/^[0-9.]+$/, 'IP deve conter apenas números e pontos'),
    porta: z.string().length(4, 'Porta deve conter 4 dígitos'),
    usuario: z.string().regex(/^\S+$/, 'Usuário não deve conter espaços em branco'),
    senha: z.string().regex(/^\S+$/, 'Senha não deve conter espaços em branco'),
    nome: z.string().regex(/^\S+$/, 'Nome não deve conter espaços em branco'),
    situacao: z.string(),
});