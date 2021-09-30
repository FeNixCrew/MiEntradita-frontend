import NavBar from '../components/navigation/NavBar';
import { isAdmin } from '../helpers/usedFunctions';
import Admin from '../components/user/Admin'
import Spectator from '../components/user/Spectator';

export default function Home() {
    const role = localStorage.getItem('role');

    const switchRole = () => {
        switch (role) {
            case "ROLE_ADMIN":
                return <Admin />
            case "ROLE_USER":
                return <Spectator />
        }
    };

    return (
        <>
            <NavBar />
            {switchRole()}
        </>
    )
}