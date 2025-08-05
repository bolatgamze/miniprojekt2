import React, { useState } from 'react';

function Register({ benutzern, setBenutzern }) {
    const [benutzername, setBenutzername] = useState('');
    const [email, setEmail] = useState('');
    const [passwort, setPasswort] = useState('');
    const [profilbild, setProfilbild] = useState('');
    const [typ, setTyp] = useState('Katze');
    const [beigetretenAm, setBeigetretenAm] = useState(new Date().toISOString().split("T")[0]);
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilbild(reader.result); // Bild wird als Base64-String gesetzt
            };
            reader.readAsDataURL(file); // Startet das Einlesen der Datei
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validierung
        if (!benutzername || !email || !passwort) {
            setError("Alle Felder sind erforderlich!");
            return;
        }

        // Prüfen, ob der Benutzername oder die E-Mail bereits existiert
        if (benutzern.some((user) => user.email === email || user.benutzername === benutzername)) {
            setError("Benutzername oder E-Mail existieren bereits!");
            return;
        }

        const defaultImg =
            typ === "Katze"
                ? "/profilbilder/defaultkatze.PNG"
                : "/profilbilder/defaulthund.PNG";

        // Erstellen des neuen Benutzers
        const neuerBenutzer = {
            benutzername,
            status: 'user', // Der Status eines neuen Benutzers ist standardmäßig "user"
            email,
            passwort, // Passwörter sollten normalerweise sicher gespeichert werden
            profilbild: profilbild || defaultImg,
            typ,
            beigetretenAm,
            zuletztOnline: new Date().toISOString().split("T")[0],
            texte: [],
            textKommentare: [],
            entwuerfe: {},
            merkliste: []
        };

        // Neuen Benutzer zum Zustand hinzufügen
        setBenutzern([...benutzern, neuerBenutzer]);

        // Felder zurücksetzen
        setBenutzername('');
        setEmail('');
        setPasswort('');
        setProfilbild('');
        setError('');
    };

    return (
        <div style={{ padding: "40px 20px 30px", maxWidth: "800px", margin: "0 auto" }}>
            <h2>Registriere dich als neuer Benutzer</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {error && <div style={{ color: 'red' }}>{error}</div>}

                <input
                    type="text"
                    placeholder="Benutzername"
                    value={benutzername}
                    onChange={(e) => setBenutzername(e.target.value)}
                    required
                    style={{ padding: '0.5rem', fontSize: '1rem' }}
                />

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

                {profilbild && (
                    <div>
                        <img src={profilbild} alt="Vorschau" style={{ maxWidth: '200px', marginTop: '1rem' }} />
                    </div>
                )}

                <div>
                    <span>Profilbild hochladen:</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ padding: '0.5rem', fontSize: '1rem' }}
                    />
                </div>

                <select
                    value={typ}
                    onChange={(e) => setTyp(e.target.value)}
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
