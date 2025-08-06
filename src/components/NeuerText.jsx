import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function NeuerText({ onSave, onPublish }) {
    const [ueberschrift, setUeberschrift] = useState('');
    const [kurzbeschreibung, setKurzbeschreibung] = useState('');
    const [text, setText] = useState('');
    const [kategorie, setKategorie] = useState('');
    const [bild, setBild] = useState(null);
    const [datum, setDatum] = useState(new Date().toISOString().split("T")[0]);
    const [daumenHoch, setDaumenHoch] = useState(0);
    const [daumenRunter, setDaumenRunter] = useState(0);
    const [autor, setAutor] = useState('');
    const [kommentare, setKommentare] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const existingPost = location.state?.existingPost || null;

// ✅ Hier kommt Punkt 3 rein
    const buildPostObject = () => ({
        id: existingPost?.id || Date.now(),
        ueberschrift,
        kurzbeschreibung,
        text,
        kategorie,
        bild,
        datum,
        daumenHoch,
        daumenRunter,
        autor,
        kommentare,
    });

// ✅ Hier kommt Punkt 4 rein
    const handleSave = () => {
        const newPost = buildPostObject();
        onSave(newPost);
        navigate("/entwuerfe");
    };

    const handlePublish = () => {
        const newPost = buildPostObject();
        onPublish(newPost);
        navigate("/home");
    };

    const handleCancel = () => {
        navigate("/entwuerfe");
    };




    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Das erste ausgewählte Bild
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBild(reader.result); // Bild wird als Base64-String gesetzt
            };
            reader.readAsDataURL(file); // Startet das Einlesen der Datei
        }
    };

    useEffect(() => {
        if (existingPost) {
            setUeberschrift(existingPost.ueberschrift);
            setKurzbeschreibung(existingPost.kurzbeschreibung);
            setText(existingPost.text);
            setKategorie(existingPost.kategorie);
            setBild(existingPost.bild); // Bild aus existingPost laden
            setDatum(existingPost.datum);
            setAutor(existingPost.autor);
        }
    }, [existingPost]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedPost = {
            id: existingPost?.id || Date.now(),
            ueberschrift,
            kurzbeschreibung,
            text,
            kategorie,
            bild,  // Bild wird als Teil des Textobjekts gespeichert
            datum,
            daumenHoch,
            daumenRunter,
            autor,
            kommentare
        };

        onSave(updatedPost); // Speichern der gesamten Textdaten, inklusive Bild

        // Felder zurücksetzen
        if (!existingPost) {
            setUeberschrift('');
            setKurzbeschreibung('');
            setText('');
            setKategorie('');
            setBild(null);  // Zurücksetzen des Bildes
            setDatum(new Date().toISOString().split("T")[0]);
            setDaumenHoch(0);
            setDaumenRunter(0);
            setAutor('');
            setKommentare([]);
        }
    };

    return (
        <div style={{ padding: "40px 20px 30px", maxWidth: "800px", margin: "0 auto" }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                <input
                    placeholder="Überschrift"
                    value={ueberschrift}
                    onChange={(e) => setUeberschrift(e.target.value)}
                    required
                    style={{ padding: '0.5rem', fontSize: '1rem' }}
                />

                <textarea
                    placeholder="Kurzbeschreibung"
                    value={kurzbeschreibung}
                    onChange={(e) => setKurzbeschreibung(e.target.value)}
                    style={{ padding: '0.5rem', fontSize: '1rem', resize: 'vertical' }}
                />

                <textarea
                    placeholder="Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ padding: '0.5rem', fontSize: '1rem', height: '250px', resize: 'vertical' }}
                />

                <select
                    value={kategorie}
                    onChange={(e) => setKategorie(e.target.value)}
                    required
                    style={{ padding: '0.5rem', fontSize: '1rem' }}
                >
                    <option value="">Kategorie wählen</option>
                    <option value="Fotografie">Fotografie</option>
                    <option value="Reflexion">Reflexion</option>
                    <option value="Gesundheit">Gesundheit</option>
                    <option value="Abenteuer">Abenteuer</option>
                </select>

                {bild && (
                    <div>
                        <img src={bild} alt="Vorschau" style={{ maxWidth: '200px', marginTop: '1rem' }} />
                    </div>
                )}

                <div>
                    <span>Bild hochladen:</span>
                    <input
                        type="file"
                        accept="image/*" // Nur Bilddateien zulassen
                        onChange={handleImageChange}
                        style={{ padding: '0.5rem', fontSize: '1rem' }}
                    />
                </div>

                <input
                    type="date"
                    value={datum}
                    onChange={(e) => setDatum(e.target.value)}
                    required
                    style={{ padding: '0.5rem', fontSize: '1rem' }}
                    max={new Date().toISOString().split("T")[0]} // optional: verhindert, dass der Benutzer in die Zukunft wählt
                />

                <select
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    required
                    style={{ padding: '0.5rem', fontSize: '1rem' }}
                >
                    <option value="">Autor wählen</option>
                    <option value="Rufus">Rufus</option>
                    <option value="Loki">Loki</option>
                    <option value="Gandalf">Gandalf</option>
                    <option value="Simba">Simba</option>
                </select>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                    {existingPost ? (
                        <>
                            <button type="button" onClick={handleSave}>💾 Änderungen speichern</button>
                            <button type="button" onClick={handlePublish}>🚀 Veröffentlichen</button>
                            <button type="button" onClick={handleCancel}>❌ Abbrechen</button>
                        </>
                    ) : (
                        <>
                            <button type="button" onClick={handleSave}>💾 Als Entwurf speichern</button>
                            <button type="button" onClick={handlePublish}>🚀 Veröffentlichen</button>
                        </>
                    )}
                </div>


            </form>
        </div>
    );
}

export default NeuerText;
