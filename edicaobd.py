import os
from pathlib import Path
import mysql.connector
from mysql.connector import Error
import argparse
import re

caminho_arquivo = Path(r'C:\Users\Quaestum\Desktop\banco_dados.txt')

def testar_conexao(ip, porta, usuario, senha, nome_banco):
    try:
        connection = mysql.connector.connect(
            host=ip,
            user=usuario,
            password=senha,
            database=nome_banco,
            port=porta,
            auth_plugin='mysql_native_password'
        )
        if connection.is_connected():
            return True
    except Error as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return False

def atualizar_banco(caminho_arquivo, banco_editado, cnpj_antigo):
    banco_str = f"{banco_editado['id']};{banco_editado['cnpj']};{banco_editado['ip']};{banco_editado['porta']};{banco_editado['usuario']};{banco_editado['senha']};{banco_editado['nome']};{banco_editado['situacao']}\n"

    if not os.path.exists(caminho_arquivo):
        raise FileNotFoundError(f"O arquivo {caminho_arquivo} não foi encontrado.")

    with open(caminho_arquivo, 'r') as file:
        linhas = file.readlines()

    with open(caminho_arquivo, 'w') as file:
        for linha in linhas:
            if linha.startswith(f"{banco_editado['id']};{cnpj_antigo};"):
                file.write(banco_str)
            else:
                file.write(linha)

def update_banco(banco_editado):
    try:
        connection = mysql.connector.connect(
            host="127.0.0.1",
            user="root",
            password="caue2005",
            database="gerenciador",
            port="3306",
            auth_plugin='mysql_native_password'
        )
        cursor = connection.cursor()
        update_query = "UPDATE bancos SET nome = %s WHERE nome = %s"
        cursor.execute(update_query, (banco_editado['nome'], banco_editado['nome_antigo']))
        connection.commit()
        cursor.close()
        print("Banco atualizado com sucesso!")
        return 'Banco atualizado com sucesso!'
    except Error as e:
        print(f"Erro ao atualizar o banco de dados: {e}")
        return f"Erro ao atualizar o banco de dados: {e}"

def main():
    parser = argparse.ArgumentParser(description='Atualizar banco de dados no arquivo TXT.')
    parser.add_argument('--id', required=True, help='ID do banco')
    parser.add_argument('--cnpj', required=True, help='CNPJ do banco')
    parser.add_argument('--ip', required=True, help='IP do banco')
    parser.add_argument('--porta', required=True, help='Porta do banco')
    parser.add_argument('--usuario', required=True, help='Usuário do banco')
    parser.add_argument('--senha', required=True, help='Senha do banco')
    parser.add_argument('--nome', required=True, help='Nome do banco de dados')
    parser.add_argument('--situacao', required=True, help='Situação do banco')
    parser.add_argument('--nome_antigo', required=True, help='Nome antigo do banco')
    parser.add_argument('--cnpj_antigo', required=True, help='CNPJ antigo do banco')
    args = parser.parse_args()

    cnpj_numerico = re.sub(r'[^\d]', '', args.cnpj)

    banco_editado = {
        "id": args.id,
        "cnpj": cnpj_numerico,
        "ip": args.ip,
        "porta": args.porta,
        "usuario": args.usuario,
        "senha": args.senha,
        "nome": args.nome,
        "situacao": args.situacao,
        "nome_antigo": args.nome_antigo,
        "cnpj_antigo": args.cnpj_antigo
    }

    print(banco_editado)

    conexao_valida = testar_conexao(args.ip, args.porta, args.usuario, args.senha, args.nome)
    if conexao_valida is not True:
        print("Erro ao conectar ao banco de dados")
    else:
        resultado_insercao = update_banco(banco_editado)
        if "sucesso" in resultado_insercao:
            try:
                atualizar_banco(caminho_arquivo, banco_editado, banco_editado['cnpj_antigo'])
            except (FileNotFoundError, ValueError) as e:
                print("Erro ao atualizar o banco de dados no arquivo:", e)
        else:
            print("Erro ao atualizar o banco de dados:", resultado_insercao)

if __name__ == "__main__":
    main()