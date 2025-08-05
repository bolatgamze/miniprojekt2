import React from 'react';
import { Link } from 'react-router-dom';
import { FaCat, FaDog } from 'react-icons/fa';

function Header() {
    // Dynamische Begrüßung basierend auf Uhrzeit
    const hours = new Date().getHours();
    const greeting =
        hours < 12 ? 'Guten Morgen' :
            hours < 18 ? 'Guten Tag' :
                'Guten Abend';

    return (
        <header style={styles.header}>
            <div style={styles.logoSection}>
                <FaCat style={styles.iconCat} />
                <h1 style={styles.title}>Vier Pfoten Blog</h1>
                <FaDog style={styles.iconDog} />
            </div>



            <div style={styles.greeting}>{greeting}!</div>
        </header>
    );
}

const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        background: 'linear-gradient(90deg, #ff8360 0%, #ffefd5 100%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    container: {
        maxWidth: '1200px',
        minWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px',
        padding: '0 16px',
    },
    logoSection: {
        display: 'flex',
        alignItems: 'center',
    },
    iconCat: {
        fontSize: '24px',
        marginRight: '8px',
        animation: 'bounce 2s infinite'
    },
    iconDog: {
        fontSize: '24px',
        marginLeft: '8px',
        animation: 'bounce 2s infinite reverse'
    },
    title: {
        fontSize: '1.5rem',
        margin: 0,
        color: '#333',
        letterSpacing: '1px'
    },
    nav: {
        display: 'flex',
        gap: '16px',
    },
    link: {
        textDecoration: 'none',
        color: '#555',
        fontWeight: '500',
        transition: 'color 0.2s',
    },
    greeting: {
        fontStyle: 'italic',
        color: 'black'
    }
};

// Einfache Keyframes für Bounce-Animation hinzufügen
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Header;
