from datetime import datetime
import json
import sys
import os


def check_pid(pid):
    '''Check for the existence of a unix pid.'''
    try:
        os.kill(pid, 0)
    except OSError:
        return False
    else:
        return True


def make_lock_filename(filename):
    return 'data/' + filename + '.lock'


def lock_data(filename):
    lockname = make_lock_filename(filename)
    if not os.path.exists(lockname):
        ensure_file_exists(lockname)
        with open(lockname, 'w') as input_file:
            input_file.write(str(os.getpid()))
        return

    else:
        with open(lockname, 'r') as input_file:
            pid = input_file.read().strip()
            if pid:
                pid = int(pid)
                if not check_pid(pid):
                    with open(lockname, 'w') as f:
                        f.write(str(os.getpid()))
                        return

        print('Lock file exists at %s' % lockname, file=sys.stderr)
        print('Either another process is running, or the previous copy crashed.', file=sys.stderr)
        print('Remove the lock file to continue.', file=sys.stderr)
        sys.exit(1)


def unlock_data(filename):
    os.remove(make_lock_filename(filename))


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


def load_data(filename):
    path = 'data/' + filename
    ensure_file_exists(path)
    with open(path, 'r') as input_file:
        return json.loads(input_file.read())['data']
