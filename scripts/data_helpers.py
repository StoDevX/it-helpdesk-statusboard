import json
import os
from datetime import datetime


def now():
    return datetime.now().isoformat()


def ensure_dir_exists(folder):
    # Make sure that a folder exists.
    d = os.path.dirname(folder)
    if not os.path.exists(d):
        os.makedirs(d)


def ensure_file_exists(path):
    ensure_dir_exists(path)
    try:
        open(path, 'r')
    except:
        with open(path, 'w') as input_file:
            input_file.write('')


def needs_reload(filename, minutes):
    path = 'data/' + filename
    now = datetime.now()
    minutes = now.minute - minutes if (now.minute - minutes) >= 0 else 0

    if not os.path.exists(path):
        return True

    with open(path, 'r') as input_file:
        input_data = input_file.read()
        if not input_data:
            return True

        data = json.loads(input_data)

        if 'lastUpdated' not in data:
            return True

        previous_update_time = datetime.strptime(data['lastUpdated'], "%Y-%m-%dT%H:%M:%S.%f")

        if previous_update_time >= now.replace(minute=minutes):
            return False

    return True


def save_data(filename, data):
    path = 'data/' + filename
    ensure_file_exists(path)
    n = now()
    data_to_save = {
        'data': data,
        'lastUpdated': n if '.' in n else n + '.0000'
    }
    with open(path, 'w+') as output_file:
        json_data = json.dumps(data_to_save, indent=2, separators=(',', ': '))
        output_file.write(json_data)
