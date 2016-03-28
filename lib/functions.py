from itertools import groupby


def take(num, iterable):
    for i, x in enumerate(iterable):
        if i < num:
            yield x
        else:
            break


def first(l, default):
    if len(l) >= 1:
        return l[0]
    return default


def group_by(predicate, iterable):
    sorted_iterable = sorted(iterable, key=predicate)
    grouped = groupby(sorted_iterable, key=predicate)
    return {k: list(v) for k, v in grouped}


def flatten(*args):
    # from http://stackoverflow.com/a/2158532/2347774
    for l in args:
        for el in l:
            if isinstance(el, list) and not isinstance(el, str):
                yield from flatten(el)
            else:
                yield el
