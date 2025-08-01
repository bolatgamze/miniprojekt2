import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ texts, setTexts }) {
    const [ausgewählteKategorie, setAusgewählteKategorie] = useState("Alle");
    const [suchbegriff, setSuchbegriff] = useState("");
    const [nurTopBewertet, setNurTopBewertet] = useState(false);
    const navigate = useNavigate();

    const kategorien = ["Alle", "Kategorie 1", "Kategorie 2", "Kategorie 3"];

    const gefilterteTexte = texts.filter((t) => {
        const kategorieMatch =
            ausgewählteKategorie === "Alle" || t.kategorie === ausgewählteKategorie;
        const titelMatch = t.ueberschrift
            .toLowerCase()
            .includes(suchbegriff.toLowerCase());
        const bewertungMatch =
            !nurTopBewertet || (parseInt(t.bewertung) >= 3 && t.bewertung !== "");
        return kategorieMatch && titelMatch && bewertungMatch;
    });

    const handleRatingClick = (id, neueBewertung) => {
        setTexts((prevTexts) =>
            prevTexts.map((t) =>
                t.id === id ? { ...t, bewertung: neueBewertung.toString() } : t
            )
        );
    };

    return (
        <div style={{ padding: "20px", color: "#fff" }}>
            {/* Arama ve filtre alanı */}
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    marginBottom: "30px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <input
                    type="text"
                    placeholder="Text suchen..."
                    value={suchbegriff}
                    onChange={(e) => setSuchbegriff(e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: "white",
                        minWidth: "200px",
                        backdropFilter: "blur(4px)",
                    }}
                />

                <select
                    value={ausgewählteKategorie}
                    onChange={(e) => setAusgewählteKategorie(e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: "white",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    {kategorien.map((k) => (
                        <option key={k} value={k} style={{ color: "#000" }}>
                            {k}
                        </option>
                    ))}
                </select>

                <label
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        padding: "10px",
                        borderRadius: "5px",
                        backdropFilter: "blur(4px)",
                    }}
                >
                    <input
                        type="checkbox"
                        checked={nurTopBewertet}
                        onChange={() => setNurTopBewertet((prev) => !prev)}
                    />
                    Nur top bewertet
                </label>
            </div>

            {/* Kartlar */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "20px",
                }}
            >
                {gefilterteTexte.map((t) => (
                    <div
                        key={t.id}
                        onClick={() => navigate(`/text/${t.id}`)}
                        style={{
                            width: "300px",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "12px",
                            padding: "20px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            transition: "transform 0.3s ease",
                            cursor: "pointer",
                            backdropFilter: "blur(6px)",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.03)")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                        }
                    >
                        <h3>{t.ueberschrift}</h3>
                        <p>{t.text}</p>
                        <p>
                            {[1, 2, 3].map((num) => (
                                <span
                                    key={num}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRatingClick(t.id, num);
                                    }}
                                    style={{
                                        cursor: "pointer",
                                        fontSize: "20px",
                                        color: parseInt(t.bewertung) >= num ? "#ffc107" : "#555",
                                    }}
                                >
                  {parseInt(t.bewertung) >= num ? "★" : "☆"}
                </span>
                            ))}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
