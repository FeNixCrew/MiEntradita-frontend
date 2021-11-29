import { useEffect, useState, useCallback } from "react";
import SnackBar from "../components/feedback/SnackBar";
import BurgerMenu from "../components/navigation/BurgerMenu";
import { useSnackbar } from "../helpers/hooks/useSnackbar";
import matchService from '../services/MatchService'
import { Container, Paper } from '@mui/material';
import {
    Scheduler,
    MonthView,
    DayView,
    WeekView,
    DateNavigator,
    Toolbar,
    ViewSwitcher,
    Appointments,
    AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { isMobile } from "react-device-detect";

const Appointment = ({
    children, style, ...restProps
}) => (
    <Appointments.Appointment
        {...restProps}
        style={{
            ...style,
            backgroundColor: '#2e86c1',
            borderRadius: '8px',
        }}
    >
        {children}
    </Appointments.Appointment>
);

function CalendarComponent() {
    const [matchs, setMatchs] = useState([]);
    const [currentView, setCurrentView] = useState(isMobile ? 'day' : 'month')
    const [setError, _, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();
    const currentDate = new Date();

    const currentViewNameChange = (currentViewName) => {
        setCurrentView(currentViewName);
    };

    const changeMatchsFormatAndSet = useCallback((data) => {
        const newData = data.map((match) => {
            const { home, away, matchStartTime } = match;
            const endTime = new Date(matchStartTime).addHours(2)
            return {
                title: `${home} vs ${away}`,
                startDate: matchStartTime,
                endDate: endTime,
            }
        });
        setMatchs(newData)
    }, [setMatchs]);

    useEffect(() => {
        matchService.getMatchs()
            .then((response) => {
                changeMatchsFormatAndSet(response.data);
            })
            .catch((_) => {
                setError("Ocurrio un error al obtener los partidos para el calendario")
            })
    },[changeMatchsFormatAndSet, setError])

    return (
        <>
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState={severity}
                message={message}
                closeSnackBar={closeSnackBar}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            <Container component={Paper} style={{ marginTop: '2vh', borderRadius: '2vh', minWidth: '92vw', minHeight: '38vw' }} elevation={4} square>
                <Scheduler
                    data={matchs}
                    height={500}
                    locale='es-ES'
                >
                    <ViewState
                        defaultCurrentDate={currentDate}
                        currentViewName={currentView}
                        onCurrentViewNameChange={currentViewNameChange}
                    />
                    <DayView name='day' displayName='Dia' />
                    <MonthView name='month' displayName="Mensual" />
                    <WeekView
                        name='week'
                        displayName="Semanal"
                        startDayHour={9}
                        endDayHour={22}
                    />
                    <Toolbar />
                    <DateNavigator />
                    <ViewSwitcher />
                    <Appointments
                        appointmentComponent={Appointment}
                    />
                    <AppointmentTooltip
                        showCloseButton
                    />
                </Scheduler>
            </Container>
        </>
    )
}

export default function Calendar() {
    return <BurgerMenu children={<CalendarComponent />} />
}