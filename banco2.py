import os
import mysql.connector
from mysql.connector import Error
from pathlib import Path
import argparse

def salvar_credenciais_txt(cnpj, ip, porta, usuario, senha, nome_banco):
    file_path = Path(r'/Users/novo1/Desktop/banco_dados.rtf')
    data = f"{cnpj};{ip};{porta};{usuario};{senha};{nome_banco}\n"
    
    if not os.path.exists(file_path):
        with open(file_path, 'w') as file:
            file.write(data)
    else:
        with open(file_path, 'a') as file:
            file.write(data + '\n')

def testar_conexao(ip, porta, usuario, senha, nome_banco):
    try:
        connection = mysql.connector.connect(
            host=ip,
            user=usuario,
            password=senha,
            database=nome_banco,
            port=porta
        )
        return connection
    except Error:
        return 'Não foi possível conectar ao banco de dados'

def inserir_dados_bd(connection, cnpj, nome_banco):
    try:
        cursor = connection.cursor()
        insert_query = "INSERT INTO bancos (cnpj, nome) VALUES (%s, %s)"
        cursor.execute(insert_query, (cnpj, nome_banco))
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

    args = parser.parse_args()

    salvar_credenciais_txt(args.cnpj, args.ip, args.porta, args.usuario, args.senha, args.nome_banco)

    connection = testar_conexao(args.ip, args.porta, args.usuario, args.senha, args.nome_banco)
    print(connection)
    if connection:
        numero_cnpj = int(args.cnpj.replace('.', '').replace('/', '').replace('-', '').replace(' ', ''))
        result = inserir_dados_bd(connection, numero_cnpj, args.nome_banco)
        connection.close()
        print(result)
    else:
        print("Uma ou mais credenciais do banco de dados incorretas")

if __name__ == "__main__":
    main()