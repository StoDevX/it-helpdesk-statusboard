from datetime import datetime
import random
import time
import json
import sys
import os


def get_userpass_pair(name):
    # returns ['username', 'password']
    filename = os.path.join(os.path.dirname(__file__), '..', 'credentials', '%s.credential' % name)
    with open(filename, 'r') as credentials:
        return credentials.read().split('\n')[0:2]

def get_api_key(name):
    # returns 'apikey'
    filename = os.path.join(os.path.dirname(__file__), '..', 'credentials', '%s.credential' % name)
    with open(filename, 'r') as credentials:
        return credentials.read().split('\n')[0]


def pid_is_running(pid):
    '''Check for the existence of a unix pid.'''
    try:
        os.kill(pid, 0)
    except OSError:
        return False
    else:
        return True


def make_data_filename(filename):
    return os.path.join(os.path.dirname(__file__), '..', 'data/%s' % filename)


def make_lock_filename(filename):
    return make_data_filename(filename + '.lock')


def lock_data(filename, depth=0):
    lockname = make_lock_filename(filename)

    # no lockfile, so make it
    try:
        with open(lockname, 'x') as input_file:
            input_file.write(str(os.getpid()))
        return
    
    # lockfile exists
    except FileExistsError as err:
        try:
            with open(lockname, 'r') as f:
                pid = f.read().strip()
                # sometimes pid hasn't been written yet,
                # so we wait for 1 second so the other process
                # can write.
                if not pid and depth == 0:
                    time.sleep(1)
                    return lock_data(filename, depth + 1)
                elif depth == 3:
                    print('lockfile has no pid: %s' % lockname, file=sys.stderr)
                    sys.exit(1)
                pid = int(pid)
        except FileNotFoundError as err:
            return

        # pid running; spin for rand() seconds
        time_slept = 0
        while pid_is_running(pid) and time_slept < 60:
            sleepy_time = random.randrange(1, 10)
            time_slept += sleepy_time
            time.sleep(sleepy_time)

        if pid_is_running(pid):
            print('Lock file exists at %s' % lockname, file=sys.stderr)
            print('Either another process is running, or the previous copy crashed.', file=sys.stderr)
            print('Remove the lock file to continue.', file=sys.stderr)
            sys.exit(1)

        # if the pid is gone:
        # - pid was dead from beginning,
        # - or pid closed while spinning,
        # = so change pid and continue
        with open(lockname, 'w') as f:
            f.write(str(os.getpid()))
            return
        


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
    path = make_data_filename(filename)
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
    path = make_data_filename(filename)
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
    path = make_data_filename(filename)
    ensure_file_exists(path)
    with open(path, 'r') as input_file:
        return json.loads(input_file.read())['data']
