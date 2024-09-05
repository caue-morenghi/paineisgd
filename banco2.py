# pip install mysql-connector-python
import os
import mysql.connector
from mysql.connector import Error
from pathlib import Path
import argparse
import datetime
import re

def salvar_credenciais_txt(id, cnpj, ip, porta, usuario, senha, nome_banco, situacao):
    file_path = Path(r'C:\Users\Quaestum\Desktop\banco_dados.txt')
    data = f"{id};{cnpj};{ip};{porta};{usuario};{senha};{nome_banco};{situacao}\n"
    
    if not os.path.exists(file_path):
        with open(file_path, 'w') as file:
            file.write(data)
    else:
        with open(file_path, 'a') as file:
            file.write(data)

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
            return connection
    except Error as e:
        return str(e)

def obter_maior_id(cnpj, caminho_arquivo):
    maior_id = 99
    file_path = Path(caminho_arquivo)
    
    if not os.path.exists(file_path):
        return maior_id
    
    cnpj_numerico = re.sub(r'[^\d]', '', cnpj)
    
    with open(file_path, 'r') as file:
        linhas = file.readlines()
        for linha in linhas:
            dados = linha.strip().split(';')
            if len(dados) == 8 and dados[1] == cnpj_numerico:
                id_atual = int(dados[0])
                if id_atual > maior_id:
                    maior_id = id_atual
    
    return maior_id

def inserir_dados_bd(id_banco, nome_banco):
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
        insert_query = "INSERT INTO bancos (id_banco, nome) VALUES (%s, %s)"
        cursor.execute(insert_query, (id_banco, nome_banco))
        connection.commit()
        cursor.close()
        return "Dados inseridos com sucesso!"
    except Error as e:
        return f"Erro ao inserir dados: {e}"

def main():
    parser = argparse.ArgumentParser(description='Processar dados do banco.')
    parser.add_argument('--cnpj', required=True, help='CNPJ do banco')
    parser.add_argument('--ip', required=True, help='IP do banco')
    parser.add_argument('--porta', required=True, help='Porta do banco')
    parser.add_argument('--usuario', required=True, help='Usuário do banco')
    parser.add_argument('--senha', required=True, help='Senha do banco')
    parser.add_argument('--nome_banco', required=True, help='Nome do banco de dados')
    parser.add_argument('--situacao', required=True, help='Situação do banco')
    args = parser.parse_args()

    cnpj_numerico = re.sub(r'[^\d]', '', args.cnpj)
    caminho_arquivo = r'C:\Users\Quaestum\Desktop\banco_dados.txt'
    maior_id = obter_maior_id(cnpj=cnpj_numerico, caminho_arquivo=caminho_arquivo)
    novo_id = maior_id + 1

    connection = testar_conexao(args.ip, args.porta, args.usuario, args.senha, args.nome_banco)
    if isinstance(connection, str):
        print(f"Erro ao conectar ao banco de dados: {connection}")
    else:
        resultado_insercao = inserir_dados_bd(novo_id, args.nome_banco)
        if "sucesso" in resultado_insercao:
            salvar_credenciais_txt(novo_id, cnpj_numerico, args.ip, args.porta, args.usuario, args.senha, args.nome_banco, args.situacao)
            print("Credenciais salvas com sucesso!")
        else:
            print(resultado_insercao)

if __name__ == "__main__":
    main()