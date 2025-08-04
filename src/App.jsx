import { Routes, Route } from "react-router-dom";
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

import benutzerDaten from "./users.js";
import textData from "./texts.js"

import './App.css'
import {useEffect, useState} from "react";
import NeuerText from "./components/NeuerText.jsx";



function App() {

    const [benutzern, setBenutzern] = useState(benutzerDaten);
    const [texts, setTexts] = useState(() => {
        const saved = localStorage.getItem('texts');
        return saved ? JSON.parse(saved) : textData;
    })
    const [currentUser, setCurrenUser] = useState(
    {
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
        entwuerfe: {}, merkliste: [1, 8]
    })

    useEffect(() => {
        localStorage.setItem('texts', JSON.stringify(texts));
    }, [texts]);

    const handleSaveNewText = (text) => {
        setTexts([...texts, text]);
    };

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/home" element={<Home texts={texts} setTexts={setTexts} benutzer={benutzern} setBenutzern={setBenutzern} currentUser={currentUser}/>} />
                <Route path="/text/:id" element={<TextDetail texts={texts} setTexts={setTexts} benutzern={benutzern} />} />
                <Route path="/" element={<About />} />
                <Route path="/login" element={<Login benutzern={benutzern} />} />
                <Route path="/register" element={<Register benutzern={benutzern} setBenutzern={setBenutzern} />} />
                <Route path="/admin" element={<AdminPanel benutzern={benutzern} setBenutzern={setBenutzern} />} />
                <Route path="/meinprofil" element={<MeinProfil benutzern={benutzern} currentUser={currentUser} />} />
                <Route path="/neuerText" element={<NeuerText onSave={handleSaveNewText} currentUser={currentUser} />} />
                <Route path="/entwuerfe" element={<Entwuerfe texts={texts} setTexts={setTexts} currentUser={currentUser} />} />
                <Route path="/merkliste" element={<MerkListe benutzern={benutzern} currentUser={currentUser} />} />
            </Routes>
        </>
    );
}

export default App;
