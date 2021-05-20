import React, { useEffect, useState } from 'react';
import './Raids.css';
import axios from 'axios';

export default function Raids(props) {
    const [data, setData] = useState([]);
    const raidsApi = 'https://wowweekly-node.herokuapp.com/api/raid';
    const raidsApiHC = 'https://wowweekly-node.herokuapp.com/api/raidHC';
    const difficulty = props.difficulty;

    useEffect(() => {

    });

    function handleClick(e, raid) {
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

    function getBackgroundColor(raid) {
        if(raid.Completed === 1) {
            return "green";
        }
        else {
            return "white";
        }
    }

    return <div><div><h2>Raid Bosses {difficulty}</h2></div> <div className="mpluskeys">
        {data && data?.map(raid => (
            <button id={'raid'+difficulty+raid.Counter} value={raid} className="raid"  style={{backgroundColor: getBackgroundColor(raid)}}  key={raid.Counter} onClick={(e) => handleClick(e, raid)}>
                {raid.Counter}
            </button>
        ))}
    </div>
    </div>
}
