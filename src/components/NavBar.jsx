import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NavBar-Komponente mit rollenbasiertem Zugriff und festgelegter Breite.
 * props:
 * - user: { benutzername, status, profilbild }
 *   status: 'guest' | 'user' | 'admin'
 */
function NavBar({ user, handleLogout }) {
    const role = user?.status || 'guest';
    const avatarUrl = user?.profilbild || '';

    console.log(user.benutzername)

    return (
        <nav style={styles.navbar}>
            <div style={styles.container}>
                {/* Link-Bereich */}
                <div style={styles.links}>
                    <Link to="/home" className="navLink">Home</Link>
                    <Link to="/" className="navLink">Über Uns</Link>

                    {role === 'admin' && (
                        <>
                            <Link to="/admin" className="navLink">Admin Panel</Link>
                            <Link to="/neuerText" className="navLink">Neuer Text</Link>
                            <Link to="/entwuerfe" className="navLink">Entwürfe</Link>
                        </>
                    )}

                    {(role === 'user' || role === 'admin') && (
                        <Link to="/merkliste" className="navLink">Merkliste</Link>
                    )}
                </div>

                {/* Profil-/Logout-Bereich */}
                <div style={styles.profileSection}>
                    {role !== 'guest' ? (
                        <>
                            <Link to="/meinprofil" style={styles.profileLink}>
                                <img src={avatarUrl} alt="Profilbild" style={styles.avatar} />
                            </Link>
                            <Link to="/home" onClick={handleLogout} className="navLink" style={styles.logoutLink}>Logout</Link>
                        </>
                    ) : (
                        <Link to="/login" className="navLink" style={styles.logoutLink}>Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        width: '100%',
        background: 'linear-gradient(90deg, #ff8360 0%, #ffefd5 100%)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    container: {
        maxWidth: '1200px',
        minWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '60px',
        padding: '0 16px',
    },
    links: {
        display: 'flex',
        gap: '16px',
        whiteSpace: 'nowrap',
    },
    profileSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    profileLink: {
        display: 'block',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '50%',
    },
    logoutLink: {
        textDecoration: 'none',
        color: '#333',
        fontWeight: '500',
        transition: 'color 0.2s',
    }
};

export default NavBar;
