import React, { useState, useEffect, useMemo } from 'react'
import '../App.css'
import Player from './Player.jsx'
import noArt from '../assets/no-cover.png'
import airBreak from '../assets/air-break.png'
import {fetchData} from "../js/fetch.js";

// delay in api calls in seconds
let DELAY = 40;


function App() {
    const [data, setData] = useState({})

    // fire only at the first render, no dependencies so only fires once
    useMemo(() => {
        fetchData().then(res => {setData(res)})
    },[])


    const retrieveAndSet =  async () => {
        fetchData().then( res => setData(res))
    }

       useEffect(() => {
           setInterval(retrieveAndSet, DELAY * 1000)
       },[]);

    // Check if there is no cover or an air break
    let album_art;
    if (data.image_uri && data.song) {
        album_art = data.image_uri;
    } else if (!data.image_uri && !data.song) {
        album_art = airBreak;
    } else {
        album_art = noArt;
    }

    return (
        <div className="App">

            <h1 className="font-bold text-yellow-500">KEXP</h1>
            <h2 className="font-bold">Where music matters</h2>
            <br />
            <div style={{whiteSpace: "pre-wrap"}}>
                {/* Info Container Div*/}
                <div className="flex flex-row">
                    <img alt="Album Cover" className="rounded-xl album-cover" src={album_art}></img>
                    <div className="flex flex-col pl-4 justify-end">
                        <div className="flex flex-col pb-4 opacity-65">
                            <h1>{data.song ? data.song:"Air Break"}</h1>
                            <h2>{data.artist}</h2>
                            <h4>{data.album}</h4>
                            <h4>{data.release_date ? data.release_date + " | " + data.labels: ""}</h4>
                        </div>
                        <Player url={"https://kexp-mp3-128.streamguys1.com/"}></Player>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default App