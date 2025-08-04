import React, { useState } from 'react';

function Login({ benutzern, setCurrentUser, currentUser }) {
    const [email, setEmail] = useState('');
    const [passwort, setPasswort] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        // Suche nach Benutzer in der Liste
        const benutzer = benutzern.find((user) => user.email === email);

        // Überprüfe, ob der Benutzer existiert und ob das Passwort stimmt
        if (!benutzer) {
            setError('Benutzer nicht gefunden!');
            return;
        }

        if (benutzer.passwort !== passwort) {
            setError('Falsches Passwort!');
            return;
        }

        // Erfolgreiches Login
        setCurrentUser(benutzer);
        setError('');
        alert(`Willkommen, ${benutzer.benutzername}!`);  // Hier kannst du auch weiterleiten oder den Zustand ändern

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
                </form>
            )}
        </div>
    );
}

export default Login;
