import NavBar from '../components/navigation/NavBar';
import { isAdmin } from '../helpers/usedFunctions';
import Admin from '../components/user/Admin'
import Spectator from '../components/user/Spectator';

export default function Home() {

    return (
        <>
        <NavBar />
            {
                isAdmin() ?
                    <Admin />
                    :
                    <Spectator />

            }
        </>
    )
}