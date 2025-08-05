import React from 'react';
/*
für die zusammenheit wieder in Card Form texte in der Merkliste können wir hier kurz zeigen
titel, kurze beschreibung wie im homepage
 */

function MerkListe({ merkliste, setMerkliste, texts }) {
    const handleEntfernen = (eintrag) => {
        setMerkliste(merkliste.filter(m => m !== eintrag));
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2 style={{ marginBottom: "1.5rem" }}>⭐ Gemerkte Texte</h2>

            {merkliste.length === 0 ? (
                <p>Du hast noch keine Texte gemerkt.</p>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
                    {merkliste
                        .map(id => texts.find(t => t.id === id))
                        .filter(Boolean)
                        .map((t, index) => (
                        <div key={index} style={cardStyle}>
                            <div style={headerStyle}>
                                <span>{new Date(t.datum).toLocaleDateString('de-DE')}</span>
                                <button onClick={() => handleEntfernen(t)} style={starBtnStyle}>✖️</button>
                            </div>

                            <img src={t.bild} alt={t.ueberschrift} style={imageStyle} />

                            <div style={contentStyle}>
                                <h3>{t.ueberschrift}</h3>
                                <p style={{ fontSize: "0.9rem" }}>{t.kurzbeschreibung}</p>
                                <p style={{ marginTop: "0.5rem", fontStyle: "italic" }}>
                                    {t.kategorie} – {t.autor}
                                </p>
                                <div style={voteStyle}>
                                    <span>👍 {t.daumenHoch}</span>
                                    <span>👎 {t.daumenRunter}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// 🎨 Styles
const cardStyle = {
    width: "260px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    overflow: "hidden"
};

const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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

const starBtnStyle = {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "1.1rem"
};

const voteStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "0.5rem",
    fontSize: "1.1rem"
};

export default MerkListe;
