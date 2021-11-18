function TicketPaymentCard({ticket}) {
    const payTicket = () => {
        window.open(ticket.link, '_self');
    }

    return (
        <div>
            {
            ticket ?
                <div>
                    <h1>{ticket.home} vs {ticket.away} </h1>
                    <h3> Valor: ${ticket.price}</h3>
                    <button onClick={payTicket}> PAGAR AHORA</button>
                </div> :
             <h1>Cargando...</h1>
            }
        </div>
    );
}

export default TicketPaymentCard;