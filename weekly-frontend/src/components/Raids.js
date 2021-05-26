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
        if (!isLoaded) {
            loadRaids();
        }
    })

    function loadRaids() {
        if (difficulty === 'NHC') {            
            loadNHCRaids();
        }
        if (difficulty === 'HC') {
            loadHCRaids();
        }
    }

    function loadNHCRaids() {
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

    function loadHCRaids() {
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

    function handleClick(e, raid) {
        raid.CompletionDate = Date.now();
        raid.Completed = 1;
        const response = postData(raidsApi, raid);
        return response;
    }

    async function postData(url, data) {
        data.Completed = 1;
        axios.post(url, {data1: data.Id}, {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )
        .then(res => {
            console.log("Data updated");
            var button = document.getElementById('raid'+difficulty+data.Counter);
            button.style.backgroundColor = "Green";
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function getBackgroundColor(raid) {
        if(raid.Completed === "1") {
            return "green";
        }
        else {
            if(raid.difficulty === "NHC") {
                return "CornflowerBlue";
            }
            if(raid.difficulty === "HC") {
                return "Blue";
            }
        }
    }    

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
    return <div><div><h2>Raid Bosses {difficulty}</h2></div> <div className="mpluskeys">
        {data && data?.map(raid => (
            <button id={'raid'+difficulty+raid.Counter} value={raid} style={{backgroundColor: getBackgroundColor(raid)}} className="raid" key={raid.Counter} onClick={(e) => handleClick(e, raid)}>
                {raid.Counter}
            </button>
        ))}
    </div>
    </div>
    }
}
