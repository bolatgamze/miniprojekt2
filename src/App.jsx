import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import TextDetail from "./components/TextDetail.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import NavBar from "./components/NavBar.jsx";
import MerkListe from "./components/MerkListe.jsx";
import Entwuerfe from "./components/Entwuerfe.jsx";

import benutzerDaten from "./users.js";
import textsDaten from "./texts.js";

import './App.css'
import {useState} from "react";
import Register from "./components/Register.jsx";


function App() {

    const [benutzern, setBenutzern] = useState(benutzerDaten);
    const [texts, setTexts] = useState(textsDaten);
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home texts={texts} setTexts={setTexts} />} />
                <Route path="/text/:id" element={<TextDetail texts={texts} setTexts={setTexts} />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login benutzern={benutzern} />} />
                <Route path="/register" element={<Register benutzern={benutzern} setBenutzern={setBenutzern} />} />
                <Route path="/admin" element={<AdminPanel benutzern={benutzern} />} />
                <Route path="/entwuerfe" element={<Entwuerfe texts={texts} setTexts={setTexts} />} />
                <Route path="/merkliste" element={<MerkListe benutzern={benutzern} />} />
            </Routes>
        </>
    );
}

export default App;
