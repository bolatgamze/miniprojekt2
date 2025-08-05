import React from 'react';
import { useNavigate } from "react-router-dom";

// Als Admin kann man hier seine eigenen Entwürfe sehen und posten.
// Im Card-Form-Design kann man die Liste sehen, rechts mit Buttons für Bearbeiten, Veröffentlichen und Löschen

function Entwuerfe({ entwuerfe, setEntwuerfe, texts, setTexts }) {
    const navigate = useNavigate();

    const handleLoeschen = (eintrag) => {
        if (window.confirm("Möchtest du diesen Entwurf wirklich löschen?")) {
            const neueEntwuerfe = entwuerfe.filter(e => e.id !== eintrag.id);
            setEntwuerfe(neueEntwuerfe);
        }
    };

    const handleBearbeiten = (eintrag) => {
        navigate("/neuerText", {
            state: {
                existingPost: eintrag,
                isDraft: true
            }
        });
    };

    const handleVeroeffentlichen = (eintrag) => {
        if (window.confirm("Diesen Entwurf veröffentlichen?")) {
            // Navigiere zum Formular mit Veröffentlichung
            navigate("/neuerText", {
                state: {
                    existingPost: eintrag,
                    isDraft: true
                }
            });
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>📄 Meine Entwürfe</h2>

            {entwuerfe.length === 0 ? (
                <p>Du hast noch keine Entwürfe gespeichert.</p>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
                    {entwuerfe.map((e, index) => (
                        <div key={index} style={cardStyle}>
                            <div style={headerStyle}>
                                <span>{e.datum ? new Date(e.datum).toLocaleDateString("de-DE") : "Kein Datum"}</span>
                            </div>

                            {e.bild && (
                                <img src={e.bild} alt={e.ueberschrift} style={imageStyle} />
                            )}

                            <div style={contentStyle}>
                                <h3>{e.ueberschrift || "Ohne Titel"}</h3>
                                <p>{e.kurzbeschreibung || "Keine Kurzbeschreibung"}</p>
                                <p style={{ fontStyle: "italic" }}>{e.kategorie} – {e.autor}</p>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                                    <button onClick={() => handleBearbeiten(e)}>📝 Bearbeiten</button>
                                    <button onClick={() => handleVeroeffentlichen(e)}>✅ Veröffentlichen</button>
                                    <button onClick={() => handleLoeschen(e)}>🗑️ Löschen</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Styles
const cardStyle = {
    width: "260px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    overflow: "hidden"
};

const headerStyle = {
    padding: "8px 12px",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ddd"
};

const imageStyle = {
    width: "100%",
    height: "160px",
    objectFit: "cover"
};

const contentStyle = {
    padding: "12px"
};

export default Entwuerfe;
