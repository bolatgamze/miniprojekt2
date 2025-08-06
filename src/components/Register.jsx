import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ benutzern, setBenutzern, setCurrentUser }) {
    const [benutzername, setBenutzername] = useState('');
    const [email, setEmail] = useState('');
    const [passwort, setPasswort] = useState('');
    const [profilbild, setProfilbild] = useState('');
    const [typ, setTyp] = useState('Katze');
    const [beigetretenAm] = useState(new Date().toISOString().split("T")[0]);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleImageChange = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfilbild(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        // --- Validierung ---
        if (!benutzername || !email || !passwort) {
            setError("Alle Felder sind erforderlich!");
            return;
        }
        if (benutzern.some(u => u.email === email || u.benutzername === benutzername)) {
            setError("Benutzername oder E-Mail existieren bereits!");
            return;
        }

        // --- Neuer Benutzer ---
        const defaultImg = typ === "Katze"
            ? "/profilbilder/defaultkatze.PNG"
            : "/profilbilder/defaulthund.PNG";

        const neuerBenutzer = {
            benutzername,
            status: 'user',
            email,
            // HIER: password statt passwort, damit Login funktioniert:
            password: passwort,
            profilbild: profilbild || defaultImg,
            typ,
            beigetretenAm,
            zuletztOnline: new Date().toISOString().split("T")[0],
            texte: [],
            textKommentare: [],
            entwuerfe: {},
            merkliste: []
        };

        // --- Zustand updaten und automatisch einloggen ---
        setBenutzern(prev => [...prev, neuerBenutzer]);
        setCurrentUser(neuerBenutzer);
        navigate("/home");
    };

    return (
        <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
            <h2>Registriere dich als neuer Benutzer</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {error && <div style={{ color: 'red' }}>{error}</div>}

                <input
                    type="text"
                    placeholder="Benutzername"
                    value={benutzername}
                    onChange={e => setBenutzername(e.target.value)}
                    required
                    style={{ padding: '0.5rem', fontSize: '1rem' }}
                />

                <input
                    type="email"
                    placeholder="E-Mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ padding: '0.5rem', fontSize: '1rem' }}
                />

                <input
                    type="password"
                    placeholder="Passwort"
                    value={passwort}
                    onChange={e => setPasswort(e.target.value)}
                    required
                    style={{ padding: '0.5rem', fontSize: '1rem' }}
                />

                {profilbild && (
                    <img src={profilbild} alt="Vorschau" style={{ maxWidth: '200px', margin: '1rem 0' }} />
                )}

                <label>
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
                    style={{ padding: '0.5rem', fontSize: '1rem' }}
                >
                    <option value="Katze">Katze</option>
                    <option value="Hund">Hund</option>
                </select>

                <button type="submit" style={{ padding: '0.5rem', fontSize: '1rem', cursor: 'pointer' }}>
                    Registrieren
                </button>
            </form>
        </div>
    );
}

export default Register;
