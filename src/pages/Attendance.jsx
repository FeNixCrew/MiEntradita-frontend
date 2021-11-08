import BurgerMenu from "../components/navigation/BurgerMenu";
import AttendanceTable from "../components/AttendanceTable";
import { Button, Grid, Paper } from "@mui/material";
import { useHistory, useLocation } from "react-router";
import { useCallback, useEffect, useState } from "react";
import adminService from '../services/AdminService'
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((_) => ({
    root: {
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginTop: '3vh'
    },
    paper: {
        minWidth: '83vw', 
        minHeight: '10vw',
        borderRadius: '1vh'
    },
    button: {
        fontSize: 14, 
        maxWidth: '15vw'
    }
}))

function AttendanceComponent({ match }) {
    const history = useHistory();
    const [attendanceInfo, setAttendanceInfo] = useState([]);
    const classes = useStyle();

    const goBack = () => history.goBack();

    const getMatchAttendanceCallback = useCallback(() => {
        adminService.getMatchAttendance(match.id)
            .then((response) => {
                setAttendanceInfo(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [match, setAttendanceInfo])

    useEffect(() => {
        getMatchAttendanceCallback();
    }, [getMatchAttendanceCallback]);

    return (
        <div className={classes.root}>
            <Grid component={Paper} xs={12} className={classes.paper} square elevation={4}>
                <AttendanceTable match={match} attendanceInfo={attendanceInfo} itemsPerPage={5} />
            </Grid>
            <Button variant="contained" className={classes.button} sx={{ margin: '2vh', padding: '2vh' }} onClick={goBack}> Volver </Button>
        </div>
    )
}

export default function Attendance() {
    const match = useLocation().state.match
    return <BurgerMenu children={<AttendanceComponent match={match} />} />
}