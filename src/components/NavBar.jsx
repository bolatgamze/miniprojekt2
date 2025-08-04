import React from 'react';
import { Link } from 'react-router-dom';

/*
bei navbar als gast kann man nur home about und login sehen
adminpanel, entwürfe und neuer text sind nur für admin
und merkliste ist nur für user

wo 'mein profil' steht, hätte ich gerne profil bild vom user
 */

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navLinks">
                <Link to="/home" className="navLink">Home</Link>
                <Link to="/admin" className="navLink">Admin Panel</Link>
                <Link to="/neuerText" className="navLink">Neuer Text</Link>
                <Link to="/entwuerfe" className="navLink">Entwürfe</Link>
                <Link to="/merkliste" className="navLink">Merkliste</Link>
                <Link to="/" className="navLink">About</Link>
            </div>

            <div>
                <Link to="/profil" className="navLink">Mein Profil</Link>

                <Link to="/login" className="navLink">Login</Link>
            </div>
        </nav>
    );
}

export default NavBar;
