import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./components/Home.jsx";
import TextDetail from "./components/TextDetail.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import NavBar from "./components/NavBar.jsx";
import MerkListe from "./components/MerkListe.jsx";
import Entwuerfe from "./components/Entwuerfe.jsx";
import Register from "./components/Register.jsx";
import MeinProfil from "./components/MeinProfil.jsx";
import NeuerText from "./components/NeuerText.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import benutzerDaten from "./users.js";
import textData from "./texts.js";

import './App.css';

function App() {
    const [benutzern, setBenutzern] = useState(() => {
        const savedUsers = localStorage.getItem("users");
        return savedUsers ? JSON.parse(savedUsers) : benutzerDaten;
    });

    const [texts, setTexts] = useState(() => {
        const saved = localStorage.getItem("texts");
        return saved ? JSON.parse(saved) : textData;
    });

    const [currentUser, setCurrentUser] = useState({
        benutzername: "Gandalf",
        status: "admin",
        email: "gandalf@katzenzauber.meow",
        profilbild: "/profilbilder/gandalf.PNG",
        typ: "Katze",
        beigetretenAm: "2022-01-01",
        zuletztOnline: "2025-08-03",
        texte: [4, 5],
        textKommentare: [
            { textId: 2, inhalt: "Ich will das Foto sehen! 😹" },
            { textId: 5, inhalt: "Punkt 3 ist revolutionär. Muss ich mal ausprobieren!" },
            { textId: 11, inhalt: "Ich hab den Tierarzt gebissen. Keine Reue." },
            { textId: 13, inhalt: "Ich wär sofort abgebogen bei dem Haufen Natur..." }
        ],
        merkliste: [1, 8]
    });

    const [entwuerfe, setEntwuerfe] = useState([]);
    const [merkliste, setMerkliste] = useState([]);

    useEffect(() => {
        localStorage.setItem("texts", JSON.stringify(texts));
    }, [texts]);

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(benutzern));
    }, [benutzern]);

    const handleSaveNewText = (text) => {
        setTexts([...texts, text]);
    };

    const handleLogout = () => {
        setCurrentUser(null);
    }

    return (
        <>
            <Header />
            <NavBar user={currentUser} handleLogout={handleLogout} />

            <Routes>
                <Route path="/home" element={
                    <Home
                        texts={texts}
                        setTexts={setTexts}
                        benutzern={benutzern}
                        setBenutzern={setBenutzern}
                        currentUser={currentUser}
                        merkliste={merkliste}
                        setMerkliste={setMerkliste}
                    />
                } />

                <Route
                    path="/text/:id"
                    element={
                        <TextDetail
                            texts={texts}
                            setTexts={setTexts}
                            benutzern={benutzern}
                        />
                    }
                />
                <Route path="/" element={<About />} />
                <Route
                    path="/login"
                    element={
                        <Login
                            benutzern={benutzern}
                            setCurrentUser={setCurrentUser}
                            currentUser={currentUser}
                        />
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Register
                            benutzern={benutzern}
                            setBenutzern={setBenutzern}
                        />
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <AdminPanel
                            benutzern={benutzern}
                            setBenutzern={setBenutzern}
                        />
                    }
                />
                <Route
                    path="/meinprofil"
                    element={
                        <MeinProfil
                            benutzern={benutzern}
                            currentUser={currentUser}
                            entwuerfe={entwuerfe}
                            merkliste={merkliste}
                            texts={texts}
                        />
                    }
                />
                <Route
                    path="/neuerText"
                    element={
                        <NeuerText
                            onSave={(text) => setEntwuerfe([...entwuerfe, text])}
                            currentUser={currentUser}
                        />
                    }
                />
                <Route
                    path="/entwuerfe"
                    element={
                        <Entwuerfe
                            entwuerfe={entwuerfe}
                            setEntwuerfe={setEntwuerfe}
                            texts={texts}
                            setTexts={setTexts}
                        />
                    }
                />
                <Route
                    path="/merkliste"
                    element={
                        <MerkListe
                            merkliste={merkliste}
                            setMerkliste={setMerkliste}
                        />
                    }
                />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
