import React from 'react';
import { useNavigate } from "react-router-dom";

function Entwuerfe({ entwuerfe, setEntwuerfe, texts, setTexts, currentUser }) {
    const navigate = useNavigate();

    const profileDrafts = Array.isArray(currentUser.entwuerfe) ? currentUser.entwuerfe : [];
    const sessionDrafts = Array.isArray(entwuerfe) ? entwuerfe : [];
    const allDrafts = Array.from(
        new Map(
            [...profileDrafts, ...sessionDrafts].map(d => [d.id, d])
        ).values()
    );

    const handleLoeschen = (entwurf) => {
        if (window.confirm("Möchtest du diesen Entwurf wirklich löschen?")) {
            setEntwuerfe(prev => prev.filter(d => d.id !== entwurf.id));
        }
    };

    const handleBearbeiten = (entwurf) => {
        navigate("/neuerText", { state: { existingPost: entwurf } });
    };

    const handleVeroeffentlichen = (entwurf) => {
        if (window.confirm("Diesen Entwurf veröffentlichen?")) {
            setTexts(prev => [...prev, entwurf]);
            setEntwuerfe(prev => prev.filter(d => d.id !== entwurf.id));
        }
    };

    return (
        <div style={{ padding: "2rem", minHeight:'790px' }}>
            <h2>📄 Meine Entwürfe</h2>

            {allDrafts.length === 0 ? (
                <p>Du hast noch keine Entwürfe gespeichert.</p>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
                    {allDrafts.map(e => (
                        <div key={e.id} style={cardStyle}>
                            <div style={headerStyle}>
                <span>
                  {e.datum
                      ? new Date(e.datum).toLocaleDateString("de-DE")
                      : "Kein Datum"}
                </span>
                            </div>

                            {e.bild && (
                                <img src={e.bild} alt={e.ueberschrift} style={imageStyle} />
                            )}

                            <div style={contentStyle}>
                                <h3>{e.ueberschrift || "Ohne Titel"}</h3>
                                <p>{e.kurzbeschreibung || "Keine Kurzbeschreibung"}</p>
                                <p style={{ fontStyle: "italic" }}>
                                    {e.kategorie} – {e.autor}
                                </p>

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
