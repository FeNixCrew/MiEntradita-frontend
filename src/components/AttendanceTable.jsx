import { Fragment, useState, useEffect, useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import TablePagination from "@material-ui/core/TablePagination";
import { isMobile } from 'react-device-detect';

const Title = (props) => {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{ textAlign: 'center' }}>
            {props.children}
        </Typography>
    );
}

const TableItem = ({ userData }) => {
    const [attendanceColor, setAttendanceColor] = useState('');

    const getAttendanceColorCallback = useCallback(() => {
        switch (userData.asistencia) {
            case 'PRESENTE':
                setAttendanceColor('green');
                break;
            case 'AUSENTE':
                setAttendanceColor('red');
                break;
            default:
                setAttendanceColor('orange');
                break;
        }
    }, [userData, setAttendanceColor])

    useEffect(() => getAttendanceColorCallback(), [getAttendanceColorCallback])

    return (

        <TableRow key={userData.id} sx={{ fontStyle: 'italic' }}>
            {console.log(userData)}
            {Object.entries(userData).map(([field, value]) =>
                <TableCell sx={{ padding: 2, color: (field === "asistencia" && attendanceColor) }}>{value}</TableCell>
            )}
        </TableRow>
    )
}

function AttendanceTable({ match, attendanceInfo, itemsPerPage }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

    const rowsPerPageOptions = isMobile ? -1 : [5, 10, 25];

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const renderTableItem = () => {
        return attendanceInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((givenUserData) => <TableItem userData={givenUserData} />)
    }

    return (
        <Fragment>
            <Title>Datos de asistencias para {match.home} vs {match.away}</Title>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ fontWeight: 'bold' }}>
                        {["ID", "Nombre", "DNI", "Estado de asistencia"].map((option) =>
                            <TableCell sx={{ fontWeight: 'bold' }}>{option}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderTableItem()}
                </TableBody>
            </Table>
            <TablePagination
                labelRowsPerPage="Espectadores por pagina"
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={attendanceInfo.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Fragment>
    );
}

export default AttendanceTable;