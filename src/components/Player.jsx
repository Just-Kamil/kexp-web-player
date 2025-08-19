import React, {useState, useEffect} from 'react';
import pause from "../assets/pause-icon.svg";
import play from "../assets/play-icon.svg";

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    // toggle function, sets the status of audio
    const toggle = () => {setPlaying(!playing);};

    // takes playing status and applies it to audio object
    useEffect( () => {
        playing ? audio.play() : audio.pause();
    },  [playing]);

    return [playing, toggle];
}

const Player = ({url}) => {
    const [playing, toggle] = useAudio(url);
    return (
        <div className="player">
            <button onClick={toggle}><img  className="toggle-btn" alt="pause/play icons" src={playing ? pause : play}></img></button>
        </div>
    )
}

export default Player;