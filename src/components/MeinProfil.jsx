import React from 'react';
import { useNavigate } from 'react-router-dom';

function MeinProfil({
                        benutzern,
                        currentUser,
                        texts,
                        entwuerfe,
                        merkliste
                    }) {
    const navigate = useNavigate();

    // Profil-Daten aus benutzern holen
    const profile = benutzern.find(u => u.benutzername === currentUser.benutzername) || currentUser;

    // Stile definieren
    const styles = {
        container: { padding: '2rem', fontFamily: 'sans-serif' },
        profilHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            border: '1px solid #ff8360',
            borderRadius: '14px',
            padding: '1.5rem',
            backgroundColor: '#ff8360',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            marginBottom: '1.5rem'
        },
        profilBild: {
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #555'
        },
        userInfo: { flex: 1, textAlign: 'center', color: 'black' },
        sectionTitle: { fontSize: '1.3rem', fontWeight: 'bold', margin: '1.5rem 0 0.5rem' },
        hr: { border: 'none', borderTop: '2px solid #ff8360', margin: '1rem 0' },
        cardsContainer: { display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' },
        card: {
            width: '280px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            overflow: 'hidden'
        },
        headerBar: { padding: '8px', fontSize: '0.9rem', borderBottom: '1px solid #eee' },
        imageWrapper: { width: '100%', height: '150px', overflow: 'hidden' },
        image: { width: '100%', height: '100%', objectFit: 'cover' },
        cardContent: { padding: '16px' },
        commentCard: {
            backgroundColor: '#fff',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            marginBottom: '12px'
        },
        commentLink: { color: '#ff8360', textDecoration: 'underline', cursor: 'pointer' }
    };

    // --- Meine Texte (nur für Admin) ---
    const meineTexte = profile.status === 'admin'
        ? texts.filter(t => Array.isArray(profile.texte) && profile.texte.includes(t.id))
        : [];

    // --- Entwürfe (Profil + Session, nur für Admin) ---
    let profileDrafts = [];
    if (profile.status === 'admin') {
        profileDrafts = Array.isArray(profile.entwuerfe)
            ? profile.entwuerfe
            : Object.values(profile.entwuerfe || {});
    }
    const sessionDrafts = Array.isArray(entwuerfe) ? entwuerfe : [];
    // Duplikate nach ID entfernen
    const allDrafts = Array.from(
        new Map(
            [...profileDrafts, ...sessionDrafts].map(d => [d.id, d])
        ).values()
    );

    // --- Merkliste (Profil + Session) ---
    const profileBookmarks = Array.isArray(profile.merkliste) ? profile.merkliste : [];
    const sessionBookmarks = Array.isArray(merkliste) ? merkliste : [];
    const allBookmarkIds = Array.from(new Set([...profileBookmarks, ...sessionBookmarks]));
    const bookmarkedTexts = texts.filter(t => allBookmarkIds.includes(t.id));

    // --- Alle meine Kommentare aus texts.collecten ---
    const comments = texts
        .flatMap(t =>
            (t.kommentare || [])
                .filter(k => k.autor === profile.benutzername)
                .map(k => ({
                    ...k,
                    textId: t.id,
                    textUeberschrift: t.ueberschrift
                }))
        );

    return (
        <div style={styles.container}>
            {/* Profil-Header */}
            <div style={styles.profilHeader}>
                <img src={profile.profilbild} alt={profile.benutzername} style={styles.profilBild} />
                <div style={styles.userInfo}>
                    <h2>{profile.benutzername}</h2>
                    <p>
                        <strong>Anmeldedatum:</strong>{' '}
                        {new Date(profile.beigetretenAm).toLocaleDateString('de-DE')}
                    </p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p>
                        <strong>Zuletzt online:</strong>{' '}
                        {new Date(profile.zuletztOnline).toLocaleDateString('de-DE')}
                    </p>
                </div>
            </div>

            <hr style={styles.hr} />

            {/* Meine Texte */}
            {profile.status === 'admin' && (
                <>
                    <h3 style={styles.sectionTitle}>Meine Texte</h3>
                    <div style={styles.cardsContainer}>
                        {meineTexte.length > 0
                            ? meineTexte.map(text => (
                                <div
                                    key={text.id}
                                    style={styles.card}
                                    onClick={() => navigate(`/text/${text.id}`)}
                                >
                                    <div style={styles.headerBar}>
                                        {new Date(text.datum).toLocaleDateString('de-DE', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric'
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
                            ))
                            : <p>Keine eigenen Texte vorhanden.</p>
                        }
                    </div>

                    <hr style={styles.hr} />

                    {/* Entwürfe */}
                    <h3 style={styles.sectionTitle}>Entwürfe</h3>
                    <div style={styles.cardsContainer}>
                        {allDrafts.length > 0
                            ? allDrafts.map(d => (
                                <div key={d.id} style={styles.card}>
                                    <div style={styles.headerBar}>
                                        {d.datum
                                            ? new Date(d.datum).toLocaleDateString('de-DE')
                                            : 'Kein Datum'}
                                    </div>
                                    {d.bild && (
                                        <div style={styles.imageWrapper}>
                                            <img src={d.bild} alt={d.ueberschrift} style={styles.image}/>
                                        </div>
                                    )}
                                    <div style={styles.cardContent}>
                                        <h4>{d.ueberschrift || 'Ohne Titel'}</h4>
                                        <p>{d.kurzbeschreibung || 'Keine Kurzbeschreibung'}</p>
                                    </div>
                                </div>
                            ))
                            : <p>Keine Entwürfe vorhanden.</p>
                        }
                    </div>

                    <hr style={styles.hr} />
                </>
            )}

            {/* Merkliste */}
            {['admin', 'user'].includes(profile.status) && (
                <>
                    <h3 style={styles.sectionTitle}>Merkliste</h3>
                    <div style={styles.cardsContainer}>
                        {bookmarkedTexts.length > 0
                            ? bookmarkedTexts.map(text => (
                                <div
                                    key={text.id}
                                    style={styles.card}
                                    onClick={() => navigate(`/text/${text.id}`)}
                                >
                                    <div style={styles.headerBar}>
                                        {new Date(text.datum).toLocaleDateString('de-DE', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </div>
                                    <div style={styles.imageWrapper}>
                                        <img src={text.bild} alt={text.ueberschrift} style={styles.image}/>
                                    </div>
                                    <div style={styles.cardContent}>
                                        <h4>{text.ueberschrift}</h4>
                                        <p>{text.kurzbeschreibung}</p>
                                    </div>
                                </div>
                            ))
                            : <p>Keine Einträge in der Merkliste.</p>
                        }
                    </div>

                    <hr style={styles.hr} />
                </>
            )}

            {/* Kommentare */}
            <h3 style={styles.sectionTitle}>Kommentare</h3>
            <div>
                {comments.map((kommentar, idx) => {
                    const text = texts.find(t => t.id === kommentar.textId);
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
                </span>{' '}
                                von <strong>{text.autor}</strong>:
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
