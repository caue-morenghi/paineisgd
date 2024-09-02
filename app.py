from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS
import os
from pathlib import Path

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Permitir todas as origens

@app.route('/run-script', methods=['POST'])
def run_script():
    data = request.json
    cnpj = data.get('cnpj')
    ip = data.get('ip')
    porta = str(data.get('porta'))  # Converter para string
    usuario = data.get('usuario')
    senha = data.get('senha')
    nome_banco = data.get('nome')

    result = subprocess.run(
        ['python', 'banco2.py', '--cnpj', cnpj, '--ip', ip, '--porta', porta, '--usuario', usuario, '--senha', senha, '--nome_banco', nome_banco],
        capture_output=True,
        text=True
    )
    return jsonify({'output': result.stdout})

@app.route('/get-bancos', methods=['GET'])
def get_bancos():
    caminho_arquivo = r'C:\Users\Quaestum\Desktop\banco_dados.txt'
    bancos = ler_bancos_txt(caminho_arquivo)
    return jsonify(bancos)

def ler_bancos_txt(caminho_arquivo):
    bancos = []
    file_path = Path(caminho_arquivo)
    
    if not os.path.exists(file_path):
        #raise FileNotFoundError(f"O arquivo {caminho_arquivo} não foi encontrado.")
        print(f"O arquivo {caminho_arquivo} não foi encontrado.")
    
    with open(file_path, 'r') as file:
        linhas = file.readlines()
        for linha in linhas:
            dados = linha.strip().split(';')
            if len(dados) == 8:  # Verificar se todos os campos estão presentes
                banco = {
                    "id": dados[0],
                    "cnpj": dados[1],
                    "ip": dados[2],
                    "porta": dados[3],
                    "usuario": dados[4],
                    "senha": dados[5],
                    "nome": dados[6],
                    "situacao": dados[7]
                }
                bancos.append(banco)
            else:
                print(f"Linha inválida: {linha.strip()}")  # Log de linha inválida
    
    return bancos

if __name__ == '__main__':
    app.run(debug=True)