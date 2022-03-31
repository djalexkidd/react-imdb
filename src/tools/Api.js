import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Accueil from "../pages/Accueil";

const Api = async () => {
    return <Accueil moviesData={moviesData} pageNumber={pageNumber} pageMax={pageMax} query={query}/>
}

export default Api;