import { api } from "../axios-config";

export type TBanco = {
  id: number;
  cnpj: string;
  ip: string;
  porta: string;
  usuario: string;
  senha: string;
  nome: string;
  situacao: string;
  created_at: string;
  updated_at: string;
};

type TCreateBanco = {
  cnpj: number;
  ip: number;
  porta: number;
  usuario: string;
  senha: string;
  nome: string;
  situacao: number;
};

type TUpdateBanco = {
  id: number;
  cnpj: number;
  ip: number;
  porta: number;
  usuario: string;
  senha: string;
  nome: string;
  situacao: number;
};

const getBancos = async (): Promise<TBanco[] | undefined> => {
  try {
    const { data } = await api.get("/bancos");

    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getbancoById = async (id: number): Promise<TBanco | undefined> => {
  try {
    const { data } = await api.get(`/bancos/${id}`);

    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

const createBanco = async (
  banco: TCreateBanco
): Promise<TCreateBanco | undefined> => {
  try {
    const { data } = await api.post("/bancos", banco);

    if (data) {
      alert("banco incluído com sucesso");
      window.location.reload();
      return data;
    }
  } catch (error) {
    console.log(error);
    alert("Erro ao incluir banco. Faça novamente");
  }
};

const updatebanco = async (
  banco: TUpdateBanco
): Promise<TUpdateBanco | undefined> => {
  try {
    const { data } = await api.put(`/bancos/${banco.id}`, banco);

    if (data) {
      alert("Banco alterado com sucesso!");
      window.location.reload();
      return data;
    }
  } catch (error) {
    console.log(error);
    alert("Erro ao alterar banco. Faça novamente");
  }
};

export { getBancos, getbancoById, createBanco, updatebanco };
