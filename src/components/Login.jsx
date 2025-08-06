import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";

function Login({ benutzern, setCurrentUser, currentUser }) {
    const [email, setEmail] = useState('');
    const [passwort, setPasswort] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Suche nach Benutzer in der Liste
        const benutzer = benutzern.find((user) => user.email === email);

        // Überprüfe, ob der Benutzer existiert und ob das Passwort stimmt
        if (!benutzer) {
            setError('Benutzer nicht gefunden!');
            return;
        }

        if (benutzer.password !== passwort) {
            setError('Falsches Passwort!');
            return;
        }

        // Erfolgreiches Login
        setCurrentUser(benutzer);
        setError('');
        navigate(`/home`);


        // Beispiel: Weiterleitung zur Home-Seite oder zum Benutzerprofil
        // Mit React Router: history.push('/home');
    };

    return (
        <div style={{ padding: '40px 20px 30px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Login</h2>

            {currentUser ? (
                <div>
                    <h3>Willkommen zurück, {currentUser.benutzername}!</h3>
                    <p>Email: {currentUser.email}</p>
                    <p>Status: {currentUser.status}</p>
                    {/* Weitere Login-Details anzeigen */}
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {error && <div style={{ color: 'red' }}>{error}</div>}

                    <input
                        type="email"
                        placeholder="E-Mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: '0.5rem', fontSize: '1rem' }}
                    />

                    <input
                        type="password"
                        placeholder="Passwort"
                        value={passwort}
                        onChange={(e) => setPasswort(e.target.value)}
                        required
                        style={{ padding: '0.5rem', fontSize: '1rem' }}
                    />

                    <button type="submit" style={{ padding: '0.5rem', fontSize: '1rem', cursor: 'pointer' }}>
                        Anmelden
                    </button>
                    <div style={{ marginTop: '1rem' }}>
                        <span>Noch nicht registriert? </span>
                        <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>Jetzt registrieren</Link>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Login;
