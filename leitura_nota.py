import PIL.Image
import os
import google.generativeai as genai
import re
from google.generativeai.types import HarmCategory, HarmBlockThreshold
import tkinter.filedialog as filedialog
import tkinter as tk
from datetime import datetime

def ler_nota():
    genai.configure(api_key='AIzaSyAkFP2mPWjmMsCNoTTzMIKTWKN-sa7KHpQ')

    # Create the model
    # See https://ai.google.dev/api/python/google/generativeai/GenerativeModel
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
        model_name="gemini-1.5-pro",
        generation_config=generation_config,
        safety_settings={
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE
        }
        # See https://ai.google.dev/gemini-api/docs/safety-settings
    )

    chat_session = model.start_chat(
        history=[
        ]
    )

    root = tk.Tk()
    root.withdraw()

    caminho_imagem = filedialog.askopenfilename(
        initialdir="/",
        title="Selecione uma imagem",
        filetypes=(("Arquivos de imagem", "*.jpg *.jpeg *.png *.gif"),
                   ("todos os arquivos", "*.*"))
    )
    #caminho_imagem = r"C:\Users\quaestum\Downloads\IMG_7135.jpg"
    img = PIL.Image.open(caminho_imagem)

    response = model.generate_content(
        ["Qual o valor total da nota", img], stream=True)
    response.resolve()
    preco = re.findall('\d*\.?\d+\,\d{2}', response.text)

    response = model.generate_content(
        ["Qual e o CNPJ da empresa da nota fiscal", img], stream=True)
    response.resolve()
    cnpj = re.findall('\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}', response.text)

    response = model.generate_content(
        ["Extrair data da nota", img], stream=True)
    response.resolve()
    data_str = re.findall('\d{2}/\d{2}/\d{2,4}', response.text)
    data_obj = datetime.strptime(data_str[0], '%d/%m/%Y')
    data = data_obj.strftime('%Y-%m-%d')
    
    src = caminho_imagem

    descricao = ''

    # print(f'Valor da nota:{valor[0]}\nCNPJ EMpresa:{cnpj[0]}\nData:{data[0]}')
    nf = Nones
    res = {
        "numero": nf if nf else "Não encontrado",
        "data": data if data else "Não encontrado",
        "valor": preco[0] if preco else "Não encontrado",
        "cnpj": cnpj[0] if cnpj else "Não encontrado",
        "src": src if src else "Não encontrado",
        "descricao": descricao if descricao else ""
    }

    return res


def main():
    resultado = ler_nota()
    print(resultado)


if __name__ == "__main__":
    main()
