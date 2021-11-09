import { Button, Grid, Paper } from "@mui/material";
import { useHistory, useLocation } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Papa from 'papaparse'
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';
import DownloadIcon from '@mui/icons-material/Download';

import BurgerMenu from "../components/navigation/BurgerMenu";
import AttendanceTable from "../components/AttendanceTable";
import SnackBar from '../components/feedback/SnackBar'
import { useToggle } from "../helpers/hooks/useToggle";
import { downloadFile } from '../helpers/usedFunctions'
import { useSnackbar } from "../helpers/hooks/useSnackbar";
import adminService from '../services/AdminService'

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
        maxWidth: '22vw'
    }
}))

function AttendanceComponent({ match }) {
    const history = useHistory();
    const [attendanceInfo, setAttendanceInfo] = useState([]);
    const [_, setError, isOpenSnack, closeSnackBar, severity, message] = useSnackbar();
    const [open, close, handleToggle] = useToggle()
    const classes = useStyle();

    const handleClose = (value) => {
        close();
        parseAndDownload(value);
    };

    const goBack = () => history.goBack();

    const parseAndDownload = (type) => {
        const fileName = `${match.home}-vs-${match.away}-Datos de Asistencia`
        const fileNameCsv = `${fileName}.csv`
        const fileNameJson = `${fileName}.json`
        let config =
        {
            quotes: false,
            quoteChar: '"',
            escapeChar: '"',
            delimiter: ",",
            header: true,
            newline: "\r\n",
            skipEmptyLines: false,
            columns: null
        }
        const dataJson = Buffer.from(JSON.stringify(attendanceInfo.sort()))
        const dataCsv = Papa.unparse(attendanceInfo, [config]).replace(/id|dni|nombre|asistencia/gi, (text) => text.toUpperCase())
        if (type === "csv") downloadFile({ fileName: fileNameCsv, data: dataCsv, fileType: 'text/csv;charset=utf-8;' })
        else downloadFile({ fileName: fileNameJson, data: dataJson, fileType: 'text/json' })
    }

    const getMatchAttendanceCallback = useCallback(() => {
        adminService.getMatchAttendance(match.id)
            .then((response) => {
                setAttendanceInfo(response.data);
            })
            .catch((_) => {
                setError("Ocurrio un error al buscar los datos de asistencia para este partido")
            })
    }, [match, setAttendanceInfo, setError])

    useEffect(() => getMatchAttendanceCallback(), [getMatchAttendanceCallback]);

    return (
        <div className={classes.root}>
            <SnackBar
                openSnackBar={isOpenSnack}
                severityState={severity}
                message={message}
                closeSnackBar={closeSnackBar}
                position={{ vertical: 'bottom', horizontal: 'left' }}
            />
            <ExportDialog open={open} onClose={handleClose} options={['csv', 'json']} close={close} />
            <Grid component={Paper} xs={12} className={classes.paper} square elevation={4}>
                <AttendanceTable match={match} attendanceInfo={attendanceInfo} itemsPerPage={5} />
            </Grid>
            <div style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center' }}>
                <Button variant="contained" className={classes.button} sx={{ margin: '2vh', backgroundColor: '#2e86c1' }} onClick={goBack}> Volver </Button>
                <Button variant="contained" className={classes.button} sx={{ margin: '2vh', backgroundColor: '#2e86c1' }} onClick={handleToggle}> Exportar... </Button>
            </div>
        </div>
    )
}

export default function Attendance() {
    const match = useLocation().state.match
    return <BurgerMenu children={<AttendanceComponent match={match} />} />
}



function ExportDialog(props) {
    const { onClose, open, options, close } = props;

    const handleClose = () => {
        close();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const renderOptions = () => {
        return options.map((option, index) =>
            <ListItem button key={index} onClick={() => handleListItemClick(option)}>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                        <DownloadIcon />
                    </Avatar>

                </ListItemAvatar>
                <ListItemText sx={{ fontSize: 16, fontWeight: 'bolder' }}>
                    Como {option.toUpperCase()}
                </ListItemText>
            </ListItem>
        )
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Exportar como...</DialogTitle>
            <List sx={{ pt: 0 }}>
                {renderOptions()}
            </List>
        </Dialog>
    );
}