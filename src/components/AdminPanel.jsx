import React, { useState } from 'react';

function AdminPanel({ benutzern, setBenutzern }) {
    // Admins und Users
    const admins = benutzern.filter(u => u.status === 'admin');
    const users = benutzern
        .filter(u => u.status === 'user')
        .sort((a, b) => new Date(a.beigetretenAm) - new Date(b.beigetretenAm));

    // Pagination für Users (Seiten mit Vielfachen von 9)
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 9;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handleDeleteUser = username => {
        if (window.confirm(`Willst du den Benutzer "${username}" wirklich löschen?`)) {
            setBenutzern(benutzern.filter(u => u.benutzername !== username));
        }
    };

    // Styles
    const styles = {
        container: { padding: '2rem', fontFamily: 'sans-serif' },
        sectionTitle: { margin: '2rem 0 1rem', fontSize: '1.5rem', fontWeight: 'bold', color: '#333' },
        adminGrid: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' },
        userGrid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' },
        adminCard: {
            display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #ff8360',
            borderRadius: '14px', padding: '1rem', backgroundColor: '#ff8360', height: '180px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        },
        adminImg: { width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid #555' },
        userCard: {
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
            border: '1px solid #ccc', borderRadius: '10px', padding: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
        },
        userImg: { width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '1px solid #999', marginBottom: '0.8rem' },
        deleteBtn: { backgroundColor: '#e63946', color: 'white', border: 'none', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.7rem', cursor: 'pointer', marginTop: '0.5rem' },
        pagination: { display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1.5rem', gap: '0.5rem' },
        pageBtn: { padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '6px', backgroundColor: '#ff8360', cursor: 'pointer' }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Admins</h2>
            <div style={styles.adminGrid}>
                {admins.map(user => (
                    <div key={user.benutzername} style={styles.adminCard}>
                        <img src={user.profilbild} alt={user.benutzername} style={styles.adminImg} />
                        <div>
                            <h3>{user.benutzername}</h3>
                            <p><strong>Anmeldedatum:</strong> {new Date(user.beigetretenAm).toLocaleDateString('de-DE')}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Zuletzt online:</strong> {new Date(user.zuletztOnline).toLocaleDateString('de-DE')}</p>
                        </div>
                    </div>
                ))}
            </div>

            <hr style={{ margin: '2.5rem 0', border: 'none', borderTop: '2px solid #ff8360' }} />

            <h2 style={styles.sectionTitle}>Alle Benutzer</h2>
            <div style={styles.userGrid}>
                {currentUsers.map(user => (
                    <div key={user.benutzername} style={styles.userCard}>
                        <img src={user.profilbild} alt={user.benutzername} style={styles.userImg} />
                        <h4>{user.benutzername}</h4>
                        <p>Anmeldedatum: {new Date(user.beigetretenAm).toLocaleDateString('de-DE')}</p>
                        <p>Email: {user.email}</p>
                        <p>Zuletzt online: {new Date(user.zuletztOnline).toLocaleDateString('de-DE')}</p>
                        <button style={styles.deleteBtn} onClick={() => handleDeleteUser(user.benutzername)}>Löschen</button>
                    </div>
                ))}
            </div>

            <div style={styles.pagination}>
                <button
                    style={styles.pageBtn}
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                >
                    {'<<'}
                </button>
                <button
                    style={styles.pageBtn}
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Zurück
                </button>
                <span>Seite {currentPage} von {totalPages}</span>
                <button
                    style={styles.pageBtn}
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Weiter
                </button>
                <button
                    style={styles.pageBtn}
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    {'>>'}
                </button>
            </div>
        </div>
    );
}

export default AdminPanel;
