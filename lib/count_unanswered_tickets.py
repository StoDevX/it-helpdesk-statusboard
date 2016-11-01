from .get_tickets import get_tickets


def is_normal_priority(t):
    return t['prioritytype'] and t['prioritytype']['priorityTypeName'] == 'Normal Svc Req'


def is_unanswered(t):
    return len(t['notes']) == 0


def is_client_response_ticket(t):
    return len(t['notes']) and t['notes'][0]['isTechNote'] is not True


def count_unanswered_tickets():
    tickets = get_tickets('open')

    tickets = [t for t in tickets if is_normal_priority(t)]

    # get only the tickets with no responses at all
    unanswered_tickets = [t for t in tickets if is_unanswered(t)]

    # get the tickets whose most recent response is not from a worker or staff
    client_response = [t for t in tickets if is_client_response_ticket(t)]

    return len(unanswered_tickets) + len(client_response)
