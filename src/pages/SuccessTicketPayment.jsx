import { useHistory, useParams } from "react-router";
import BurgerMenu from "../components/navigation/BurgerMenu";
import { useEffect } from "react";
import spectatorService from "../services/SpectatorService";

function Success({ticketId, payment_id}) {

    useEffect(() => {
        spectatorService.savePayment(ticketId, payment_id);
    }, [ticketId, payment_id]);

    return (
        <div>
            {
                ticketId && payment_id ? 
                <div>
                    TicketId: {ticketId}
                    paymentId: {payment_id}
                </div>
                :
                <div> Cargando...</div>
            }
        </div>
    )
}

function SuccessTicketPayment() {
    const history = useHistory();
    const { ticketId } = useParams();
    const queryParams = new URLSearchParams(history.location.search);
    const payment_id = queryParams.get('payment_id');

    return <BurgerMenu children={<Success ticketId={ticketId} payment_id={payment_id}/>} />
}

export default SuccessTicketPayment;