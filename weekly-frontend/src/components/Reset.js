import React, { useEffect, useState } from 'react';
import './Reset.css';

export default function Reset() {
    const resetApi = 'https://wowweekly-node.herokuapp.com/api/reset';
    const [error, setError] = useState(null);

    useEffect(() => {

    });

    function reset(e) {
        fetch(resetApi)
        .then(res => res.json())
        .then(
            (result) => {
                console.log("Weekly Reset "+JSON.stringify(result));
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setError(error);
            }
        )
        fetch(resetApi)
            .then(console.log("Weekly Reset"));
    }
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return <div className="reset">
                <h2>Weekly Reset</h2>
                <button className="button" onClick={(e) => reset(e)}> 
                    Weekly Reset
                </button>
        </div>
    }
}
