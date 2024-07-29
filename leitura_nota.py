# import PIL.Image
# import os
# import google.generativeai as genai
# import re
# from google.generativeai.types import HarmCategory, HarmBlockThreshold
# import tkinter.filedialog as filedialog
# import tkinter as tk
# from datetime import datetime

# def ler_nota():
#     genai.configure(api_key='AIzaSyAkFP2mPWjmMsCNoTTzMIKTWKN-sa7KHpQ')

#     # Create the model
#     # See https://ai.google.dev/api/python/google/generativeai/GenerativeModel
#     generation_config = {
#         "temperature": 1,
#         "top_p": 0.95,
#         "top_k": 64,
#         "max_output_tokens": 8192,
#         "response_mime_type": "text/plain",
#     }

#     model = genai.GenerativeModel(
#         model_name="gemini-1.5-pro",
#         generation_config=generation_config,
#         safety_settings={
#             HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
#             HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
#             HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
#             HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE
#         }
#         # See https://ai.google.dev/gemini-api/docs/safety-settings
#     )

#     chat_session = model.start_chat(
#         history=[
#         ]
#     )

#     root = tk.Tk()
#     root.withdraw()

#     caminho_imagem = filedialog.askopenfilename(
#         initialdir="/",
#         title="Selecione uma imagem",
#         filetypes=(("Arquivos de imagem", "*.jpg *.jpeg *.png *.gif"),
#                    ("todos os arquivos", "*.*"))
#     )
#     #caminho_imagem = r"C:\Users\quaestum\Downloads\IMG_7135.jpg"
#     img = PIL.Image.open(caminho_imagem)

#     response = model.generate_content(
#         ["Qual o valor total da nota", img], stream=True)
#     response.resolve()
#     preco = re.findall('\d*\.?\d+\,\d{2}', response.text)

#     response = model.generate_content(
#         ["Qual e o CNPJ da empresa da nota fiscal", img], stream=True)
#     response.resolve()
#     cnpj = re.findall('\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}', response.text)

#     response = model.generate_content(
#         ["Extrair data da nota", img], stream=True)
#     response.resolve()
#     data_str = re.findall('\d{2}/\d{2}/\d{2,4}', response.text)
#     data_obj = datetime.strptime(data_str[0], '%d/%m/%Y')
#     data = data_obj.strftime('%Y-%m-%d')

#     src = caminho_imagem

#     descricao = ''

#     # print(f'Valor da nota:{valor[0]}\nCNPJ EMpresa:{cnpj[0]}\nData:{data[0]}')
#     nf = None
#     res = {
#         "numero": nf if nf else "Não encontrado",
#         "data": data if data else "Não encontrado",
#         "valor": preco[0] if preco else "Não encontrado",
#         "cnpj": cnpj[0] if cnpj else "Não encontrado",
#         "src": src if src else "Não encontrado",
#         "descricao": descricao if descricao else ""
#     }

#     return res


# def main():
#     resultado = ler_nota()
#     print(resultado)


# if __name__ == "__main__":
#     main()


import PIL.Image
import os
import google.generativeai as genai
import re
from google.generativeai.types import HarmCategory, HarmBlockThreshold
import tkinter.filedialog as filedialog
import tkinter as tk
from datetime import datetime
import shutil
from pathlib import Path
import random
import string
import mysql.connector
from mysql.connector import Error

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
        # model_name="gemini-1.5-pro",
        model_name="gemini-1.5-flash",
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
    # caminho_imagem = r"C:\Users\quaestum\Downloads\IMG_7135.jpg"
    img = PIL.Image.open(caminho_imagem)

    response = model.generate_content(
        ["Qual o valor total da nota", img], stream=True)
    response.resolve()
    preco = re.findall('\d*\.?\d+\,\d{2}', response.text)

    response = model.generate_content(
        ["Qual numero do SAT", img], stream=True)
    response.resolve()
    nf = re.findall('\d+', response.text)

    response = model.generate_content(
        ["Qual e o CNPJ da empresa da nota fiscal", img], stream=True)
    response.resolve()
    cnpj = re.findall('\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}', response.text)

    response = model.generate_content(
        ["Extrair data da nota", img], stream=True)
    response.resolve()
    data_str = re.findall('\d{2}/\d{2}/\d{2,4}', response.text)
    try:
        data_obj = datetime.strptime(data_str[0], '%d/%m/%Y')
    except:
        data_obj = datetime.strptime(data_str[0], '%d/%m/%y')
    data = data_obj.strftime('%Y-%m-%d')

    src = caminho_imagem

    descricao = ''

    # print(f'Valor da nota:{valor[0]}\nCNPJ EMpresa:{cnpj[0]}\nData:{data[0]}')
    #

    # destino = r'C:\Users\Quaestum\Desktop\Cauê\quaestum-caue\projetos-quaestum\leiturasatfrontend\public\images'
    # shutil.copy(src, destino)

    # nome_arq = os.path.basename(src)
    # novo_nome = f"{nf[0]}.jpg" if nf else "nao_encontrado.jpg"

    # caminho1 = os.path.join(destino, nome_arq)
    # caminho2 = os.path.join(destino, novo_nome)

    # os.rename(caminho1, caminho2)

    res = {
        # "idnota": ''.join(random.choices(string.ascii_letters + string.digits, k=10)),
        "numero": nf[0] if nf else "Não encontrado",
        "data": data if data else "Não encontrado",
        "valor": preco[0] if preco else "Não encontrado",
        "cnpj": cnpj[0] if cnpj else "Não encontrado",
        "src": caminho_imagem if caminho_imagem else "Não encontrado",
        "descricao": descricao if descricao else ""
    }

    try:
        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="caue2005",
            database="leituranfes"
        )
        mycursor = mydb.cursor()

        query = "INSERT INTO notas (numero, data, valor, cnpj, src, descricao) VALUES (%s, %s, %s, %s, %s, %s)"
        values = (res["numero"], res["data"], res["valor"],
                  res["cnpj"], res["src"], res["descricao"])

        mycursor.execute(query, values)
        mydb.commit()
        
        query2 = "SELECT * FROM notas where numero = {}".format(res["numero"])

        mycursor.execute(query2)

        myresult = mycursor.fetchall()

        res2 = {
            "id": myresult[0][0],
            "numero": myresult[0][1],
            "data": myresult[0][2].strftime('%d/%m/%Y'),
            "valor": myresult[0][3],
            "cnpj": myresult[0][4],
            "descricao": myresult[0][5],
            "src": myresult[0][6]
        }

        destino = r'C:\Users\Quaestum\Desktop\Cauê\quaestum-caue\projetos-quaestum\leiturasatfrontend\public\images'
        shutil.copy(src, destino)

        nome_arq = os.path.basename(src)
        novo_nome = f"{myresult[0][0]}-{nf[0]}.jpg" if nf else "nao_encontrado.jpg"

        caminho1 = os.path.join(destino, nome_arq)
        caminho2 = os.path.join(destino, novo_nome)

        os.rename(caminho1, caminho2)

        return res2

    except Error as e:
        print(f"Error: {e.errno} - {e.msg}")
        return None


def main():
    resultado = ler_nota()
    print(resultado)


if __name__ == "__main__":
    main()


# gerar um "idnota" aleatorio alem do id da nota ---> alterar o nome da nota na pasta public para idnota-nf[0].pg
    # isso pq ele copia para a pasta public, mesmo sem ter enviado a nota pelo form
    # portanto, se alguem desistisse de enviar e tentasse de novo depois, já existiria um arquivo com o mesmo nome na pasta public e daria erro
