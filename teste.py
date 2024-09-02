from pathlib import Path

arq = Path(r'/Users/novo1/Desktop/banco_dados.rtf')

if arq.exists():
    print('Arquivo existe')