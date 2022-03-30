import { Link } from "react-router-dom";
import './NavBar.css';
import logo from '../images/logo.svg';

const linkList = [
    ['/', 'Home']
]

const NavBar = () => {
    return (
        <nav>
            <img src={logo} alt="logo"/>
            <div className="links">
                {
                    linkList.map(([url, titre], index) => <Link key={index} to={url}>{titre}</Link>)
                }
            </div>
        </nav>
    )
}

export default NavBar;