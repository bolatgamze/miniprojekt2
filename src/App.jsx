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
                <Route path="/home" element={<Home texts={texts} setTexts={setTexts} />} />
                <Route path="/text/:id" element={<TextDetail texts={texts} setTexts={setTexts} />} />
                <Route path="/" element={<About />} />
                <Route path="/login" element={<Login benutzern={benutzern} />} />
                <Route path="/register" element={<Register benutzern={benutzern} setBenutzern={setBenutzern} />} />
                <Route path="/admin" element={<AdminPanel benutzern={benutzern} />} />
                <Route path="/meinprofil" element={<MeinProfil benutzern={benutzern} />} />
                <Route path="/neuerText" element={<NeuerText onSave={handleSaveNewText} />} />
                <Route path="/entwuerfe" element={<Entwuerfe texts={texts} setTexts={setTexts} />} />
                <Route path="/merkliste" element={<MerkListe benutzern={benutzern} />} />
            </Routes>
        </>
    );
}

export default App;
