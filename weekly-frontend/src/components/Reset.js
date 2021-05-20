import React, { useEffect} from 'react';
import axios from 'axios';
import './Reset.css';

export default function Reset() {
    const resetApi = 'https://wowweekly-node.herokuapp.com/api/reset';

    useEffect(() => {

    });

    function reset(e) {
        resetButtonColors();
        fetch(resetApi)
            .then(console.log("Weekly Reset"));
    }

    function resetButtonColors() {
        var buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];
            button.style.backgroundColor = "white";
        }
    }

    return <div className="reset">
            <h2>Weekly Reset</h2>
            <button className="button" onClick={(e) => reset(e)}> 
                Weekly Reset
            </button>
    </div>
}
