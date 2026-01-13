import React, { useState, useEffect } from 'react'
import '../App.css'
import {retrieveResult} from '../components/Fetch.jsx'
import Player from '../components/Player.jsx'

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
               <p>Song Name: {data.song}</p>
           <p>Artist Name: {data.artist}</p>
               <p>Album Name: {data.album}</p>
               <p>Record Labels: {data.labels}</p>
                <p>Release Date: {data.release_date}</p>
                <div className="flex flex-row">
                   <img alt="album-cover" className="rounded-xl album-cover" src={data.image_uri ? data.image_uri: "/src/assets/no-cover.png"}></img>
                    <div className="scroll-lyric">
                    <p>{data.plainLyrics}</p>
                </div>
            </div>
                { data.comment != null &&
                    <p>{data.comment}</p>
                }
            <Player url={"https://kexp.streamguys1.com/kexp160.aac"}/>
           </div>
        </div>
    );
}
export default App