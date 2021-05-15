import React, { useEffect, useState } from 'react';
import './Raids.css';
import axios from 'axios';

export default function Raids(props) {
    const [data, setData] = useState([]);
    const raidsApi = 'http://localhost:4000/api/raid';
    const raidsApiHC = 'http://localhost:4000/api/raidHC';
    const difficulty = props.difficulty;

    useEffect(() => {
        if(difficulty === 'HC') {
            fetch(raidsApiHC)
                .then(response => response.json())
                .then(data => setData(data));
        } else {
            fetch(raidsApi)
                .then(response => response.json())
                .then(data => setData(data));
        }
    });

    function handleClick(e, raid) {
        document.getElementById("raid"+difficulty+raid.Counter).style.backgroundColor = 'Green';

        raid.CompletionDate = Date.now();
        raid.Completed = 1;
        const response = postData(raidsApi, raid)
        return response;
    }

    async function postData(url, data) {
        data.Completed = 1;

        var jsonString = JSON.stringify(data);

        axios.post(url, jsonString, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )
        .then(() => console.log('Object Update'))
        .catch(err => {
            console.error(err);
        });
    }

    return <div><div><h2>Raid Bosses {difficulty}</h2></div> <div className="mpluskeys">
        {data && data?.map(raid => (
            <button id={'raid'+difficulty+raid.Counter} value={raid} className="key" key={raid.Counter} onClick={(e) => handleClick(e, raid)}>
                {raid.Counter}
            </button>
        ))}
    </div>
    </div>
}
