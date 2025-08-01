import { useParams } from "react-router-dom";

function TextDetail({ texts, setTexts }) {
    const { id } = useParams();
    const text = texts.find((t) => t.id === parseInt(id));

    if (!text) {
        return <div>Text nicht gefunden.</div>;
    }

    return (
        <div style={{ padding: "30px" }}>
            <h2>{text.ueberschrift}</h2>
            <p>{text.text}</p>
            <p><strong>Bewertung:</strong> {text.bewertung || "Noch keine"}</p>
            <p><strong>Datum:</strong> {text.datum || "Unbekannt"}</p>
        </div>
    );
}

export default TextDetail;
