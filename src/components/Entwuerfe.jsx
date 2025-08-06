import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Entwuerfe({
                                      entwuerfe,
                                      setEntwuerfe,
                                      texts,
                                      setTexts,
                                      currentUser
                                  }) {
    const navigate = useNavigate();

    // 1) Entwürfe aus dem Profil: falls es ein Objekt ist, in ein Array umwandeln und key als id verwenden
    const profileDrafts = Array.isArray(currentUser.entwuerfe)
        ? currentUser.entwuerfe
        : Object.entries(currentUser.entwuerfe || {}).map(
            ([key, draft]) => ({ id: Number(key), ...draft })
        );

    // 2) Session-Entwürfe immer als Array
    const sessionDrafts = Array.isArray(entwuerfe) ? entwuerfe : [];

    // 3) Zusammenführen und nach id deduplizieren
    const allDrafts = Array.from(
        new Map(
            [...profileDrafts, ...sessionDrafts].map(d => [d.id, d])
        ).values()
    );

    const handleLoeschen = (e, d) => {
        e.stopPropagation();
        if (window.confirm('Diesen Entwurf wirklich löschen?')) {
            setEntwuerfe(prev => prev.filter(x => x.id !== d.id));
        }
    };

    const handleBearbeiten = (e, d) => {
        e.stopPropagation();
        navigate('/neuerText', { state: { existingPost: d } });
    };

    const handleVeroeffentlichen = (e, d) => {
        e.stopPropagation();
        if (window.confirm('Diesen Entwurf veröffentlichen?')) {
            setTexts(prev => [...prev, d]);
            setEntwuerfe(prev => prev.filter(x => x.id !== d.id));
        }
    };

    return (
        <div style={{ padding: '2.5rem', fontFamily: 'sans-serif' }}>
            <style>{`
        .draft-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          justify-content: center;
        }
        .draft-card {
          width: 320px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: transform .2s, box-shadow .2s;
          cursor: pointer;
        }
        .draft-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        }
        .draft-header {
          background: #f5f5f5;
          padding: 10px 14px;
          font-size: .95rem;
          color: #333;
        }
        .draft-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
        }
        .draft-content {
          padding: 14px;
        }
        .draft-content h3 {
          margin: 0 0 8px;
          font-size: 1.3rem;
          color: #222;
        }
        .draft-content p {
          margin: 0 0 10px;
          font-size: 1rem;
          color: #555;
          line-height: 1.4;
        }
        .draft-meta {
          font-style: italic;
          font-size: .9rem;
          color: #777;
        }
        .draft-btns {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 12px;
        }
        .draft-btn {
          padding: 6px 12px;
          font-size: .9rem;
          border: none;
          border-radius: 5px;
          background: #eee;
          color: #333;
          text-align: left;
          transition: background .2s;
        }
        .draft-btn:hover { background: #ddd; }
        .draft-btn.danger {
          background: #f8d7da;
          color: #721c24;
        }
        .draft-btn.danger:hover {
          background: #f5c6cb;
        }
      `}</style>

            <h2 style={{ marginBottom: '1.2rem', fontSize: '1.8rem' }}>Meine Entwürfe</h2>

            {allDrafts.length === 0 ? (
                <p style={{
                    color: '#666',
                    fontStyle: 'italic',
                    textAlign: 'center',
                    fontSize: '1rem'
                }}>
                    Du hast noch keine Entwürfe.
                </p>
            ) : (
                <div className="draft-grid">
                    {allDrafts.map(d => (
                        <div
                            key={d.id}
                            className="draft-card"
                            onClick={e => handleBearbeiten(e, d)}
                        >
                            <div className="draft-header">
                                {d.datum
                                    ? new Date(d.datum).toLocaleDateString('de-DE')
                                    : 'Kein Datum'}
                            </div>
                            {d.bild && (
                                <img
                                    src={d.bild}
                                    alt={d.ueberschrift}
                                    className="draft-image"
                                />
                            )}
                            <div className="draft-content">
                                <h3>{d.ueberschrift || 'Ohne Titel'}</h3>
                                <p>{d.kurzbeschreibung || 'Keine Kurzbeschreibung'}</p>
                                <div className="draft-meta">
                                    {d.kategorie} – {d.autor}
                                </div>
                                <div className="draft-btns">
                                    <button
                                        className="draft-btn"
                                        onClick={e => handleBearbeiten(e, d)}
                                    >
                                        Bearbeiten
                                    </button>
                                    <button
                                        className="draft-btn"
                                        onClick={e => handleVeroeffentlichen(e, d)}
                                    >
                                        Veröffentlichen
                                    </button>
                                    <button
                                        className="draft-btn danger"
                                        onClick={e => handleLoeschen(e, d)}
                                    >
                                        Löschen
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
