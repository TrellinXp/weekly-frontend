import React, { useEffect} from 'react';
import axios from 'axios';
import './Reset.css';

export default function Reset() {
    const resetApi = 'http://localhost:4000/api/reset';

    useEffect(() => {

    });

    function reset(e) {
        var buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];
            button.style.backgroundColor = "white";
            // ...
        }
    
        axios
        .post(resetApi, {
          headers: {
            'Content-Type': 'application/json',
          }
        }
        )
        .then(() => console.log('Book Created'))
        .catch(err => {
          console.error(err);
        });
    }

    return <div className="reset">
            <h2>Weekly Reset</h2>
            <button className="button" onClick={(e) => reset(e)}> 
                Weekly Reset
            </button>
    </div>
}
