import tkinter.filedialog as filedialog
import tkinter as tk
import re
from pyzbar import pyzbar
import cv2
import shutil
from pathlib import Path
import os

def ler_qrcode_imagem(caminho_imagem):
    """Reads a QR Code from an image and returns the data."""

    try:
        imagem = cv2.imread(caminho_imagem)
        decoded_objects = pyzbar.decode(imagem)

        if not decoded_objects:
            return None  # No QR Code found

        data = decoded_objects[0].data.decode()

        # More flexible regular expression pattern (optional NF and price)
        match = re.search(r'(.+?)\|(.+?)\|(.+)', data)

        if match:
            nf = match.group(1)  # NF might be None if not found
            data = match.group(2)  # Data might be None if not found
            # Preço might be None if not found
            preco = re.findall('.*\.\d{2}', match.group(3))
            cnpj = nf.replace('352407', '')
            #src = os.path.basename(caminho_imagem)
            src = caminho_imagem
            descricao = ''
            # caminho_imagem
            return nf, data, preco[0], cnpj[:14], src, descricao
        else:
            return data  # Return raw data if no match

    except cv2.error as e:
        print(f"Erro ao ler a imagem: {e}")
        return None


def selecionar_imagem():
    """Opens a dialog to select the image."""
    root = tk.Tk()
    root.withdraw()

    caminho_imagem = filedialog.askopenfilename(
        initialdir="/",
        title="Selecione uma imagem",
        filetypes=(("Arquivos de imagem", "*.jpg *.jpeg *.png *.gif"),
                   ("todos os arquivos", "*.*"))
    )

    if caminho_imagem:
        resultado = ler_qrcode_imagem(caminho_imagem)
        # print(caminho_imagem)
        if resultado:
            if isinstance(resultado, tuple):
                # nf, data, preco, cnpj, caminho_imagem = resultado
                nf, data, preco, cnpj, src, descricao = resultado
                res = {
                    "numero": nf if nf else "Não encontrado",
                    "data": data if data else "Não encontrado",
                    "valor": preco if preco else "Não encontrado",
                    "cnpj": cnpj if cnpj else "Não encontrado",
                    "src": src if src else "Não encontrado",
                    "descricao": descricao if descricao else ""
                }
                #pasta_destino = Path(r'C:\Users\quaestum\Desktop\projetos-quaestum\leituraSAT\leiturasatfrontend\public\images')
                #shutil.copy(caminho_imagem, pasta_destino)
                return res
            else:
                return {"Dados do QR Code": resultado}
        else:
            return {"Erro": "QR Code não encontrado na imagem."}


# if __name__ == "__main__":
#     print(selecionar_imagem())

def main():
    resultado = selecionar_imagem()
    print(resultado)  # Imprime o dicionário retornado


if __name__ == "__main__":
    main()
