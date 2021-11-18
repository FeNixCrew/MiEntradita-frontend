import { useEffect } from "react";
import { useState } from "react";

import spectatorService from "../services/SpectatorService";
import { useSnackbar } from "../helpers/hooks/useSnackbar";
import TicketPaymentCard from "../components/TicketPaymentCard";
import SnackBar from "../components/feedback/SnackBar";
import BurgerMenu from "../components/navigation/BurgerMenu";

function PendingPaymentsPage() {
    const [setError, _, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();
    const [pendingPayments, setPendingPayments] = useState(null);

    useEffect(() => {
        spectatorService.pendingPayments()
            .then((res) => {
                setPendingPayments(res.data);
            })
            .catch((_) => {
                setError('Fallo al obtener entradas para pagar. Intente de nuevo');
            })
    }, [setError]);

    const showPendingTicketsPayment = () => {
        return pendingPayments.map(ticket => <TicketPaymentCard key={ticket.id} ticket={ticket}/>);
    }

    return (
        <div>
            <SnackBar
            openSnackBar={isOpenSnack}
            severityState={severity}
            message={message}
            closeSnackBar={closeSnackBar}
            position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            {
            pendingPayments ? 
                <div>
                    {showPendingTicketsPayment()}
                </div>
                :
                <h1> Cargando... </h1>
            }
        </div>
    )
}

function PendingPayments() {
    return <BurgerMenu children={<PendingPaymentsPage/>} />
}

export default PendingPayments;