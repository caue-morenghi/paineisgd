import os
import mysql.connector
from mysql.connector import Error
from pathlib import Path

def salvar_credenciais_txt(cnpj, ip, porta, usuario, senha, nome_banco):
    file_path = Path(r'C:\Users\Quaestum\Desktop\banco_dados.txt')
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
    cnpj = input("Digite o CNPJ: ")
    ip = input("Digite o IP: ")
    porta = input("Digite a Porta: ")
    usuario = input("Digite o Usuário: ")
    senha = input("Digite a Senha: ")
    nome_banco = input("Digite o Nome do Banco de Dados: ")

    salvar_credenciais_txt(cnpj, ip, porta, usuario, senha, nome_banco)

    connection = testar_conexao(ip, porta, usuario, senha, nome_banco)
    print(connection)
    if connection:
        result = inserir_dados_bd(connection, cnpj, nome_banco)
        connection.close()
        print(result)
    else:
        print("Uma ou mais credenciais do banco de dados incorretas")

if __name__ == "__main__":
    main()