import { useHistory } from 'react-router';
import NavBar from '../components/navigation/NavBar';
import Admin from '../components/user/Admin'
import Spectator from '../components/user/Spectator';

export default function Home() {
    const history = useHistory();
    const role = localStorage.getItem('role');

    const switchRole = () => {
        switch (role) {
            case "ROLE_ADMIN":
                return <Admin />
            case "ROLE_USER":
                return <Spectator />
            default:
                history.push('/login')
        }
    };

    return (
        <>
            <NavBar />
            {switchRole()}
        </>
    )
}