import React, { useEffect, useState } from 'react';
import './Raids.css';
import axios from 'axios';

export default function Raids(props) {
    const [data, setData] = useState([]);
    const raidsApi = 'https://wowweekly-node.herokuapp.com/api/raid';
    const raidsApiHC = 'https://wowweekly-node.herokuapp.com/api/raidHC';
    const difficulty = props.difficulty;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (difficulty === 'HC') {
            if (!isLoaded) {
                fetch(raidsApiHC)
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
        } else {
            if (!isLoaded) {
                fetch(raidsApi)
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
        }
    });

    function handleClick(e, raid) {
        raid.CompletionDate = Date.now();
        raid.Completed = 1;
        if(difficulty === 'NHC') {
            const response = postData(raidsApi, raid);
            return response;
        }
        const response = postData(raidsApi, raidsApiHC);
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

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
    return <div><div><h2>Raid Bosses {difficulty}</h2></div> <div className="mpluskeys">
        {data && data?.map(raid => (
            <button id={'raid'+difficulty+raid.Counter} value={raid} className="raid"  style={{backgroundColor: getBackgroundColor(raid)}}  key={raid.Counter} onClick={(e) => handleClick(e, raid)}>
                {raid.Counter}
            </button>
        ))}
    </div>
    </div>
    }
}
