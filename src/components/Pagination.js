import { Link, useSearchParams } from "react-router-dom";
import './Pagination.css';

const prevNextPages = ({pageLink, pagenumber, pageMax = 0, withSearch = false, search}, prev = true) => {
    // les 3 pages avant la notre
    for (let x = 1; x < 4; x++) { // je fais 3 tour de boucle
        let pageLinkNumber = (prev) ? (pagenumber - x) : (pagenumber + x) ; // je calcul le nouveau numero de page du lien
        if ((prev && pageLinkNumber < 1) || (!prev && pageLinkNumber > pageMax)) // si il est inférieur à 1
            break; // j'arrète la boucle
        pageLink.push(<Link key={pageLink.length} to={buildPath(pageLinkNumber, withSearch, search)}>{pageLinkNumber}</Link>) // sinon j'ajoute le lien a la liste
    }
    if (prev)
        pageLink.reverse();
    return pageLink;
}

const showPage = (pageMax, pagenumber, withSearch, search) => {
    let pageLink = [];
    pageMax = pageMax > 500 ? 500 : pageMax;

    pageLink = prevNextPages({pageLink, pagenumber, withSearch, search}) // les trois pages d'avant
    pageLink.push(<span key={pageLink.length} className="actualPage">{pagenumber}</span>) // j'ajoute la page actuelle
    pageLink = prevNextPages({pageLink, pagenumber, pageMax, withSearch, search}, false) // les trois pages d'après

    return pageLink;
}

const buildPath = (num, withSearch, search) => {
    if (withSearch){
        let url = '';
        for (let param of search.entries()){
            if (param[0] === 'page')
                continue;
            url += ((url === '') ? '?' : '&' )+param[0]+'='+param[1];
        }
        return url+(url === '' ? '?' : '&' )+'page='+num;
    } else {
        if (num === 1) {
            return '/';
        } else {
            return '/page/'+num;
        }
    }
}

const Pagination = (props) => {
    
    let {pageMax, pageNumber} = props;
    let [search] = useSearchParams();

    pageNumber = pageNumber < 1 ? 1 : pageNumber;
    
    return (
        <div className="pagination">
            {
                (pageNumber > 1) &&
                    <Link to={buildPath(1, props.withSearch, search)}>{'<<'}</Link>
            }
            {
                (pageNumber > 1) &&
                    <Link to={buildPath(pageNumber - 1, props.withSearch, search)}>{'<'}</Link>
            }

            { showPage(pageMax, pageNumber, props.withSearch, search)}

            {
                (pageNumber < pageMax) &&
                    <Link to={buildPath(pageNumber + 1, props.withSearch, search)}>{'>'}</Link>
            }
            {
                (pageNumber < pageMax) &&
                    <Link to={buildPath(pageMax, props.withSearch, search)}>{'>>'}</Link>
            }
        </div>
    )
}

export default Pagination;