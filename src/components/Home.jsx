import {useState} from "react";
import {useNavigate} from "react-router-dom";

/*
hier liste ich die texte nach datum oder autor
aber ich habe den Texts einfach random daumenhoch und runter zahlen gegeben ich will auch danach listen können
also 2-3 funktionen fehlen hier noch
z.B. um merkliste hinzufügen muss ich stern funktion schreiben
 */

function Home({texts, setTexts}) {
    const [ausgewählteKategorie, setAusgewählteKategorie] = useState("Alle");
    const [ausgewählterAutor, setAusgewählterAutor] = useState("Alle");
    const [suchbegriff, setSuchbegriff] = useState("");
    const [nurTopBewertet, setNurTopBewertet] = useState(false);
    const [sortOption, setSortOption] = useState("DatumNeu");
    const [seite, setSeite] = useState(1);

    const navigate = useNavigate();

    const kategorien = ["Alle", "Fotografie", "Reflexion", "Gesundheit", "Abenteuer"];
    const autoren = ["Alle", "Loki", "Gandalf", "Simba", "Rufus"];

    let gefilterteTexte = texts.filter((t) => {
        const kategorieMatch = ausgewählteKategorie === "Alle" || t.kategorie === ausgewählteKategorie;
        const autorMatch = ausgewählterAutor === "Alle" || t.autor === ausgewählterAutor;
        const titelMatch = t.ueberschrift.toLowerCase().includes(suchbegriff.toLowerCase());
        const bewertungMatch = !nurTopBewertet || (parseInt(t.bewertung) >= 3);
        return kategorieMatch && titelMatch && bewertungMatch && autorMatch;
    });

    gefilterteTexte = gefilterteTexte.sort((a, b) => {
        switch (sortOption) {
            case "DatumNeu":
                return new Date(b.datum) - new Date(a.datum);
            case "DatumAlt":
                return new Date(a.datum) - new Date(b.datum);
            case "AutorAZ":
                return a.autor.localeCompare(b.autor);
            case "AutorZA":
                return b.autor.localeCompare(a.autor);
            default:
                return 0;
        }
    });

    const itemsPerPage = 8;
    const totalPages = Math.ceil(gefilterteTexte.length / itemsPerPage);
    const startIndex = (seite - 1) * itemsPerPage;
    const aktuelleTexte = gefilterteTexte.slice(startIndex, startIndex + itemsPerPage);

    const handleRatingClick = (id, neueBewertung) => {
        setTexts((prevTexts) =>
            prevTexts.map((t) =>
                t.id === id ? {...t, bewertung: neueBewertung.toString()} : t
            )
        );
    };

    return (
        <div style={{padding: "20px", color: "#1a1a1a"}}>
            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                    marginBottom: "20px",
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
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                        color: "#333",
                        minWidth: "200px",
                        fontSize: "1rem",
                    }}
                />

                <select value={ausgewählteKategorie} onChange={(e) => setAusgewählteKategorie(e.target.value)}
                        style={selectStyle}>
                    {kategorien.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>

                <select value={ausgewählterAutor} onChange={(e) => setAusgewählterAutor(e.target.value)}
                        style={selectStyle}>
                    {autoren.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>

                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} style={selectStyle}>
                    <option value="DatumNeu">Neueste zuerst</option>
                    <option value="DatumAlt">Älteste zuerst</option>
                    <option value="AutorAZ">Autor A-Z</option>
                    <option value="AutorZA">Autor Z-A</option>
                </select>

                <label style={checkboxLabelStyle}>
                    <input
                        type="checkbox"
                        checked={nurTopBewertet}
                        onChange={() => setNurTopBewertet((prev) => !prev)}
                    />
                    Nur top bewertet
                </label>
            </div>

            <p style={{textAlign: "center", marginBottom: "25px", fontSize: "1rem", fontStyle: "italic"}}>
                Zeige <strong>{ausgewählteKategorie}</strong> Texte von <strong>{ausgewählterAutor}</strong>, sortiert
                nach <strong>{sortOption}</strong>.
            </p>

            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px"}}>
                {aktuelleTexte.map((t) => (
                    <div
                        key={t.id}
                        onClick={() => navigate(`/text/${t.id}`)}
                        style={cardStyle}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
                        <img
                            src={t.bild}
                            alt={t.ueberschrift}
                            style={{
                                width: "100%",
                                height: "180px",
                                objectFit: "cover",
                                borderRadius: "8px 8px 0 0"
                            }}/>
                        <div style={{padding: "16px"}}>
                            <h3>{t.ueberschrift}</h3>
                            <p style={{fontSize: "0.9rem", minHeight: "60px"}}>
                                {t.kurzbeschreibung}
                            </p>
                            <div style={{marginTop: "1em"}}>
                             <span
                                 onClick={e => {
                                     e.stopPropagation();
                                     handleRatingClick(t.id, 1);
                                 }}
                                 style={{
                                     cursor: "pointer",
                                     fontSize: "22px",
                                     color: parseInt(t.bewertung, 10) >= 1 ? "#ffb703" : "#ccc",
                                     transition: "color 0.2s ease",
                                 }}
                             >
      {parseInt(t.bewertung, 10) >= 1 ? "★" : "☆"}
    </span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            <div style={{marginTop: "30px", textAlign: "center"}}>
                {seite > 1 && <button onClick={() => setSeite(seite - 1)}>Zurück</button>}
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setSeite(i + 1)}
                        style={{margin: "0 6px", fontWeight: seite === i + 1 ? "bold" : "normal"}}
                    >
                        {i + 1}
                    </button>
                ))}
                {seite < totalPages && <button onClick={() => setSeite(seite + 1)}>Weiter</button>}
            </div>
        </div>
    );
}

const selectStyle = {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    backgroundColor: "#ffffff",
    color: "#333",
    fontSize: "1rem",
};

const checkboxLabelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#ffffff",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "0.95rem",
    color: "#333",
};

const cardStyle = {
    width: "280px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#ffffff",
    color: "#1a1a1a",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    overflow: "hidden",
};

export default Home;
