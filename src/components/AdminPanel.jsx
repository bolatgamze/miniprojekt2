import React, {useState} from 'react';

/*
--------------|      benutzername
|             |      anmeldedatum
|             |      email adress
|             |      zuletzt online
|_____________|
    profil bild

....

__________________________________________

alle users
...


__________________________________________

    für 4 admins untereinander wieder im Card Form diese Infos können wir hier listen
    dann eine linie (<hr>)
    dann alle andere users wieder mit denselben Infos aber bisschen kleiner als admin vorschau
    pagination wäre logish ich habe mehr als 50 Users erstellt
    an der ecke vom usercard wäre cool ein löschen button


    !!!!löschen fonktion fehlt!!!!
*/

function AdminPanel({ benutzern, setBenutzern }) {
    const admins = benutzern.filter(user => user.status === 'admin');
    const users = benutzern
        .filter(user => user.status === 'user')
        .sort((a, b) => new Date(a.beigetretenAm) - new Date(b.beigetretenAm));

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 16;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handleDeleteUser = (username) => {
        if (window.confirm(`Willst du den Benutzer "${username}" wirklich löschen?`)) {
            setBenutzern(benutzern.filter(u => u.benutzername !== username))
        }
    };

    const containerStyle = {
        padding: '2rem',
        fontFamily: 'sans-serif',
    };

    const sectionTitleStyle = {
        marginBottom: '1rem',
        marginTop: '2rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#333',
    };

    const cardGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
    };

    const adminCardStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        border: '1px solid #888',
        borderColor: '#ff8360',
        borderRadius: '14px',
        padding: '1rem',
        backgroundColor: '#ff8360',
        height: '180px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        outline: 'none',
    };

    const adminImageStyle = {
        width: '110px',
        height: '110px',
        borderRadius: '50%',
        objectFit: 'cover',
        objectPosition: 'top', // Nur die obere Bildhälfte anzeigen
        border: '2px solid #555',
    };

    const userCardStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        border: '1px solid #ccc',
        borderColor: '#ff8360',
        borderRadius: '10px',
        padding: '1rem',
        maxWidth: '300px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    };

    const userImageStyle = {
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        objectFit: 'cover',
        objectPosition: 'top', // Nur die obere Bildhälfte anzeigen
        border: '1px solid #999',
        marginBottom: '0.8rem',
    };

    const deleteBtnStyle = {
        backgroundColor: '#e63946',
        color: 'white',
        border: 'none',
        padding: '0.2rem 0.5rem',
        borderRadius: '6px',
        fontSize: '0.7rem',
        cursor: 'pointer',
        marginTop: '0.5rem',
        maxWidth: '80px',
        textAlign: 'center',
        whiteSpace: 'nowrap',
    };

    const userTextStyle = {
        wordWrap: 'break-word',
        width: '100%',
    };

    const paginationStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1.5rem',
        gap: '0.5rem',
    };

    const pageBtnStyle = {
        padding: '0.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '6px',
        backgroundColor: '#ff8360',
        cursor: 'pointer',
        disabled: {
            opacity: 0.5,
            cursor: 'not-allowed',
        }
    };

    return (
        <div style={containerStyle}>
            <h2 style={sectionTitleStyle}>Admins</h2>
            <div style={cardGridStyle}>
                {admins.map(user => (
                    <div key={user.benutzername} style={adminCardStyle}>
                        <img
                            src={user.profilFoto || user.profilbild}
                            alt={user.benutzername}
                            style={adminImageStyle}
                        />
                        <div>
                            <h3>{user.benutzername}</h3>
                            <p><strong>Anmeldedatum:</strong> {new Date(user.beigetretenAm).toLocaleDateString('de-DE')}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Zuletzt online:</strong> {new Date(user.zuletztOnline).toLocaleDateString('de-DE')}</p>
                        </div>
                    </div>
                ))}
            </div>

            <hr
                style={{
                    margin: '2.5rem 0',
                    border: 'none',
                    borderTop: '2px solid #ff8360'
                }}
            />
            <h2 style={sectionTitleStyle}>Alle Benutzer</h2>
            <div style={cardGridStyle}>
                {currentUsers.map(user => (
                    <div key={user.benutzername} style={userCardStyle}>
                        <img
                            src={user.profilbild || user.profilFoto}
                            alt={user.benutzername}
                            style={userImageStyle}
                        />
                        <div style={userTextStyle}>
                            <h4>{user.benutzername}</h4>
                            <p>Anmeldedatum: {new Date(user.beigetretenAm).toLocaleDateString('de-DE')}</p>
                            <p>Email: {user.email}</p>
                            <p>Zuletzt online: {new Date(user.zuletztOnline).toLocaleDateString('de-DE')}</p>
                        </div>
                        <button
                            style={deleteBtnStyle}
                            onClick={() => handleDeleteUser(user.benutzername)}
                        >Löschen
                        </button>
                    </div>
                ))}
            </div>

            <div style={paginationStyle}>
                <button
                    style={pageBtnStyle}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Zurück
                </button>
                <span>Seite {currentPage} von {totalPages}</span>
                <button
                    style={pageBtnStyle}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Weiter
                </button>
            </div>
        </div>
    );
}

export default AdminPanel;