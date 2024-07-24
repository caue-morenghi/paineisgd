from flask import Flask
import subprocess
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/run-script')
def run_script():
    result = subprocess.run(['python', 'leitura_nota.py'], capture_output=True, text=True)
    return result.stdout

if __name__ == '__main__':
    app.run(debug=True)