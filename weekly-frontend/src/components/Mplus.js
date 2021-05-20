import React, { useEffect, useState } from 'react';
import './Mplus.css';
import axios from 'axios';

export default function Mplus() {
    const [data, setData] = useState([]);
    const weeklyApi = 'https://wowweekly-node.herokuapp.com/api/weekly';
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if(!isLoaded)  {
            loadMplusKeys();
        }
    });

    function loadMplusKeys() {
        fetch(weeklyApi)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setData(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }

    function handleClick(e, mpluskey) {
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
        .then(res => {
            console.log("Data updated")
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function getBackgroundColor(mpluskey) {
        if(mpluskey.Completed === 1) {
            return "green";
        }
        else {
            return "white";
        }
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
    return <div><div><h2>Mythic Plus Keys </h2></div> <div className="mpluskeys">
        {data && data?.map(mpluskey => (
            <button id={mpluskey.Counter} value={mpluskey} style={{backgroundColor: getBackgroundColor(mpluskey)}} className="key" key={mpluskey.Counter} 
                onClick={(e) => handleClick(e, mpluskey)}> {mpluskey.Counter}
            </button>
        ))}
    </div>
    </div>
    }
}
