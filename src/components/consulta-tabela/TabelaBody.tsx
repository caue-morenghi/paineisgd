import { TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { NotaTabela } from "./NotaTabela";
import { TBancoConsulta } from "../../api/usuarios/BancosService";

interface TabelaBodyProps {
    termoBusca: { [key: string]: string };
}

export const TabelaBody = ({ termoBusca }: TabelaBodyProps) => {
    const [bancos, setBancos] = useState<TBancoConsulta[]>([]);
    const [vazio, setVazio] = useState<boolean>(false);
    const [bancosFiltrados, setBancosFiltrados] = useState<TBancoConsulta[]>([]);

    useEffect(() => {
        const fetchBancos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-bancos');
                const bancos = response.data;
                if (bancos.length === 0) {
                    setVazio(true);
                }
                setBancos(bancos);
                setBancosFiltrados(bancos); // Inicializa com todos os bancos
            } catch (error) {
                console.error("Erro ao buscar bancos de dados:", error);
                setVazio(true);
            }
        };

        fetchBancos();
    }, []);

    useEffect(() => {
        let resultadoBusca = bancos;
        Object.keys(termoBusca).forEach(campo => {
            if (termoBusca[campo]) {
                resultadoBusca = resultadoBusca.filter(banco =>
                    (banco[campo as keyof TBancoConsulta] as string)?.toLowerCase().includes(termoBusca[campo].toLowerCase())
                );
            }
        });
        setBancosFiltrados(resultadoBusca);
    }, [termoBusca, bancos]);

    return (
        <TableBody>
            {bancosFiltrados.map(banco => (
                <NotaTabela 
                    banco={banco}
                    key={banco.nome}
                />
            ))}
        </TableBody>
    );
};