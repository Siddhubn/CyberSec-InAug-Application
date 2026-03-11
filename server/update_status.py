from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)
STATUS_FILE = os.path.join(os.path.dirname(__file__), 'status.json')

@app.route('/status', methods=['GET'])
def get_status():
    with open(STATUS_FILE, 'r') as f:
        status = json.load(f)
    return jsonify(status)

@app.route('/auth/<device>', methods=['POST'])
def auth_device(device):
    with open(STATUS_FILE, 'r') as f:
        status = json.load(f)
    if device in status:
        status[device] = True
        with open(STATUS_FILE, 'w') as f:
            json.dump(status, f)
        return jsonify({'success': True, 'device': device})
    return jsonify({'success': False, 'error': 'Invalid device'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
