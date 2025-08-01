import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    const linkStyle = {
        textDecoration: 'none',
        color: 'white',
        fontWeight: '500',
        fontSize: '16px',
        padding: '8px 12px',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    };

    const hoverStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    };

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#2d0037', // siyaha yakın mor
            padding: '15px 30px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
        }}>
            <div style={{ display: 'flex', gap: '25px' }}>
                <Link
                    to="/"
                    style={linkStyle}
                    onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
                    onMouseOut={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent' })}
                >
                    Home
                </Link>
                <Link
                    to="/admin"
                    style={linkStyle}
                    onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
                    onMouseOut={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent' })}
                >
                    Admin Panel
                </Link>
                <Link
                    to="/entwuerfe"
                    style={linkStyle}
                    onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
                    onMouseOut={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent' })}
                >
                    Entwürfe
                </Link>
                <Link
                    to="/merkliste"
                    style={linkStyle}
                    onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
                    onMouseOut={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent' })}
                >
                    Merkliste
                </Link>

                <Link
                    to="/about"
                    style={linkStyle}
                    onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
                    onMouseOut={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent' })}
                >
                    About
                </Link>
            </div>

            <div>
                <Link
                    to="/login"
                    style={linkStyle}
                    onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
                    onMouseOut={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent' })}
                >
                    Login
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;
