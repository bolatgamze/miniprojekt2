import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function NeuerText({ currentUser, onSave, onPublish }) {
    const [ueberschrift, setUeberschrift] = useState('');
    const [kurzbeschreibung, setKurzbeschreibung] = useState('');
    const [text, setText] = useState('');
    const [kategorie, setKategorie] = useState('');
    const [bild, setBild] = useState(null);
    const [datum, setDatum] = useState(new Date().toISOString().split("T")[0]);
    const [autor, setAutor] = useState(currentUser?.benutzername || '');
    const [daumenHoch] = useState(0);
    const [daumenRunter] = useState(0);
    const [kommentare] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const existingPost = location.state?.existingPost || null;

    useEffect(() => {
        if (existingPost) {
            setUeberschrift(existingPost.ueberschrift);
            setKurzbeschreibung(existingPost.kurzbeschreibung);
            setText(existingPost.text);
            setKategorie(existingPost.kategorie);
            setBild(existingPost.bild);
            setDatum(existingPost.datum);
            setAutor(existingPost.autor);
        } else {
            setAutor(currentUser?.benutzername || '');
        }
    }, [existingPost, currentUser]);

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

    const handleSave = () => {
        onSave(buildPostObject());
        navigate("/entwuerfe");
    };

    const handlePublish = () => {
        onPublish(buildPostObject());
        navigate("/home");
    };

    const handleCancel = () => navigate("/entwuerfe");

    const handleImageChange = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setBild(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Gemeinsame Styles fürs Formular
    const formContainer = {
        backgroundColor: "rgba(255,255,255,0.85)",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.05)",
        maxWidth: "800px",
        margin: "40px auto"
    };
    const fieldStyle = {
        width: "100%",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "1rem",
        boxSizing: "border-box"
    };
    const textareaStyle = {
        ...fieldStyle,
        resize: "vertical"
    };
    const buttonStyle = {
        padding: "8px 16px",
        borderRadius: "8px",
        backgroundColor: "#f4a261",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        fontSize: "14px"
    };

    return (
        <div style={formContainer}>
            <h3>{existingPost ? "Beitrag bearbeiten" : "Neuen Beitrag erstellen"}</h3>
            <input
                style={fieldStyle}
                placeholder="Überschrift"
                value={ueberschrift}
                onChange={e => setUeberschrift(e.target.value)}
                required
            />
            <textarea
                style={{ ...textareaStyle, height: '60px' }}
                placeholder="Kurzbeschreibung"
                value={kurzbeschreibung}
                onChange={e => setKurzbeschreibung(e.target.value)}
            />
            <textarea
                style={{ ...textareaStyle, height: '150px' }}
                placeholder="Text"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <select
                style={fieldStyle}
                value={kategorie}
                onChange={e => setKategorie(e.target.value)}
                required
            >
                <option value="">Kategorie wählen</option>
                <option value="Fotografie">Fotografie</option>
                <option value="Reflexion">Reflexion</option>
                <option value="Gesundheit">Gesundheit</option>
                <option value="Abenteuer">Abenteuer</option>
            </select>
            {bild && <img src={bild} alt="Vorschau" style={{ maxWidth: '200px', margin: '10px 0' }} />}
            <input type="file" onChange={handleImageChange} style={fieldStyle} />
            <input
                type="date"
                style={fieldStyle}
                value={datum}
                onChange={e => setDatum(e.target.value)}
                required
                max={new Date().toISOString().split("T")[0]}
            />
            <input
                type="text"
                style={{ ...fieldStyle, backgroundColor: '#f0f0f0' }}
                value={autor}
                readOnly
            />

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
                {existingPost ? (
                    <>
                        <button style={buttonStyle} onClick={handleSave}>Speichern</button>
                        <button style={buttonStyle} onClick={handlePublish}>Veröffentlichen</button>
                        <button style={buttonStyle} onClick={handleCancel}>Abbrechen</button>
                    </>
                ) : (
                    <>
                        <button style={buttonStyle} onClick={handleSave}>Als Entwurf</button>
                        <button style={buttonStyle} onClick={handlePublish}>Veröffentlichen</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default NeuerText;
