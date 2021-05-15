import React, { useEffect, useState } from 'react';
import './Mplus.css';
import axios from 'axios';

export default function Mplus() {
    const [data, setData] = useState([]);
    const weeklyApi = 'http://localhost:4000/api/weekly';

    useEffect(() => {
        fetch(weeklyApi)
            .then(response => response.json())
            .then(data => setData(data));
    });

    function handleClick(e, mpluskey) {
        document.getElementById(mpluskey.Counter).style.backgroundColor = 'Green';

        mpluskey.CompletionDate = Date.now();
        mpluskey.Completed = 1;
        const response = postData(weeklyApi, mpluskey)
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

    return <div><div><h2>Mythic Plus Keys</h2></div> <div className="mpluskeys">
        {data && data?.map(mpluskey => (
            <button id={mpluskey.Counter} value={mpluskey} className="key" key={mpluskey.Counter} onClick={(e) => handleClick(e, mpluskey)}>
                {mpluskey.Counter}
            </button>
        ))}
    </div>
    </div>
}
