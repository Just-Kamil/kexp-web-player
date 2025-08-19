import React, { useState, useEffect } from 'react'
import '../App.css'
import {retrieveResult} from './Fetch.jsx'
import Player from './Player.jsx'
import noArt from '../assets/no-cover.png'

function App() {
    const [data, setData] = useState(":)")

    const retrieveAndSet = () => {
       setData(retrieveResult())
    }

       useEffect(() => {
           retrieveAndSet()
           setInterval(retrieveAndSet, 10000)
       },[]);


    return (
        <div className="App">

            <h1 className="font-bold text-yellow-500">KEXP</h1>
            <h2 className="font-bold">Where music matters</h2>
            <br />
            <div style={{whiteSpace: "pre-wrap"}}>
                {/* Info Container Div*/}
                <div className="flex flex-row">
                    <img alt="Album Cover" className="rounded-xl album-cover" src={data.image_uri ? data.image_uri: noArt}></img>
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