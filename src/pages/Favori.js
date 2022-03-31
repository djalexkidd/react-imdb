import { useContext } from "react";
import { Fragment } from "react";
import FavoriteContext from "../FavoriteContext";
import Movies from "../components/Movies";

const Favori = () => {
    let { favs } = useContext(FavoriteContext);

    return (
        <Fragment>
            <h1>FAVORIS</h1>
            {
                favs.map( item => <Movies key={item.id} datas={item} />)
            }
        </Fragment>
    )
}

export default Favori;