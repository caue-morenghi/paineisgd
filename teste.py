# Instale as bibliotecas necessárias
# pip install opencv-python pyzbar

import cv2
from pyzbar.pyzbar import decode
import tkinter as tk
import tkinter.filedialog as filedialog

def read_qr_code(image_path):
    # Carrega a imagem
    img = cv2.imread(image_path)
    
    # Decodifica o QR code
    decoded_objects = decode(img)
    print(decoded_objects[0].data.decode())
    # Itera sobre os objetos decodificados e exibe o conteúdo
    for obj in decoded_objects:
        print("Tipo:", obj.type)
        print("Dados:", obj.data.decode("utf-8"))
        print(obj.data.decode("utf-8")[0])

# Caminho para a imagem do QR code
root = tk.Tk()
root.withdraw()

img = filedialog.askopenfilename(
    initialdir="/",
    title="Selecione uma imagem",
    filetypes=(("Arquivos de imagem", "*.jpg *.jpeg *.png *.gif"),
               ("todos os arquivos", "*.*"))
)

# Chama a função para ler o QR code
read_qr_code(img)