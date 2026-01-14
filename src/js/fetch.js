import axios from 'axios'
import airBreak from '../assets/air-break.png'
import noCover from '../assets/no-cover.png'

// Data from last api call
export let cachedData;
export let cachedShow;


export const fetchData = async () => {

    // make api call
    let res = await axios.get('https://api.kexp.org/v2/plays')
    //create a dictionary with the results
    const lastSong = res.data.results[0];

    let lyric_web = {
        song: encodeURI(lastSong.song),
        artist: encodeURI(lastSong.artist),
        album: encodeURI(lastSong.album),
    }
    let lyric_uri = `https://lrclib.net/api/get?track_name=${encodeURI(lastSong.song)}&artist_name=${lyric_web.artist}&album_name=${lyric_web.album}`;
    let res_lyric;
    try {
        res_lyric = await axios.get(lyric_uri)
    } catch (error) {
        console.log(error);
    }

    const lastLyric = res_lyric ? res_lyric.data: "no lyrics found"
    // set the data
    console.log(res);
    let stored = {
        song: lastSong.song,
        artist: lastSong.artist,
        album: lastSong.album,
        labels: lastSong.labels,
        image_uri: lastSong.image_uri,
        comment: lastSong.comment,
        thumbnail_uri: lastSong.thumbnail_uri,
        release_date: lastSong.release_date,
        plainLyrics: lastLyric.plainLyrics
    };

    // check for no art or air break
    let coverImage;
    if (!stored.image_uri && !stored.song) {
        coverImage = airBreak;
    } else if (!stored.image_uri) {
        coverImage = noCover;
    } else {
        coverImage = stored.image_uri
    }

    // update bg image
    if (stored.image_uri && !stored.song) {
        document.getElementsByClassName("background-image")[0].style.backgroundImage = "url(" + (stored.image_uri) + ")";
    } else  {
        document.getElementsByClassName("background-image")[0].style.backgroundImage = `url(${coverImage})`;
    }

    // update favicon
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = coverImage;

    // update page title
    document.title = `${stored.song ? stored.song: "KEXP"} - ${stored.artist ? stored.artist: "Where music Matters"}`


    // update mediaSession
    if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: stored.song,
            artist: stored.artist,
            album: stored.album,
            artwork: [{src: coverImage}]
        })
    }
    console.log('END')
    cachedData = stored;
    return stored;
}


export const fetchShow = async () => {
    let res = await axios.get('https://api.kexp.org/v2/shows/?limit=1');
    const lastShow =  res.data.results[0];
    console.log(lastShow.host_names);
    let stored = {
        programName: lastShow.program_name,
        hostNames: lastShow.host_names,
        hostPhoto: lastShow.image_uri
    };
    cachedShow =  stored;
    return stored;
}