import json
import os

STATUS_FILE = os.path.join(os.path.dirname(__file__), 'status.json')

def reset_status():
    status = {
        "principal": False,
        "coordinator1": False,
        "coordinator2": False,
        "coordinator3": False,
        "hod1": False,
        "hod2": False,
        "president": False
    }
    with open(STATUS_FILE, 'w') as f:
        json.dump(status, f)

if __name__ == '__main__':
    reset_status()
