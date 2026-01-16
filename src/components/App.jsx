import React, { useState, useEffect, useMemo } from 'react'
import '../App.css'
import Player from './Player.jsx'
import noArt from '../assets/no-cover.png'
import airBreak from '../assets/air-break.png'
import {fetchData} from "../js/fetch.js";

// Delay between api calls in seconds
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
            <div style={{whiteSpace: "pre-wrap"}}>
                {/* Info Container Div*/}
                <div className="flex flex-col lg:flex-row">
                    <div className='rounded-xl p-0.5 bg-gradient-to-bl from-gray-200/20 to-gray-200/5 shadow-lg'>
                        <img alt="Album Cover" className="rounded-xl w-96" src={album_art}></img>
                    </div>
                    <div className="flex flex-col lg:flex-col pl-4 justify-center lg:justify-end">
                        <div className="flex flex-col pb-4 opacity-65">
                            <div className={data.album ? 'mb-3' : 'mb-0'}>
                                <h1 className='font-bold'>{data.song ? data.song:"Air Break"}</h1>
                                <h2 className='text-3xl'>{data.artist ? data.artist : "KEXP"}</h2>
                            </div>
                            <div className='italic'>
                                <h4>{data.album}</h4>
                                <h4>{data.release_date ? data.release_date.slice(0,4) + " | " + data.labels.join(", "): ""}</h4>
                            </div>
                        </div>
                        <div className='justify-self-center'>
                            <Player url={"https://kexp-mp3-128.streamguys1.com/"}></Player>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default App