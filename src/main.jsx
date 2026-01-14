import React, {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import './index.css'
import App from './components/App.jsx'
import Navbar from "./components/Navbar.jsx";
import ShowIndicator from "./components/ShowIndicator.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <div className="background-image"></div>
        <div className="dimmer"></div>
        <Navbar />
        <App />
    </StrictMode>
)