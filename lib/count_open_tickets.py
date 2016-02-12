from .get_tickets import get_tickets


def count_open_tickets():
    open_tickets = get_tickets('open')
    # awaiting_client_tickets = get_tickets('awaiting client')
    return len(open_tickets)  # + len(awaiting_client_tickets)
