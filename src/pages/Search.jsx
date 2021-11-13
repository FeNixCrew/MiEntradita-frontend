import BurgerMenu from "../components/navigation/BurgerMenu";
import Searcher from "../components/search/Searcher";

export default function Search() {
    return <BurgerMenu children={<Searcher />} />
}