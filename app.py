from flask import Flask, request, jsonify, make_response
import subprocess
from flask_cors import CORS
import os
from pathlib import Path

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/run-script', methods=['POST'])
def run_script():
    data = request.json
    cnpj = data.get('cnpj')
    ip = data.get('ip')
    porta = str(data.get('porta'))
    usuario = data.get('usuario')
    senha = data.get('senha')
    nome_banco = data.get('nome')
    situacao = str(data.get('situacao'))

    result = subprocess.run(
        ['python', 'banco2.py', '--cnpj', cnpj, '--ip', ip, '--porta', porta, '--usuario',
            usuario, '--senha', senha, '--nome_banco', nome_banco, '--situacao', situacao],
        capture_output=True,
        text=True
    )
    return jsonify({'output': result.stdout})


@app.route('/get-bancos', methods=['GET'])
def get_bancos():
    caminho_arquivo = r'C:\Users\quaestum\Desktop\banco_dados.txt'
    bancos = ler_bancos_txt(caminho_arquivo)
    return jsonify(bancos)


def ler_bancos_txt(caminho_arquivo):
    bancos = []
    file_path = Path(caminho_arquivo)

    if not os.path.exists(file_path):
        print(f"O arquivo {caminho_arquivo} não foi encontrado.")

    with open(file_path, 'r') as file:
        linhas = file.readlines()
        for linha in linhas:
            dados = linha.strip().split(';')
            if len(dados) == 8:
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
                print(f"Linha inválida: {linha.strip()}")

    return bancos


@app.route('/update-banco', methods=['POST'])
def update_banco():
    data = request.json
    result = subprocess.run(
        [
            'python', 'edicaoBD.py',
            '--id', data['id'],
            '--cnpj', data['cnpj'],
            '--ip', data['ip'],
            '--porta', str(data['porta']),
            '--usuario', data['usuario'],
            '--senha', data['senha'],
            '--nome', data['nome'],
            '--situacao', str(data['situacao']),
            '--nome_antigo', data['nome_antigo']
        ],
        capture_output=True,
        text=True
    )

    response = jsonify({'output': result.stdout})
    #response = make_response(jsonify({'message': 'Banco atualizado com sucesso!'} if result.returncode == 0 else {'error': result.stderr}), 200 if result.returncode == 0 else 500)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "POST")
    return response


if __name__ == '__main__':
    app.run(debug=True)
