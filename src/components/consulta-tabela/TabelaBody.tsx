import { TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import { TNotaFiscalBD } from "../../api/usuarios/UsuariosService";
import { NotaTabela } from "./NotaTabela";
import { getBancos, TBanco } from "../../api/usuarios/BancosService";

export const TabelaBody = () => {

    const [bancos, setbancos] = useState<TBanco[] | undefined>([]);
    const [vazio, setvazio] = useState<true | false>(false);

    useEffect(() => {
        const bancos = getBancos()
        bancos.then((response) => {
            console.log(response)
            if (response?.length === 0) {
                setvazio(true)
            }
            setbancos(response)
        })
    }, []);

  return (
    <TableBody>
        {bancos?.map(banco => 
            <NotaTabela 
                banco={banco}
                key={banco.id}
            />
        )}
    </TableBody>
  );
};
