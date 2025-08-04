import { useParams } from "react-router-dom";
import { useState } from "react";

function TextDetail({ texts, setTexts }) {
    const { id } = useParams();
    const text = texts.find((t) => t.id === parseInt(id));

    const [neuerAutor, setNeuerAutor] = useState("");
    const [neuerKommentar, setNeuerKommentar] = useState("");

    if (!text) return <div>Text nicht gefunden.</div>;

    const parsedDate = new Date(text.datum).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    const handleKommentarAbsenden = () => {
        if (neuerAutor.trim() === "" || neuerKommentar.trim() === "") return;
        const neuerEintrag = {
            id: text.kommentare.length + 1,
            autor: neuerAutor,
            inhalt: neuerKommentar
        };
        const updatedTexts = texts.map(t =>
            t.id === text.id
                ? { ...t, kommentare: [...t.kommentare, neuerEintrag] }
                : t
        );
        setTexts(updatedTexts);
        setNeuerAutor("");
        setNeuerKommentar("");
    };

    const handleDaumen = (typ) => {
        const updatedTexts = texts.map(t => {
            if (t.id === text.id) {
                return {
                    ...t,
                    daumenHoch: typ === "hoch" ? t.daumenHoch + 1 : t.daumenHoch,
                    daumenRunter: typ === "runter" ? t.daumenRunter + 1 : t.daumenRunter
                };
            }
            return t;
        });
        setTexts(updatedTexts);
    };

    return (
        <div style={{ padding: "40px 20px 30px", maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <img
                    src={text.bild}
                    alt={text.ueberschrift}
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "12px",
                    }}
                />
            </div>

            <div style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                padding: "24px",
                borderRadius: "12px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}>
                <h2>{text.ueberschrift}</h2>
                <p style={{ whiteSpace: "pre-wrap" }}>{text.text}</p>
                <p><strong>Bewertung:</strong> {text.bewertung || "Noch keine"}</p>
                <p><strong>Datum:</strong> {parsedDate}</p>

                <div style={{
                    fontSize: "16px",
                    marginTop: "12px",
                    display: "flex",
                    gap: "16px",
                    alignItems: "center"
                }}>
                    <span
                        onClick={() => handleDaumen("hoch")}
                        style={{ cursor: "pointer" }}
                        title="Gefällt mir"
                    >
                        👍 <span style={{ fontWeight: "bold" }}>{text.daumenHoch}</span>
                    </span>
                    <span
                        onClick={() => handleDaumen("runter")}
                        style={{ cursor: "pointer" }}
                        title="Gefällt mir nicht"
                    >
                        👎 <span style={{ fontWeight: "bold" }}>{text.daumenRunter}</span>
                    </span>
                </div>
            </div>

            <hr style={{ margin: "30px 0" }} />

            <div style={{
                backgroundColor: "#f7f7f7",
                padding: "20px",
                borderRadius: "12px"
            }}>
                <h3>Kommentare</h3>
                {text.kommentare.length === 0 ? (
                    <p>Noch keine Kommentare.</p>
                ) : (
                    text.kommentare.map(k => (
                        <div key={k.id} style={{
                            marginBottom: "12px",
                            padding: "12px",
                            backgroundColor: "#ffffff",
                            borderRadius: "8px",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                        }}>
                            <strong>{k.autor}</strong>
                            <p style={{ marginTop: "4px" }}>{k.inhalt}</p>
                        </div>
                    ))
                )}
            </div>

            <div style={{
                marginTop: "30px",
                padding: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                borderRadius: "12px",
                boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>
                <h3>Kommentar schreiben</h3>
                <input
                    type="text"
                    placeholder="Dein Nickname"
                    value={neuerAutor}
                    onChange={(e) => setNeuerAutor(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        backgroundColor: "#fff"
                    }}
                />
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
                        backgroundColor: "#fff"
                    }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
        </div>
    );
}

export default TextDetail;
