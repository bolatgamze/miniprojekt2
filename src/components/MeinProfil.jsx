import React from 'react';
import { useNavigate } from 'react-router-dom';

function MeinProfil({
                        currentUser,
                        texts = [],
                        entwuerfe = [],
                        merkliste = [],
                        setTexts,
                        setEntwuerfe,
                        setCurrentUser
                    }) {
    const navigate = useNavigate();

    // Styles
    const styles = {
        container: { padding: '2rem', fontFamily: 'sans-serif' },
        adminCard: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            border: '1px solid #ff8360',
            borderRadius: '14px',
            padding: '1.5rem',
            backgroundColor: '#ff8360',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            marginBottom: '1.5rem'
        },
        adminImg: {
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'top',
            border: '2px solid #555'
        },
        userInfo: { flex: 1, textAlign: 'center', color: 'black' },
        sectionTitle: { fontSize: '1.3rem', fontWeight: 'bold', color: '#333', margin: '1.5rem 0 0.5rem' },
        hr: { border: 'none', borderTop: '2px solid #ff8360', margin: '1rem 0' },
        cardsContainer: { display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' },
        card: {
            width: '280px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            cursor: 'pointer'
        },
        headerBar: { padding: '8px', fontSize: '0.9rem', color: '#555', borderBottom: '1px solid #eee' },
        imageWrapper: { width: '100%', height: '150px', overflow: 'hidden' },
        image: { width: '100%', height: '100%', objectFit: 'cover' },
        cardContent: { padding: '16px' },
        deleteButton: {
            marginTop: '10px',
            padding: '6px 12px',
            backgroundColor: '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        },
        commentCard: {
            backgroundColor: '#ffffff',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            marginBottom: '12px'
        },
        commentLink: { color: '#ff8360', textDecoration: 'underline', cursor: 'pointer' }
    };

    // Delete handlers
    const handleDeleteText = (id) => {
        setTexts((prev) => prev.filter((t) => t.id !== id));
        setCurrentUser((prev) => ({
            ...prev,
            texte: prev.texte.filter((tid) => tid !== id)
        }));
    };

    const handleDeleteDraft = (id) => {
        setEntwuerfe((prev) => prev.filter((d) => d.id !== id));
        setCurrentUser((prev) => ({
            ...prev,
            entwuerfe: prev.entwuerfe.filter((d) => d.id !== id)
        }));
    };

    // Eigene Texte basierend auf Benutzer-IDs
    const userTextIds = new Set((currentUser.texte || []).map((id) => id.toString()));
    const meineTexte = texts.filter((t) => userTextIds.has(t.id.toString()));

    // Entwürfe aus Profil- und Session-Prop
    const profileDrafts = Array.isArray(currentUser.entwuerfe) ? currentUser.entwuerfe : [];
    const sessionDrafts = Array.isArray(entwuerfe) ? entwuerfe : [];
    const allDrafts = [...profileDrafts, ...sessionDrafts];

    // Merkliste IDs
    const profileBookmarks = Array.isArray(currentUser.merkliste) ? currentUser.merkliste : [];
    const sessionBookmarks = Array.isArray(merkliste) ? merkliste : [];
    const allBookmarkIds = [...profileBookmarks, ...sessionBookmarks];
    const bookmarkedTexts = texts.filter((t) => allBookmarkIds.includes(t.id));

    return (
        <div style={styles.container}>
            {/* Profil Header */}
            <div style={styles.adminCard}>
                <img src={currentUser.profilbild} alt={currentUser.benutzername} style={styles.adminImg} />
                <div style={styles.userInfo}>
                    <h2>{currentUser.benutzername}</h2>
                    <p><strong>Anmeldedatum:</strong> {new Date(currentUser.beigetretenAm).toLocaleDateString('de-DE')}</p>
                    <p><strong>Email:</strong> {currentUser.email}</p>
                    <p><strong>Zuletzt online:</strong> {new Date(currentUser.zuletztOnline).toLocaleDateString('de-DE')}</p>
                </div>
            </div>

            <hr style={styles.hr} />

            {/* Meine Texte (nur Admin) */}
            {currentUser.status === 'admin' && (
                <>
                    <h3 style={styles.sectionTitle}>Meine Texte</h3>
                    <div style={styles.cardsContainer}>
                        {meineTexte.length > 0 ? meineTexte.map((text) => (
                            <div
                                key={text.id}
                                style={styles.card}
                                onClick={() => navigate(`/text/${text.id}`)}
                            >
                                <div style={styles.headerBar}>
                                    {new Date(text.datum).toLocaleDateString('de-DE', {
                                        day: '2-digit', month: 'long', year: 'numeric'
                                    })}
                                </div>
                                <div style={styles.imageWrapper}>
                                    <img src={text.bild} alt={text.ueberschrift} style={styles.image} />
                                </div>
                                <div style={styles.cardContent}>
                                    <h4>{text.ueberschrift}</h4>
                                    <p>{text.kurzbeschreibung}</p>
                                    <button
                                        style={styles.deleteButton}
                                        onClick={(e) => { e.stopPropagation(); handleDeleteText(text.id); }}
                                    >
                                        Löschen
                                    </button>
                                </div>
                            </div>
                        )) : <p>Keine eigenen Texte vorhanden.</p>}
                    </div>

                    <hr style={styles.hr} />

                    {/* Entwürfe */}
                    <h3 style={styles.sectionTitle}>Entwürfe</h3>
                    <div style={styles.cardsContainer}>
                        {allDrafts.length > 0 ? allDrafts.map((draft) => (
                            <div key={draft.id} style={styles.card}>
                                {draft.datum && (
                                    <div style={styles.headerBar}>
                                        {new Date(draft.datum).toLocaleDateString('de-DE', {
                                            day: '2-digit', month: 'long', year: 'numeric'
                                        })}
                                    </div>
                                )}
                                {draft.bild && (
                                    <div style={styles.imageWrapper}>
                                        <img src={draft.bild} alt={draft.ueberschrift} style={styles.image} />
                                    </div>
                                )}
                                <div style={styles.cardContent}>
                                    <h4>{draft.ueberschrift || 'Unbenannter Entwurf'}</h4>
                                    <p>{draft.kurzbeschreibung || 'Keine Vorschau verfügbar'}</p>
                                    <button
                                        style={styles.deleteButton}
                                        onClick={() => handleDeleteDraft(draft.id)}
                                    >
                                        Löschen
                                    </button>
                                </div>
                            </div>
                        )) : <p>Keine Entwürfe vorhanden.</p>}
                    </div>

                    <hr style={styles.hr} />
                </>
            )}

            {/* Merkliste (User & Admin) */}
            {['admin', 'user'].includes(currentUser.status) && (
                <>
                    <h3 style={styles.sectionTitle}>Merkliste</h3>
                    <div style={styles.cardsContainer}>
                        {bookmarkedTexts.length > 0 ? bookmarkedTexts.map((text) => (
                            <div
                                key={text.id}
                                style={styles.card}
                                onClick={() => navigate(`/text/${text.id}`)}
                            >
                                <div style={styles.headerBar}>
                                    {new Date(text.datum).toLocaleDateString('de-DE', {
                                        day: '2-digit', month: 'long', year: 'numeric'
                                    })}
                                </div>
                                <div style={styles.imageWrapper}>
                                    <img src={text.bild} alt={text.ueberschrift} style={styles.image} />
                                </div>
                                <div style={styles.cardContent}>
                                    <h4>{text.ueberschrift}</h4>
                                    <p>{text.kurzbeschreibung}</p>
                                </div>
                            </div>
                        )) : <p>Keine Einträge in der Merkliste.</p>}
                    </div>

                    <hr style={styles.hr} />
                </>
            )}

            {/* Kommentare */}
            <h3 style={styles.sectionTitle}>Kommentare</h3>
            <div>
                {currentUser.textKommentare.map((kommentar, idx) => {
                    const text = texts.find((t) => t.id === kommentar.textId);
                    if (!text) return null;
                    return (
                        <div key={idx} style={styles.commentCard}>
                            <p>
                                Kommentar zu{' '}
                                <span
                                    style={styles.commentLink}
                                    onClick={() => navigate(`/text/${text.id}`)}
                                >
                  {text.ueberschrift}
                </span> von <strong>{text.autor}</strong>:
                            </p>
                            <p>"{kommentar.inhalt}"</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MeinProfil;
