import { api } from "../axios-config";

export type TNotaFiscalBD = {
  id: number;
  data: string;
  cnpj: string;
  numero: string;
  valor: string;
  descricao: string;
  created_at: string
}

type TCreateNota = {
  data: string;
  cnpj: string;
  numero: string;
  valor: string;
  descricao: string;
  src: string
}

type TUpdateNota = {
  id: number;
  data: string;
  cnpj: string;
  numero: string;
  valor: string;
  descricao: string;
  src: string
}

const getNotas = async (): Promise<TNotaFiscalBD[] | undefined> => {
  try {
    const { data } = await api.get("/nfe");

    if (data) {

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getNotaById = async (id: number): Promise<TNotaFiscalBD | undefined> => {
  try {
    const { data } = await api.get(`/nfe/${id}`);

    if (data) {

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const createNotaById = async (nota: TCreateNota): Promise<TCreateNota | undefined> => {
  try {
    const { data } = await api.post("/nfe", nota);

    if (data) {
      alert("Nota Fiscal incluída com sucesso");
      window.location.reload();
      return data;
    }
  } catch (error) {
    console.log(error);
    alert("Erro ao incluir Nota Fiscal. Faça novamente");
  }
}

const updateNota = async (nota: TUpdateNota): Promise<TUpdateNota | undefined> => {
  try {
    const { data } = await api.put(`/nfe/${nota.id}`, nota);

    if (data) {
      alert("Descricao adicionada com sucesso!");
      window.location.reload();
      return data;
    }
  } catch (error) {
    console.log(error);
    alert("Erro ao incluir descricao de nota fiscal. Faça novamente");
  }
}

export { getNotas, getNotaById, createNotaById, updateNota };