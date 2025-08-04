import React from 'react';
import { FaCat, FaDog } from 'react-icons/fa';

function Footer() {
    return (
        <footer style={styles.footer}>
            <div style={styles.logoSection}>
                <FaCat style={styles.iconCat} />
                <span style={styles.text}>Katzen & Hunde Blog</span>
                <FaDog style={styles.iconDog} />
            </div>
            <div style={styles.info}>
                © Gamze & Marcel & Shiar
            </div>
        </footer>
    );
}

const styles = {
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        background: 'linear-gradient(90deg, #ffefd5 0%, #ff8360 100%)',
        boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
    },
    logoSection: {
        display: 'flex',
        alignItems: 'center',
    },
    iconCat: {
        fontSize: '20px',
        marginRight: '6px',
        animation: 'bounce 2s infinite'
    },
    iconDog: {
        fontSize: '20px',
        marginLeft: '6px',
        animation: 'bounce 2s infinite reverse'
    },
    text: {
        fontSize: '1rem',
        color: 'black',
        letterSpacing: '0.5px'
    },
    info: {
        fontSize: '0.85rem',
        color: 'black',
        opacity: 0.8,
        fontStyle: 'italic'
    }
};

// Wiederverwenden der Bounce-Keyframes
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Footer;
