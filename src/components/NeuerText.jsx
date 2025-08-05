import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

function NeuerText({ texts, setTexts, entwuerfe, setEntwuerfe }) {
    const location = useLocation();
    const navigate = useNavigate();

    const existingPost = location.state?.existingPost;
    const isDraft = location.state?.isDraft;

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

    useEffect(() => {
        if (existingPost) {
            setUeberschrift(existingPost.ueberschrift);
            setKurzbeschreibung(existingPost.kurzbeschreibung);
            setText(existingPost.text);
            setKategorie(existingPost.kategorie);
            setBild(existingPost.bild);
            setDatum(existingPost.datum);
            setAutor(existingPost.autor);
        }
    }, [existingPost]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setBild(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedPost = {
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
            kommentare
        };

        if (isDraft) {
            // Entwurf wurde bearbeitet und veröffentlicht
            const neueTexte = [...texts, updatedPost];
            setTexts(neueTexte);
            localStorage.setItem("texts", JSON.stringify(neueTexte));

            const gefilterte = entwuerfe.filter(e => e.id !== updatedPost.id);
            setEntwuerfe(gefilterte);
            localStorage.setItem("entwuerfe", JSON.stringify(gefilterte));

            navigate("/home");
        } else {
            // Neuen Beitrag als Entwurf speichern
            const neueEntwuerfe = [...entwuerfe, updatedPost];
            setEntwuerfe(neueEntwuerfe);
            localStorage.setItem("entwuerfe", JSON.stringify(neueEntwuerfe));

            navigate("/entwuerfe");
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
                        accept="image/*"
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
                    max={new Date().toISOString().split("T")[0]}
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
                    <button type="submit">
                        {existingPost ? 'Änderungen speichern' : 'Als Entwurf speichern'}
                    </button>
                    {existingPost && (
                        <button type="button" onClick={() => navigate("/entwuerfe")}>
                            Abbrechen
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default NeuerText;
