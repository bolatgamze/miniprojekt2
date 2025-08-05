import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

/*
  Home-Komponente: Liste mit Filtern, Sortieroptionen und Karten.
  Auf jeder Karte: Oben eine weiße Leiste mit Datum links und einem Stern rechts.
  Der Stern startet leer, lässt sich anklicken, wird dann gelb gefüllt und etwas größer.
  Funktionalität bleibt lokal (keine Merkliste in benutzern). Bildklick navigiert zur Detailseite.
*/

function Home({ texts, setTexts, benutzern, setBenutzern, currentUser, merkliste, setMerkliste }) {
    const [ausgewählteKategorie, setAusgewählteKategorie] = useState("Alle");
    const [ausgewählterAutor, setAusgewählterAutor] = useState("Alle");
    const [suchbegriff, setSuchbegriff] = useState("");
    const [sortOption, setSortOption] = useState("DatumNeu");
    const [seite, setSeite] = useState(1);
    // Lokaler State für Stern-Status pro Text-ID

    const navigate = useNavigate();

    const kategorien = ["Alle", "Fotografie", "Reflexion", "Gesundheit", "Abenteuer"];
    const autoren = ["Alle", "Loki", "Gandalf", "Simba", "Rufus"];
    const istGemerkterText = (text) => {
        return merkliste.includes(text);
    };

    const toggleMerken = (e, text) => {
        e.stopPropagation()
        if (istGemerkterText(text)) {
            setMerkliste(merkliste.filter(t => t !== text));
        } else {
            setMerkliste([...merkliste, text]);
        }
    };


    // Filter
    let gefilterteTexte = texts.filter(t => {
        const katMatch = ausgewählteKategorie === "Alle" || t.kategorie === ausgewählteKategorie;
        const authMatch = ausgewählterAutor === "Alle" || t.autor === ausgewählterAutor;
        const titelMatch = t.ueberschrift.toLowerCase().includes(suchbegriff.toLowerCase());
        return katMatch && authMatch && titelMatch;
    });

    // Sortierung
    gefilterteTexte.sort((a, b) => {
        switch (sortOption) {
            case "DatumNeu": return new Date(b.datum) - new Date(a.datum);
            case "DatumAlt": return new Date(a.datum) - new Date(b.datum);
            case "AutorAZ": return a.autor.localeCompare(b.autor);
            case "AutorZA": return b.autor.localeCompare(a.autor);
            case "AmBeliebtesten": return b.daumenHoch - a.daumenHoch;
            case "AmMeistenBewertet": return (b.daumenHoch + b.daumenRunter) - (a.daumenHoch + a.daumenRunter);
            default: return 0;
        }
    });

    const itemsPerPage = 8;
    const totalPages = Math.ceil(gefilterteTexte.length / itemsPerPage);
    const startIndex = (seite - 1) * itemsPerPage;
    const aktuelleTexte = gefilterteTexte.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div style={{ padding: "20px", color: "#1a1a1a" }}>
            {/* Filterleiste */}
            <div style={filterBarStyle}>
                <input
                    type="text"
                    placeholder="Text suchen..."
                    value={suchbegriff}
                    onChange={e => setSuchbegriff(e.target.value)}
                    style={inputStyle}
                />
                <select value={ausgewählteKategorie} onChange={e => setAusgewählteKategorie(e.target.value)} style={selectStyle}>
                    {kategorien.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
                <select value={ausgewählterAutor} onChange={e => setAusgewählterAutor(e.target.value)} style={selectStyle}>
                    {autoren.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <select value={sortOption} onChange={e => setSortOption(e.target.value)} style={selectStyle}>
                    <option value="DatumNeu">Neueste zuerst</option>
                    <option value="DatumAlt">Älteste zuerst</option>
                    <option value="AutorAZ">Autor A–Z</option>
                    <option value="AutorZA">Autor Z–A</option>
                    <option value="AmBeliebtesten">Am beliebtesten</option>
                    <option value="AmMeistenBewertet">Am meisten bewertet</option>
                </select>
            </div>

            <p style={infoStyle}>
                Zeige <strong>{ausgewählteKategorie}</strong> Texte von <strong>{ausgewählterAutor}</strong>, sortiert nach <strong>{displaySortLabel[sortOption]}</strong>.
            </p>

            {/* Kartenanzeige */}
            <div style={cardsContainerStyle} >
                {aktuelleTexte.map(t => (
                    <div key={t.id} style={cardStyle} onClick={() => navigate(`/text/${t.id}`)}>
                        {/* Weiße Leiste: Datum & Stern */}
                        <div style={headerBarStyle}>
                            <span>{new Date(t.datum).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                            <span
                                onClick={(e) => toggleMerken(e, t)}
                                style={istGemerkterText(t) ? starFilledStyle : starEmptyStyle}
                                title="Zur Merkliste hinzufügen oder entfernen"
                            >
                             ★
                            </span>
                        </div>
                        {/* Bild klickbar zur Detailseite */}
                        <div  style={imageWrapperStyle}>
                            <img src={t.bild} alt={t.ueberschrift} style={imageStyle} />
                        </div>
                        <div style={cardContentStyle}>
                            <h3>{t.ueberschrift}</h3>
                            <p style={descriptionStyle}>{t.kurzbeschreibung}</p>
                            <div style={votesStyle}>
                                <span>👍 {t.daumenHoch}</span>
                                <span>👎 {t.daumenRunter}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div style={paginationStyle}>
                {seite > 1 && <button onClick={() => setSeite(seite - 1)}>Zurück</button>}
                {[...Array(totalPages)].map((_, i) => (
                    <button key={i+1} onClick={() => setSeite(i+1)} style={{ margin: '0 6px', fontWeight: seite === i+1 ? 'bold' : 'normal' }}>{i+1}</button>
                ))}
                {seite < totalPages && <button onClick={() => setSeite(seite + 1)}>Weiter</button>}
            </div>
        </div>
    );
}

// Labels für SortOption
const displaySortLabel = {
    DatumNeu: 'Neueste zuerst',
    DatumAlt: 'Älteste zuerst',
    AutorAZ: 'Autor A–Z',
    AutorZA: 'Autor Z–A',
    AmBeliebtesten: 'Am beliebtesten',
    AmMeistenBewertet: 'Am meisten bewertet'
};

// Styles
const filterBarStyle = { display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' };
const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff', color: '#333', minWidth: '200px', fontSize: '1rem' };
const selectStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff', color: '#333', fontSize: '1rem' };
const infoStyle = { textAlign: 'center', marginBottom: '25px', fontSize: '1rem', fontStyle: 'italic' };
const cardsContainerStyle = { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' };
const cardStyle = { cursor:'pointer', width: '280px', position: 'relative', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', backgroundColor: '#ffffff', color: '#1a1a1a', overflow: 'hidden' };
const headerBarStyle = { display: 'flex', justifyContent: 'space-between',alignItems: 'center', backgroundColor: '#fff', padding: '8px', borderBottom: '1px solid #eee' };
const starEmptyStyle = { cursor: 'pointer', color: '#ccc', fontSize: '1.6rem', transition: 'transform 0.2s', };
const starFilledStyle = { cursor: 'pointer', color: '#f4d03f', fontSize: '1.6rem', transform: 'scale(1.1)' };
const imageWrapperStyle = { cursor: 'pointer' };
const imageStyle = { width: '100%', height: '180px', objectFit: 'cover' };
const cardContentStyle = { padding: '16px' };
const descriptionStyle = { fontSize: '0.9rem', minHeight: '60px' };
const votesStyle = { marginTop: '1em', fontSize: '1.1rem', display: 'flex', justifyContent: 'center', gap: '12px' };
const paginationStyle = { marginTop: '30px', textAlign: 'center' };

export default Home;
