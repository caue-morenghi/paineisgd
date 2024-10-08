export const inserirMascaraCnpj = (cnpj: string) => {
    return cnpj
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };
  
  export const inserirMascaraCpf = (cpf: string) => {
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };
  
  export const filtrarIp = (ip: string) => {
    return ip.replace(/[^0-9.]/g, "");
  };
  
  export const limitarCampo = (campo: string, limite: number) => {
    return campo.slice(0, limite);
  };
  
  export const filtrarPorta = (porta: string) => {
    return porta.replace(/\D/g, "");
  };
  
  export const removerLetras = (value: string) => {
    return value.replace(/[^0-9]/g, "");
  };
  