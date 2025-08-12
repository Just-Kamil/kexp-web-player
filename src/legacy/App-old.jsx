import React, { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'

function App() {
    const [data, setData] = useState(":)")
    const [status, setStatus] = useState("idle")

    const fetchData = async () => {
        console.log("Will fetch data now...")
        try {
            setStatus("Fetching data...")
            let res = await axios.get('https://api.kexp.org/v2/plays')
            const lastSong = res.data.results[0]
            setData([lastSong.song, lastSong.artist, lastSong.album, lastSong.labels, lastSong.image_uri, lastSong.comment])
            console.log("Got Data", res.data)
            setStatus("idle")
        } catch (error) {
            console.log(error)
            setStatus("error")
        }
    }
    // every 50 seconds get data
    useEffect(() => {
        console.log("fetching data...")
        fetchData()
        setInterval(fetchData, 50000);
    }, []);

    // anytime data is changed, change background image
    useEffect(() => {
        console.log("data 4 status", data[4])
        if (data[4] != "" && data[0] != "") {
            document.getElementsByClassName("background-image")[0].style.backgroundImage = "url(" + (data[4]) + ")";
        } else if (data[4] == "" && data[0] == "") {
            document.getElementsByClassName("background-image")[0].style.backgroundImage = "url('/src/assets/air-break.png')";
        } else {
            document.getElementsByClassName("background-image")[0].style.backgroundImage = "url('/src/assets/no-cover.png')";
        }
    }, [data])

    return (
        <div className="App">

            <h1 className="font-bold text-yellow-500">KEXP</h1>
            <h2 className="font-bold">Where music matters</h2>
            <br />
            <div style={{whiteSpace: "pre-wrap"}}>
               <p>Song Name: {data.song}</p>
           <p>Artist Name: {data[1]}</p>
               <p>Album Name: {data[2]}</p>
               <p>Record Labels: {data[3]}</p>
               <img className="rounded-xl" src={data[4] ? data[4]: "/src/assets/no-cover.png"}></img>
            { data[5] != null &&
            <p>{data[5]}</p>
            }
            </div>
            <div className="bottom-0 absolute">
            <div classNAme="left-5 flex flex-col">
                <p>{status}</p>
                <button onClick={fetchData}>fetch now</button>
            </div>
            </div>
        </div>
    );
}
export default App