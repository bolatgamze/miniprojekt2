import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function TextDetail({ texts, setTexts, benutzern, setBenutzern, currentUser, setCurrentUser }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const text = texts.find((t) => t.id === parseInt(id, 10));

    const [neuerKommentar, setNeuerKommentar] = useState("");

    if (!text) return <div>Text nicht gefunden.</div>;

    const parsedDate = new Date(text.datum).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    const handleKommentarAbsenden = () => {
        if (!currentUser || !["admin", "user"].includes(currentUser.status)) return;
        if (neuerKommentar.trim() === "") return;

        const neuerEintrag = {
            id: text.kommentare.length + 1,
            autor: currentUser.benutzername,
            inhalt: neuerKommentar
        };
        // In Texte einfügen
        setTexts(texts.map(t =>
            t.id === text.id
                ? { ...t, kommentare: [...t.kommentare, neuerEintrag] }
                : t
        ));
        // In currentUser und benutzern speichern
        const neuerUserKommentar = { textId: text.id, inhalt: neuerKommentar };
        const updatedCurrent = {
            ...currentUser,
            textKommentare: [...(currentUser.textKommentare || []), neuerUserKommentar]
        };
        setCurrentUser(updatedCurrent);
        setBenutzern(benutzern.map(u =>
            u.benutzername === updatedCurrent.benutzername
                ? { ...u, textKommentare: updatedCurrent.textKommentare }
                : u
        ));
        setNeuerKommentar("");
    };

    const handleKommentarLoeschen = (kommentarId) => {
        setTexts(texts.map(t => {
            if (t.id !== text.id) return t;
            return {
                ...t,
                kommentare: t.kommentare.filter(k => k.id !== kommentarId)
            };
        }));
    };

    const handleDaumen = (typ) => {
        setTexts(texts.map(t => {
            if (t.id !== text.id) return t;
            return {
                ...t,
                daumenHoch: typ === "hoch" ? t.daumenHoch + 1 : t.daumenHoch,
                daumenRunter: typ === "runter" ? t.daumenRunter + 1 : t.daumenRunter
            };
        }));
    };

    const handleTextLoeschen = () => {
        setTexts(texts.filter(t => t.id !== text.id));
        setBenutzern(benutzern.map(u =>
            u.benutzername === text.autor && Array.isArray(u.texte)
                ? { ...u, texte: u.texte.filter(tid => tid !== text.id) }
                : u
        ));
        if (currentUser?.texte) {
            setCurrentUser({
                ...currentUser,
                texte: currentUser.texte.filter(tid => tid !== text.id)
            });
        }
        navigate("/home");
    };

    return (
        <div style={{ padding: "40px 20px 30px", maxWidth: "800px", margin: "0 auto" }}>
            {/* Bild */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <img
                    src={text.bild}
                    alt={text.ueberschrift}
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        objectFit: "cover",
                        borderRadius: "12px",
                    }}
                />
            </div>

            {/* Hauptinhalt */}
            <div style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}>
                <h2>{text.ueberschrift}</h2>
                <p style={{ whiteSpace: "pre-wrap" }}>{text.text}</p>
                <p><strong>Autor:</strong> {text.autor}</p>
                <p><strong>Datum:</strong> {parsedDate}</p>

                <div style={{
                    fontSize: "16px",
                    marginTop: "12px",
                    display: "flex",
                    gap: "16px",
                    alignItems: "center"
                }}>
          <span onClick={() => handleDaumen("hoch")} style={{ cursor: "pointer" }} title="Gefällt mir">
            👍 <strong>{text.daumenHoch}</strong>
          </span>
                    <span onClick={() => handleDaumen("runter")} style={{ cursor: "pointer" }} title="Gefällt mir nicht">
            👎 <strong>{text.daumenRunter}</strong>
          </span>
                </div>

                {currentUser?.status === "admin" && (
                    <div style={{ marginTop: "30px", textAlign: "right" }}>
                        <button
                            onClick={handleTextLoeschen}
                            style={{
                                padding: "10px 16px",
                                borderRadius: "8px",
                                backgroundColor: "#e63946",
                                border: "none",
                                color: "#fff",
                                cursor: "pointer",
                                fontSize: "14px"
                            }}
                        >
                            Text löschen
                        </button>
                    </div>
                )}
            </div>

            <hr style={{ margin: "30px 0" }} />

            {/* Kommentare */}
            <div style={{
                backgroundColor: "#f7f7f7",
                padding: "20px",
                borderRadius: "12px"
            }}>
                <h3>Kommentare</h3>
                {text.kommentare.length === 0
                    ? <p>Noch keine Kommentare.</p>
                    : text.kommentare.map(k => {
                        const user = benutzern.find(u => u.benutzername === k.autor) || {};
                        return (
                            <div key={k.id} style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "12px",
                                marginBottom: "12px",
                                padding: "12px",
                                backgroundColor: "#fff",
                                borderRadius: "8px",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                            }}>
                                <img
                                    src={user.profilbild}
                                    alt={k.autor}
                                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                />
                                <div style={{ flex: 1 }}>
                                    <strong>{k.autor}</strong>
                                    <p style={{ margin: "4px 0 0" }}>{k.inhalt}</p>
                                </div>
                                {currentUser?.status === "admin" && (
                                    <button
                                        onClick={() => handleKommentarLoeschen(k.id)}
                                        style={{
                                            position: "absolute",
                                            bottom: "8px",
                                            right: "8px",
                                            backgroundColor: "#e63946",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "4px",
                                            padding: "4px 8px",
                                            cursor: "pointer",
                                            fontSize: "12px"
                                        }}
                                    >
                                        Löschen
                                    </button>
                                )}
                            </div>
                        );
                    })
                }
            </div>

            {/* Kommentar-Formular nur für angemeldete User */}
            {currentUser && ["admin", "user"].includes(currentUser.status) && (
                <div style={{
                    marginTop: "30px",
                    padding: "20px",
                    backgroundColor: "rgba(255,255,255,0.85)",
                    borderRadius: "12px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.05)"
                }}>
                    <h3>Kommentar schreiben</h3>
                    <textarea
                        placeholder="Schreib einen Kommentar..."
                        value={neuerKommentar}
                        onChange={(e) => setNeuerKommentar(e.target.value)}
                        rows="4"
                        style={{
                            width: "100%",
                            padding: "5px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            backgroundColor: "#fff",
                            color: "#000"
                        }}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                        <button
                            onClick={handleKommentarAbsenden}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "8px",
                                backgroundColor: "#f4a261",
                                border: "none",
                                color: "#fff",
                                cursor: "pointer",
                                fontSize: "14px"
                            }}
                        >
                            Absenden
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TextDetail;
