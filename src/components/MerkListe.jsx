import React from 'react';

/* Styles */
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

function MerkListe({ merkliste, setMerkliste, currentUser, texts }) {
    const profileBookmarks = Array.isArray(currentUser.merkliste)
        ? currentUser.merkliste
        : [];

    const sessionBookmarks = Array.isArray(merkliste)
        ? merkliste.map(item =>
            typeof item === "object" && item !== null
                ? item.id
                : item
        )
        : [];

    const allBookmarkIds = Array.from(
        new Set([...profileBookmarks, ...sessionBookmarks])
    );

    const bookmarkedTexts = texts.filter(t =>
        allBookmarkIds.includes(t.id)
    );

    const handleEntfernen = (id) => {
        setMerkliste(prev =>
            prev
                .map(item =>
                    typeof item === "object" && item !== null ? item.id : item
                )
                .filter(tid => tid !== id)
        );
    };
    return (

        <div style={{ padding: "2rem", minHeight:'790px' }}>
            <h2 style={{ marginBottom: "1.5rem" }}> Gemerkte Texte</h2>

            {bookmarkedTexts.length === 0 ? (
                <p>Du hast noch keine Texte gemerkt.</p>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
                    {bookmarkedTexts.map(text => (
                        <div key={text.id} style={cardStyle}>
                            <div style={headerStyle}>
                                <span>{new Date(text.datum).toLocaleDateString('de-DE')}</span>
                                <button
                                    onClick={() => handleEntfernen(text.id)}
                                    style={starBtnStyle}
                                >
                                    ✖️
                                </button>
                            </div>

                            {text.bild && (
                                <img
                                    src={text.bild}
                                    alt={text.ueberschrift}
                                    style={imageStyle}
                                />
                            )}

                            <div style={contentStyle}>
                                <h3>{text.ueberschrift}</h3>
                                <p style={{ fontSize: "0.9rem" }}>
                                    {text.kurzbeschreibung}
                                </p>
                                <p style={{ marginTop: "0.5rem", fontStyle: "italic" }}>
                                    {text.kategorie} – {text.autor}
                                </p>
                                <div style={voteStyle}>
                                    <span>👍 {text.daumenHoch}</span>
                                    <span>👎 {text.daumenRunter}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MerkListe;
