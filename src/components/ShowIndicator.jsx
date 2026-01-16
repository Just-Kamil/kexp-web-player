import { useState, useMemo } from "react";
import {CronJob} from 'cron';
import {fetchShow} from "../js/fetch.js";

function ShowIndicator() {
    const [show, setShow] = useState({});

    useMemo( () => {
        console.log('fetching show');
        fetchShow().then(nShow => setShow(nShow));
    }, []);

    new CronJob(
        '5 * * * *',
        function () {
            let d = new Date();
            console.log("Cron Fetch", d.getMinutes())
            fetchShow().then(show => setShow(show));
        },
        null,
        true,
        'Europe/Dublin'
    );

    return (
        <div className='flex flex-col justify-between w-3/10 m-2 bg-black/50 rounded-lg backdrop-blur-2xl shadow-lg'>
            <div className='flex flex-col ml-2 mt-2'>
                <h4 className='italic mb-0'>Currently on Air...</h4>
                <h2 className='font-bold text-lg  md:text-lg  lg:text-2xl xl:text-2xl -mt-2'>{show.programName}</h2>
            </div>
            <div className='flex flex-row align-items-center justify-end mr-2 mb-2 -mt-7'>
                <h3 className='content-end pr-1'>With  <b>{show.hostNames ? show.hostNames.join(', '): "" }</b></h3>
                <img className='w-10 rounded-4xl' src={show.hostPhoto} alt={show.hostNames ? show.hostNames.join(', '): ""} />
            </div>
        </div>
    )
}

export default ShowIndicator;