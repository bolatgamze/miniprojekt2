import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ benutzern, setBenutzern, setCurrentUser }) {
    const [benutzername, setBenutzername] = useState('');
    const [email, setEmail] = useState('');
    const [passwort, setPasswort] = useState('');
    const [profilbild, setProfilbild] = useState('');
    const [typ, setTyp] = useState('Katze');
    const beigetretenAm = new Date().toISOString().split("T")[0];
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleImageChange = e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setProfilbild(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Validierung
        if (!benutzername || !email || !passwort) {
            setError("Alle Felder sind erforderlich!");
            return;
        }
        if (benutzern.some(u => u.email === email || u.benutzername === benutzername)) {
            setError("Benutzername oder E-Mail existieren bereits!");
            return;
        }
        // Neuer Benutzer
        const defaultImg = typ === "Katze"
            ? "/profilbilder/defaultkatze.PNG"
            : "/profilbilder/defaulthund.PNG";
        const neuerBenutzer = {
            benutzername,
            status: 'user',
            email,
            password: passwort,
            profilbild: profilbild || defaultImg,
            typ,
            beigetretenAm,
            zuletztOnline: new Date().toISOString(),
            texte: [],
            textKommentare: [],
            entwuerfe: {},
            merkliste: []
        };
        // Zustand & Auto-Login
        setBenutzern(prev => [...prev, neuerBenutzer]);
        setCurrentUser(neuerBenutzer);
        navigate("/home");
    };

    // Styles analog zu NeuerText/Login
    const container = {
        backgroundColor: 'rgba(255,255,255,0.85)',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
        maxWidth: '500px',
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
    const labelStyle = { fontSize: '0.9rem', color: '#333' };

    return (
        <div style={container}>
            <h2>Registriere dich</h2>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Benutzername"
                    value={benutzername}
                    onChange={e => setBenutzername(e.target.value)}
                    required
                    style={fieldStyle}
                />
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
                {profilbild && (
                    <img
                        src={profilbild}
                        alt="Vorschau"
                        style={{ maxWidth: '200px', margin: '0.5rem 0', borderRadius: '8px' }}
                    />
                )}
                <label style={labelStyle}>
                    Profilbild hochladen:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'block', marginTop: '0.5rem' }}
                    />
                </label>
                <select
                    value={typ}
                    onChange={e => setTyp(e.target.value)}
                    style={fieldStyle}
                >
                    <option value="Katze">Katze</option>
                    <option value="Hund">Hund</option>
                </select>
                <button type="submit" style={buttonStyle}>
                    Registrieren
                </button>
            </form>
        </div>
    );
}

export default Register;
