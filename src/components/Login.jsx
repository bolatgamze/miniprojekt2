import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ benutzern, setBenutzern, setCurrentUser, currentUser }) {
    const [email, setEmail] = useState('');
    const [passwort, setPasswort] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const benutzer = benutzern.find(u => u.email === email);
        if (!benutzer) {
            setError('Benutzer nicht gefunden!');
            return;
        }
        if (benutzer.password !== passwort) {
            setError('Falsches Passwort!');
            return;
        }
        // Login erfolgreich
        setCurrentUser(benutzer);
        // Zuletzt online aktualisieren
        const aktualisiert = { ...benutzer, zuletztOnline: new Date().toISOString() };
        setBenutzern(bs => bs.map(u => u.email === email ? aktualisiert : u));
        setError('');
        navigate('/home');
    };

    // Styles analog zu NeuerText
    const container = {
        backgroundColor: 'rgba(255,255,255,0.85)',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
        maxWidth: '400px',
        margin: '60px auto',
        fontFamily: 'sans-serif'
    };
    const fieldStyle = {
        width: '100%',
        padding: '8px',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxSizing: 'border-box'
    };
    const buttonStyle = {
        padding: '8px 16px',
        fontSize: '1rem',
        borderRadius: '8px',
        backgroundColor: 'coral',
        border: 'none',
        color: '#fff',
        cursor: 'pointer'
    };
    const linkStyle = {
        color: 'coral',
        textDecoration: 'underline',
        fontWeight: 'bold'
    };

    return (
        <div style={container}>
            <h2>Login</h2>
            {currentUser ? (
                <div>
                    <h3>Willkommen zurück, {currentUser.benutzername}!</h3>
                    <p><strong>Email:</strong> {currentUser.email}</p>
                    <p><strong>Status:</strong> {currentUser.status}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <input
                        type="email"
                        placeholder="E-Mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={fieldStyle}
                    />
                    <input
                        type="password"
                        placeholder="Passwort"
                        value={passwort}
                        onChange={e => setPasswort(e.target.value)}
                        required
                        style={fieldStyle}
                    />
                    <button type="submit" style={buttonStyle}>
                        Anmelden
                    </button>
                    <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                        <span>Noch nicht registriert? </span>
                        <Link to="/register" style={linkStyle}>
                            Jetzt registrieren
                        </Link>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Login;
