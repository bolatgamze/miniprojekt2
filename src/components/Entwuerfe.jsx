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
        <div style={{ padding: '2.5rem', fontFamily: 'sans-serif', minHeight:'790px' }}>
            <style>{`
        .draft-grid { display:flex; flex-wrap:wrap; gap:24px; justify-content:center; }
        .draft-card {
          width:320px; background:#fff; border-radius:10px;
          box-shadow:0 3px 8px rgba(0,0,0,0.1); overflow:hidden;
          transition: transform .2s, box-shadow .2s; cursor:pointer;
        }
        .draft-card:hover {
          transform: translateY(-6px);
          box-shadow:0 6px 16px rgba(0,0,0,0.15);
        }
        .draft-header { background:#f5f5f5; padding:10px 14px; font-size:.95rem; color:#333; }
        .draft-image { width:100%; height:180px; object-fit:cover; }
        .draft-content { padding:14px; }
        .draft-content h3 { margin:0 0 8px; font-size:1.3rem; color:#222; }
        .draft-content p { margin:0 0 10px; font-size:1rem; color:#555; line-height:1.4; }
        .draft-meta { font-style:italic; font-size:.9rem; color:#777; }
        .draft-btns { display:flex; flex-direction:column; gap:6px; margin-top:12px; }
        .draft-btn {
          padding:6px 12px; font-size:.9rem; border:none; border-radius:5px;
          background:#eee; color:#333; text-align:left; transition: background .2s;
        }
        .draft-btn:hover { background:#ddd; }
        .draft-btn.danger { background:#f8d7da; color:#721c24; }
        .draft-btn.danger:hover { background:#f5c6cb; }
      `}</style>

            <h2 style={{ marginBottom: '1.2rem', fontSize: '1.8rem' }}>Meine Entwürfe</h2>

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
